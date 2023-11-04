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
        "content": `Esse é um curriculo de uma pessoa, quero que voce pegue o nome, email e telefone (esse campo deve ser um array), genero (se nao for informado, leve em consideração o nome, se é um nome feminino ou masculino, ele deve ser representado pela siga M ou F), e se a pessoa se identifica como LGBTQ  e se a pessoa é uma PCD nivel profissional, caso nao seja informado, leve em consideração o tempo de experiencia na area (sendo que estagiario é 0 a 1 ano de experiencia, junior de 6 meses a 2 anos, pleno de 2 a 4 anos e senior a cima de 4 anos) e escreva como se fosse um json no seguinte formato:
        {
          nome?: string
          idade: number
          favorito?: boolean
          experiencia?: string[] 'esse campo deve ser um resumo da experiencia profissional da pessoa, precisa ser um array de string'
          telefone?: string[]
          genero?: string
          pcd?: boolean
          lgbtq?: boolean
          nivelProfissional?: 'estagiario' | 'junior' | 'pleno' | 'senior'
        }

        DETALHE IMPORTANTE: Caso alguma informação nao seja encontrada, apenas nao colocar no json, nao precisa colocar como null ou undefined, e voce nao deve dizer mais nada, apenas pegar as informações que precisa e retornar igual ao modelo a cima
        `
      }
    ]
  };

  const retorno = axios
  .post("https://api.chatpdf.com/v1/chats/message", data, config)
  .then((response: { data: { content: any; }; }) => {
    return JSON.parse(response?.data?.content.split('')[0] !== '{' ? '{' + response?.data?.content.split('{')[1] : response?.data?.content)
  })
  .catch((error: { message: string; }) => {
    throw new Error(error.message)
  })

  return retorno
}
