declare module "qrcode" {
  interface QRCodeToHTMLOptions {
    width?: number;
    margin?: number;
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
    color?: { dark?: string; light?: string };
  }

  function toString(
    text: string,
    options?: QRCodeToHTMLOptions & { type?: string },
  ): Promise<string>;

  function toDataURL(
    text: string,
    options?: QRCodeToHTMLOptions,
  ): Promise<string>;

  function toCanvas(
    canvas: HTMLCanvasElement,
    text: string,
    options?: QRCodeToHTMLOptions,
  ): Promise<HTMLCanvasElement>;

  function toBuffer(
    text: string,
    options?: QRCodeToHTMLOptions,
  ): Promise<Buffer>;

  function toFile(
    path: string,
    text: string,
    options?: QRCodeToHTMLOptions,
  ): Promise<void>;

  export { toString, toDataURL, toCanvas, toBuffer, toFile };
  export type { QRCodeToHTMLOptions };
}
