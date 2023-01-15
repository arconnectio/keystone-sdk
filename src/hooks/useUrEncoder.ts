import { useEffect, useMemo, useState } from "react";
import { UR, UREncoder } from "@ngraveio/bc-ur";

export default function useUrEncoder(
  data: UR,
  maxFragmentLength: number,
  speed: number
) {
  // the ur encoder
  const urEncoder = useMemo(() => new UREncoder(data, maxFragmentLength), [data, maxFragmentLength]);

  // current qr data
  const [currentData, setCurrentData] = useState(urEncoder.nextPart());

  // update qr data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(urEncoder.nextPart());
    }, speed);

    return () => clearInterval(interval);
  }, [urEncoder, speed]);

  return currentData;
}
