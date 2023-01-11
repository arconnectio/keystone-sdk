import { arweaveResults } from "../utils/results";
import { useEffect, useState } from "react";
import { UR } from "@ngraveio/bc-ur";
import useUrDecoder from "../hooks/useUrDecoder";
import QrReader from "react-qr-scanner";

export default function AnimatedQRScanner({ onSuccess, onError, onProgress }: Props) {
  // bc-ur decoder
  const { urDecoder, reset } = useUrDecoder();

  // progress percentage
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!onProgress) return;

    onProgress(progress);
  }, [progress]);

  /**
   * Handle error
   */
  function handleError(e: Error) {
    if (!onError) return;
    onError(e, retry);
  }

  /**
   * Retry scan
   */
  function retry() {
    setProgress(0);
    reset();
  }

  /**
   * Handle scanning
   */
  const processScanResult = (data: string | null) => {
    console.log("f")
    // check for undefined result
    if (!data) {
      handleError(new Error("Scanner result is null"));

      return;
    }

    try {
      // handle result
      processUR(data);
    } catch (e: any) {
      handleError(new Error(`Error processing UR: ${e?.message || e}`));
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
        return handleError(new Error("Invalid QR type"));
      }

      if (onSuccess) {
        onSuccess(result);
      }
    }
  }

  return (
    <QrReader
      delay={100}
      onError={(error) => handleError(new Error(`Error scanning: ${error}`))}
      onScan={processScanResult}
    />
  );
}

export interface Props {
  onSuccess?: (ur: UR) => any;
  onError?: (error: Error, retryFunction: () => void) => any;
  onProgress?: (progress: number) => any;
}
