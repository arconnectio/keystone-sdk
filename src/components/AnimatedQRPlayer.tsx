import { QRCode, IProps } from "react-qrcode-logo";
import useUrEncoder from "../hooks/useUrEncoder";
import { UR } from "@ngraveio/bc-ur";

export default function AnimatedQRPlayer({
  data,
  speed = DEFAULT_SPEED,
  maxFragmentLength = DEFAULT_MAX_FRAGMENT_LENGTH,
  size = 288,
  ...props
}: Props) {
  const currentData = useUrEncoder(
    data,
    maxFragmentLength,
    speed
  );
  
  return (
    <QRCode
      value={currentData}
      size={size}
      {...props}
    />
  );
}

const DEFAULT_SPEED = 250;
const DEFAULT_MAX_FRAGMENT_LENGTH = 400;

interface Props extends Omit<IProps, "value"> {
  data: UR;
  speed?: number;
  maxFragmentLength?: number;
}
