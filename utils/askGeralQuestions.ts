import axios from "axios";

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
        "content": "Esse é um curriculo de uma pessoa, quero que voce pegue o nome, email e telefone (esse campo deve ser um array) e escreva como se fosse um json"
      }
    ]
  };

  const retorno = axios
  .post("https://api.chatpdf.com/v1/chats/message", data, config)
  .then((response: { data: { content: any; }; }) => {
    const resposta  = '{' + response?.data?.content?.split('{').slice(1).join('')
    console.log('RESPOSTA',  JSON.parse(resposta))

    return JSON.parse(resposta)
  })
  .catch((error: { message: string; }) => {
    throw new Error(error.message)
  })

  return retorno
}
