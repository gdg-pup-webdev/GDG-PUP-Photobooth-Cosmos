import { useEffect, useRef, useState } from "react";
import { CAMERA_CONFIG } from "../constants";

export interface CameraDevice {
  deviceId: string;
  label: string;
}

interface UseCameraResult {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  streamRef: React.RefObject<MediaStream | null>;
  cameras: CameraDevice[];
  currentCameraId: string;
  setCurrentCameraId: (deviceId: string) => void;
  cameraError: string | null;
  playVideo: () => void;
}

/**
 * Custom hook for camera initialization and stream management
 */
export function useCamera(): UseCameraResult {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const requestedCameraIdRef = useRef("");
  const activeCameraIdRef = useRef("");
  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [requestedCameraId, setRequestedCameraId] = useState("");
  const [activeCameraId, setActiveCameraId] = useState("");
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    requestedCameraIdRef.current = requestedCameraId;
  }, [requestedCameraId]);

  useEffect(() => {
    activeCameraIdRef.current = activeCameraId;
  }, [activeCameraId]);

  useEffect(() => {
    let mounted = true;

    const stopStream = () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };

    const updateCameraList = async (preferredCameraId?: string) => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices
        .filter((device) => device.kind === "videoinput")
        .map((device, index) => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${index + 1}`,
        }));

      if (!mounted) {
        return;
      }

      setCameras(videoInputs);

      if (
        preferredCameraId &&
        videoInputs.some((device) => device.deviceId === preferredCameraId)
      ) {
        activeCameraIdRef.current = preferredCameraId;
        setActiveCameraId(preferredCameraId);
        return;
      }

      if (videoInputs.length > 0 && !activeCameraIdRef.current) {
        activeCameraIdRef.current = videoInputs[0].deviceId;
        setActiveCameraId(videoInputs[0].deviceId);
      }
    };

    const handleDeviceChange = () => {
      updateCameraList(
        activeCameraIdRef.current || requestedCameraIdRef.current,
      ).catch(() => {});
    };

    async function initCamera() {
      try {
        setCameraError(null);
        stopStream();

        const stream = await navigator.mediaDevices.getUserMedia({
          ...CAMERA_CONFIG,
          video: requestedCameraId
            ? {
                width: CAMERA_CONFIG.video.width,
                height: CAMERA_CONFIG.video.height,
                deviceId: { exact: requestedCameraId },
              }
            : CAMERA_CONFIG.video,
        });

        if (!mounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const currentTrack = stream.getVideoTracks()[0];
        const streamCameraId =
          currentTrack?.getSettings().deviceId || requestedCameraId;

        activeCameraIdRef.current = streamCameraId || "";
        setActiveCameraId(streamCameraId || "");
        await updateCameraList(streamCameraId);

        videoRef.current?.play().catch(() => {});
      } catch (err) {
        console.error("Camera error:", err);
        if (!mounted) {
          return;
        }

        setCameraError("Unable to access the selected camera.");

        if (requestedCameraId) {
          setRequestedCameraId("");
        }
      }
    }

    initCamera();
    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
      mounted = false;
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange,
      );
      stopStream();
    };
  }, [requestedCameraId]);

  const playVideo = () => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  };

  return {
    videoRef,
    streamRef,
    cameras,
    currentCameraId: requestedCameraId || activeCameraId,
    setCurrentCameraId: setRequestedCameraId,
    cameraError,
    playVideo,
  };
}
