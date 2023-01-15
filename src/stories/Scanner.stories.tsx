import AnimatedQRScanner from "../components/AnimatedQRScanner";
import useScanner from "../hooks/useScanner";
import { Buffer } from "buffer";

//globalThis.Buffer = Buffer;

export default {
  name: "Scanner",
  component: AnimatedQRScanner
};

export const Scanner = () => {
  const scanner = useScanner(
    (ur) => console.log(ur)
  );

  return (
    <div style={{ display: "flex" }}>
      <div>
        <div style={{ width: 400 }}>
          <AnimatedQRScanner {...scanner.bindings} />
        </div>
        <p>
          Progress {scanner.progress}
        </p>
        <button onClick={scanner.retry}>
          Retry
        </button>
      </div>
    </div>
  );
};
