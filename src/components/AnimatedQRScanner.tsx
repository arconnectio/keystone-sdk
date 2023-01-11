import { OnResultFunction, QrReader, QrReaderProps } from "react-qr-reader";
import { arweaveResults } from "../utils/results";
import { useEffect, useState } from "react";
import { UR } from "@ngraveio/bc-ur";
import useUrDecoder from "../hooks/useUrDecoder";

export default function AnimatedQRScanner({ onSuccess, onError, onProgress, logging = true, ...props }: Props) {
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
  const processScanResult: OnResultFunction = (result, error) => {
    // check for errors or undefined result
    if (!!error || !result) {
      if (onError && !!error) {
        handleError(error);
      } else if (onError && !result) {
        handleError(new Error("Scanner result is undefined"));
      }

      return;
    }

    try {
      // handle result
      processUR(result.getText());
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
      constraints={{ facingMode: "user" }}
      scanDelay={100}
      onResult={processScanResult}
      videoStyle={{
        objectFit: "cover",
        objectPosition: "center"
      }}
      {...props}
    />
  );
}

type Props = Omit<QrReaderProps, "onResult" | "scanDelay" | "constraints"> & AnimatedScannerProps & {
  logging?: boolean;
}

export interface AnimatedScannerProps {
  onSuccess?: (ur: UR) => any;
  onError?: (error: Error, retryFunction: () => void) => any;
  onProgress?: (progress: number) => any;
}
