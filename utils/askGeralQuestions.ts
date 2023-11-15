import axios from "axios";
import OpenAI from 'openai'

export async function askGeralQuestions(sourceId: string) {
  
  const openai = new OpenAI({
    apiKey: process.env.GPT_API_KEY
  });

  
  const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `
    ${sourceId}
    Desconsidere respostas anteriores. Esse é um curriculo de uma pessoa, quero que voce extraia as seguintes informações, nome, idade, email, experiencia, telefone, genero, pcd, competencias, lgbtq, nivelProfissional e a resposta deve ser estruturada desta forma no formato json. Não é obrigatorio preencher todos os campos {
      nome: string (este campo deve conter o nome da pessoa)
      idade: number (este campo deve ser um numero, caso a idade seja fornecida como data calcular o ano de nascimento - 2023)
      email: string (este campo deve conter o email da pessoa)
      experiencia: string[] (este campo pode conter uma ou mais experiencias profissionais, esta informação deve ser um array de string)
      telefone: string[] (este campo deve informar um ou mais telefones de contato)
      genero: string (neste campo deve ser 'M' para masculino ou 'F' para feminino)
      pcd: boolean (colocar true caso encontrado que seja portador de deficiencias, caso não false)
      competencias: string[] (este campo deve informar todas as competencias encontradas dentro de um array de string)
      lgbtq: (esse campo deve ser true caso a pessoa se idetifique com outro genero alem do masculino e feminino, se nao for informado, deve ser false)
      nivelProfissional: 'estagiario' | 'junior' | 'pleno' | 'senior' (esse campo deve levar em consideração os anos de experiencia profissional na area de tecnologia, somando o tempo em que se passou em cada uma das empresas)
    }
    `  }],
    model: 'gpt-3.5-turbo',
  });

  console.log('FORMATED', formatResponse((chatCompletion.choices[0].message.content) || ''))

  return formatResponse((chatCompletion.choices[0].message.content) || '')
}

const formatResponse = (response: string) => {
  console.log(response)
  if(response.includes('{') && response.includes('}')) {
    console.log('ENTROU NO IF')
    let formattedResponse = response
  if(response?.split('')[0] !== '{') {
    if(response?.split('}')[1] !== '') {
      formattedResponse = '{' + response?.split('{')[1]?.split('}')[0] + '}'
    }
    else formattedResponse = '{' + response?.split('{')[1]
    console.log('FORMATTED RESPONSE', formattedResponse)
  }
  else if(response?.split('}')[1] !== '') {
    formattedResponse = response?.split('}')[0] + '}'
  }
  return JSON.parse(formattedResponse)
  } else {
    throw new Error('Não foi possível extrair as informações do curriculo, por favor, tente novamente.')
  }
  
}
