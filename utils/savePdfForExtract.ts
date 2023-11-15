
import PdfParse from "pdf-parse";


export async function savePdfForExtract(fileBase64: string) {
  const fileBuffer = Buffer.from(fileBase64.split(",")[1], "base64");
  const pdfText = await PdfParse(fileBuffer);
  return pdfText.text;
}
