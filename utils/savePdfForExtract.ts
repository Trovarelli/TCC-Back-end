const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");

export async function savePdfForExtract(file: string) {

  const binaryData = Buffer.from(file, "base64");

  const saveDirectory = path.join(__dirname, "..", "common");
  const filePath = path.resolve(saveDirectory, 'curriculo.pdf');
  
  if (!fs.existsSync(saveDirectory)) {
    fs.mkdirSync(saveDirectory);
  }
  
  fs.writeFileSync(filePath, binaryData);
  
  const formData = new FormData();
  formData.append(
    "file",
    fs.createReadStream(filePath)
  );
  
  const options = {
    headers: {
      "x-api-key": process.env.CHATPDF_API_KEY,
    },
  };
    
  return axios
  .post("https://api.chatpdf.com/v1/sources/add-file", formData, options)
  .then((response: { data: { sourceId: any; }; }) => {
    console.log(response.data)
    return response.data.sourceId
  })
  .catch((error: { message: any; response: { data: any; }; }) => {
    console.log(error.message)
    throw new Error(error.message)
  })

  
}
