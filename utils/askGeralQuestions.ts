const axios = require("axios");

export async function askGeralQuestions(sourceId: string) {

  const config = {
    headers: {
      "x-api-key": process.env.CHATPDF_API_KEY,
      "Content-Type": "application/json",
    },
  };
  
  const data = {
    stream: true,
    sourceId,
    messages: [
      {
        role: "user",
        content: "qual o nome do candidato ?",
      },
    ],
  };  
  const retorno = axios
  .post("https://api.chatpdf.com/v1/chats/message", data, config)
  .then((response) => {
    console.log("Result:", response.data.content);
    return response.data.content
  })
  .catch((error: { message: any; response: { data: any; }; }) => {
    throw new Error(error.message)
  })

  return retorno

}
