declare module "react-qr-scanner" {
  import { Component } from "react";

  declare class QrReader extends Component<{
    delay?: number;
    onError?: (error: any) => void;
    onScan?: (result: any) => void;
  }> {}

  export default QrReader;
}