import { Props } from "../components/AnimatedQRScanner";
import useUrDecoder from "./useUrDecoder";
import { UR } from "@ngraveio/bc-ur";
import { useState } from "react";

export default function useScanner(onResult: (ur: UR) => any): ReturnType {
  const [progress, setProgress] = useState<number>(0);
  const decoder = useUrDecoder();

  return {
    progress,
    retry () {
      decoder.reset();
      setProgress(0);
    },
    bindings: {
      onProgress: (p) => setProgress(p),
      onResult,
      decoder
    }
  };
}

interface ReturnType {
  progress: number;
  bindings: Props;
  retry: () => void;
}
