import axios from "axios";
import fs, { createReadStream, promises as fsPromises } from "fs";
import FormData from "form-data";
import path from "path";

export async function savePdfForExtract(fileBase64: string) {
  const fileBuffer = Buffer.from(fileBase64.split(",")[1], "base64");

  const saveDirectory = path.join(__dirname, "..", "common");
  const tempFilePath = path.resolve(saveDirectory, 'curriculo.pdf');
  
  if (!fs.existsSync(saveDirectory)) {
    fs.mkdirSync(saveDirectory);
  }
    
  const formData = new FormData();
    try {
    await fsPromises.writeFile(tempFilePath, fileBuffer);

    formData.append("file", createReadStream(tempFilePath), {
      filename: 'curriculo.pdf',
      contentType: 'application/pdf',
    });

    const options = {
      headers: {
        "x-api-key": process.env.CHATPDF_API_KEY,
        ...formData.getHeaders(),
      },
    };

    return axios
      .post("https://api.chatpdf.com/v1/sources/add-file", formData, options)
      .then((response) => {
        return response.data.sourceId;
      })
      .catch((error) => {
        console.log(error.message);
        throw new Error(error.message);
      });
  } finally {
   setTimeout(() => { fsPromises.unlink(tempFilePath)}, 200)
  }
}
