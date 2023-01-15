import { Props } from "../components/AnimatedQRScanner";
import { UR } from "@ngraveio/bc-ur";
import { useState } from "react";

export default function useScanner(onResult: (ur: UR) => any): ReturnType {
  const [progress, setProgress] = useState<number>(0);

  return {
    progress,
    bindings: {
      onProgress: (p) => setProgress(p),
      onResult
    }
  };
}

interface ReturnType {
  progress: number;
  bindings: Props;
}
