import AnimatedQRScanner from "../components/AnimatedQRScanner";
import useScanner from "../hooks/useScanner"

export default {
  name: "Scanner",
  component: AnimatedQRScanner
};

export const Scanner = () => {
  const scanner = useScanner(
    (ur) => console.log(ur),
    (e) => {throw e}
  );

  return (
    <>
      <div style={{ width: 400 }}>
        <AnimatedQRScanner {...scanner.bindings} />
      </div>
      <p>
        Progress {scanner.progress}
      </p>
      <button onClick={scanner.retry}>
        Retry
      </button>
    </>
  );
};
