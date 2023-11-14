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
          nome: string
          idade: number
          email: string
          experiencia: string[] 'esse campo deve ser um resumo da experiencia profissional da pessoa, precisa ser um array de string'
          telefone: string[]
          genero: string
          pcd: boolean 'esse campo deve ser true caso a pessoa seja portadora de deficiencia, se nao for informado, deve ser false'
          competencias: string[] 'esse campo deve ser um resumo das competencias da pessoa, precisa ser um array de string'w
          lgbtq: 'esse campo deve ser true caso a pessoa se idetifique com outro genero alem do masculino e feminino, se nao for informado, deve ser false'
          nivelProfissional: 'estagiario' | 'junior' | 'pleno' | 'senior', esse campo deve levar em consideração os anos de experiencia profissional na area de tecnologia, somando o tempo em que se passou em cada uma das empresas'
        }

        DETALHE IMPORTANTE: Caso alguma informação nao seja encontrada, apenas nao colocar no json, nao precisa colocar como null ou undefined, e voce nao deve dizer mais nada, apenas pegar as informações que precisa e retornar igual ao modelo a cima
        `
      },
    ]
  };

  const retorno = axios
  .post("https://api.chatpdf.com/v1/chats/message", data, config)
  .then((response: { data: { content: any; }; }) => {
    return formatResponse(response?.data?.content)
  })
  .catch((error: { message: string; }) => {
    throw new Error(error.message)
  })

  return retorno
}

const formatResponse = (response: string) => {
  console.log(response)
  if(response.includes('{') && response.includes('}')) {
    let formattedResponse = response
  if(response?.split('')[0] !== '{') {
    if(response?.split('}')[1] !== '') {
      formattedResponse = '{' + response?.split('{')[1]?.split('}')[0] + '}'
    }
    else formattedResponse = '{' + response?.split('{')[1]
  }
  else if(response?.split('}')[1] !== '') {
    formattedResponse = response?.split('}')[0] + '}'
  }
  return JSON.parse(formattedResponse)
  } else {
    throw new Error('Não foi possível extrair as informações do curriculo, por favor, tente novamente.')
  }
  
}
