declare module "react-qr-scanner" {
  import { Component } from "react";

  declare class QrReader extends Component<{
    delay?: number;
    onError?: (error: any) => void;
    onScan?: (result: string | null) => void;
  }> {}

  export default QrReader;
}