declare module 'mammoth/mammoth.browser' {
  export type ConvertResult = { value: string }
  export function convertToHtml(input: { arrayBuffer: ArrayBuffer }): Promise<ConvertResult>
}
