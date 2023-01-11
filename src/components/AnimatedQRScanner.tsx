import { arweaveResults } from "../utils/results";
import { useEffect, useState } from "react";
import { UR } from "@ngraveio/bc-ur";
import useUrDecoder from "../hooks/useUrDecoder";
import QrReader from "react-qr-scanner";

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

  useEffect(() => {
    if (!onProgress) return;

    onProgress(progress, retry);
  }, [progress]);

  /**
   * Handle scanning
   */
  const processScanResult = (data: any) => {
    // check for undefined result
    if (!data) {
      return;
    }

    try {
      // handle result
      processUR(data.text);
    } catch (e: any) {
      console.log(e)
    }
  };

  /**
   * Process data
   */
  function processUR(ur: string) {
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
      delay={100}
      onScan={processScanResult}
    />
  );
}

export interface Props {
  onResult?: (ur: UR) => any;
  onProgress?: (progress: number, retryFunction: () => void) => any;
}
