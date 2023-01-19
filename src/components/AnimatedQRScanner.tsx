import { UrDecoderHook } from "../hooks/useUrDecoder";
import { arweaveResults } from "../utils/results";
import { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import { UR } from "@ngraveio/bc-ur";

export default function AnimatedQRScanner({
  onResult,
  onProgress,
  onError,
  decoder,
  validResults = arweaveResults
}: Props) {
  // bc-ur decoder
  const { urDecoder, reset } = decoder;

  // progress percentage
  const [progress, setProgress] = useState<number>(0);

  // update progress
  useEffect(() => {
    if (!onProgress) return;

    onProgress(progress);
  }, [progress]);

  /**
   * Process data
   */
  function processUR(ur: string | null) {
    if (!ur) return;
    if (!urDecoder.isComplete()) {
      urDecoder.receivePart(ur);
      setProgress(urDecoder.getProgress() * 100);
    } else {
      const result = urDecoder.resultUR();

      // if the result is invalid we reset the progress
      // and call the error function
      if (!validResults.includes(result.type)) {
        reset();
        setProgress(0);

        if (onError) onError("invalid_result_type");

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
      onError={() => {
        if (onError) {
          reset();
          setProgress(0);
          onError("scan_error");
        }
      }}
      showViewFinder={false}
    />
  );
}

export interface Props {
  onResult?: (ur: UR) => any;
  onError?: (error: ScanError) => any;
  onProgress?: (progress: number) => any;
  decoder: UrDecoderHook;
  validResults?: string[];
}

type ScanError = "invalid_result_type" | "scan_error";
