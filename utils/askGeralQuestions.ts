const axios = require("axios");

export async function askGeralQuestions(sourceId: string) {
  const config = {
    headers: {
      "x-api-key": process.env.CHATPDF_API_KEY,
      "Content-Type": "application/json",
    },
  };
  
  const data = {
    sourceId,
    "messages": [
      {
        "role": "user",
        "content": "How much is the world?"
      }
    ]
  };

  const retorno = axios
  .post("https://api.chatpdf.com/v1/chats/message", data, config)
  .then((response: { data: { content: any; }; }) => {
    console.log("Result:", response.data.content);
    return response.data.content
  })
  .catch((error: { message: any; response: { data: any; }; }) => {
    console.log(error.response.data)
    throw new Error(error.message)
  })

  return retorno

}
