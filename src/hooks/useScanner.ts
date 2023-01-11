import { Props } from "../components/AnimatedQRScanner";
import { UR } from "@ngraveio/bc-ur";
import { useState } from "react";

export default function useScanner(onResult: (ur: UR) => any): ReturnType {
  const [progress, setProgress] = useState<number>(0);
  const [retryFunction, setRetryFunction] = useState<RetryFunction>();

  return {
    progress,
    retry () {
      if (!retryFunction) return;

      retryFunction();
    },
    bindings: {
      onProgress (progress, retry) {
        setProgress(progress);
        setRetryFunction(retry);
      },
      onResult
    }
  };
}

interface ReturnType {
  progress: number;
  retry: RetryFunction;
  bindings: Props;
}

type RetryFunction = () => void;
