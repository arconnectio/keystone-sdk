import { OnResultFunction, QrReader, QrReaderProps } from "react-qr-reader"
import useUrDecoder from "../hooks/useUrDecoder";

export default function AnimatedQRScanner({ onError, logging = true, ...props }: Props) {
  // bc-ur decoder
  const { urDecoder, reset } = useUrDecoder();

  /**
   * Handle scanning
   */
  const processScanResult: OnResultFunction = (result, error) => {
    // check for errors or undefined result
    if (!!error || !result) {
      if (onError && !!error) {
        onError(error, reset);
      } else if (onError && !result) {
        onError(new Error("Scanner result is undefined"), reset);
      }

      return;
    }

    try {
      // handle result
      processUR(result.getText());
    } catch (e: any) {
      console.error(`[Arweave Keystone] Error processing UR: ${e?.message || e}`);
    }
  };

  /**
   * Process data
   */
  function processUR(ur: string) {
    if (!urDecoder.isComplete()) {
      urDecoder.receivePart(ur);
    } else {
      const result = urDecoder.resultUR();
    }
  }

  return (
    <QrReader
      constraints={{ facingMode: "user" }}
      scanDelay={100}
      onResult={processScanResult}
      {...props}
    />
  );
}

interface Props extends Omit<QrReaderProps, "onResult" | "scanDelay" | "constraints"> {
  onError?: (error: Error, retryFunction: () => void) => any;
  logging?: boolean;
}
