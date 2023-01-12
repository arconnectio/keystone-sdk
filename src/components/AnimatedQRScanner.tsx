import { arweaveResults } from "../utils/results";
import useUrDecoder from "../hooks/useUrDecoder";
import { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import { UR } from "@ngraveio/bc-ur";

export default function AnimatedQRScanner({ onResult, onProgress }: Props) {
  // bc-ur decoder
  const { urDecoder, reset } = useUrDecoder();

  // progress percentage
  const [progress, setProgress] = useState<number>(0);

  /**
   * Retry scan
   */
  function retry() {
    setProgress(0);
    reset();
  }

  // update progress
  useEffect(() => {
    if (!onProgress) return;

    onProgress(progress, retry);
  }, [progress]);

  /**
   * Process data
   */
  function processUR(ur: string | null) {
    if (!ur) return;
    if (!urDecoder.isComplete()) {
      urDecoder.receivePart(ur);
      setProgress(urDecoder.getProgress());
    } else {
      const result = urDecoder.resultUR();

      if (!arweaveResults.includes(result.type)) {
        return;
      }

      if (onResult) {
        onResult(result);
      }
    }
  }

  return (
    <QrReader
      onScan={processUR}
      delay={100}
      style={{ width: "100%" }}
      onError={() => {}}
    />
  );
}

export interface Props {
  onResult?: (ur: UR) => any;
  onProgress?: (progress: number, retryFunction: () => void) => any;
}
