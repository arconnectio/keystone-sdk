import { URDecoder } from "@ngraveio/bc-ur";
import { useState } from "react";

export default function useUrDecoder(): UrDecoderHook {
  // bc-ur decoder
  const [urDecoder, setURDecoder] = useState(new URDecoder());

  /**
   * Reset decoder
   */
  const reset = () => setURDecoder(new URDecoder());

  return {
    urDecoder,
    reset
  };
}

export interface UrDecoderHook {
  urDecoder: URDecoder,
  reset: () => void;
}
