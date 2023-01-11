import { AnimatedScannerProps } from "../components/AnimatedQRScanner";
import { useState } from "react";
import { UR } from "@ngraveio/bc-ur"

export default function useScanner(onSuccess: (ur: UR) => any, onError: (e: Error) => any): ReturnType {
  const [progress, setProgress] = useState<number>(0);
  const [retryFunction, setRetryFunction] = useState<RetryFunction>();

  return {
    progress,
    retry () {
      if (!retryFunction) return;

      retryFunction();
    },
    bindings: {
      onProgress: (p) => setProgress(p),
      onError: (error, retry) => {
        setRetryFunction(retry);
        onError(error);
      },
      onSuccess
    }
  };
}

interface ReturnType {
  progress: number;
  retry: RetryFunction;
  bindings: AnimatedScannerProps;
}

type RetryFunction = () => void;