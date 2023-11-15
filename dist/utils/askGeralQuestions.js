"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askGeralQuestions = void 0;
const openai_1 = __importDefault(require("openai"));
function askGeralQuestions(sourceId) {
    return __awaiter(this, void 0, void 0, function* () {
        const openai = new openai_1.default({
            apiKey: process.env.GPT_API_KEY
        });
        const chatCompletion = yield openai.chat.completions.create({
            messages: [{ role: 'user', content: `
    ${sourceId}
    Desconsidere respostas anteriores. Esse é um curriculo de uma pessoa, quero que voce extraia as seguintes informações, profissao, escolaridade, nome, idade, email, experiencia, telefone, genero, pcd, competencias, lgbtq, nivelProfissional e a resposta deve ser estruturada desta forma no formato json. Não é obrigatorio preencher todos os campos {
      nome: string (este campo deve conter o nome da pessoa)
      idade: number (este campo deve ser um numero, caso a idade seja fornecida como data calcular o ano de nascimento - até o ano atual, se não for informado, deve ser 0)
      email: string (este campo deve conter o email da pessoa)
      experiencia: string[] (este campo pode conter uma ou mais experiencias profissionais, esta informação deve ser um array de string)
      telefone: string[] (este campo deve informar um ou mais telefones de contato)
      genero: string (neste campo deve ser 'M' para masculino ou 'F' para feminino)
      profissao: string (este campo deve conter a profissao da pessoa, se não for informado deve ser vazio '')
      pcd: boolean (colocar true caso encontrado que seja portador de deficiencias, caso não false)
      escolaridade: string[] (este campo pode conter uma ou mais formações educacionais do candidato de qualquer nível, esta informação deve ser um array de string)
      competencias: string[] (este campo deve informar todas as competencias encontradas dentro de um array de string)
      lgbtq: (esse campo deve ser true caso a pessoa se idetifique com outro genero alem do masculino e feminino, se nao for informado, deve ser false)
      nivelProfissional: 'estagiario' | 'junior' | 'pleno' | 'senior' (esse campo deve levar em consideração os anos de experiencia profissional na area de tecnologia, somando o tempo em que se passou em cada uma das empresas, sendo que: estagiario = 0 a 1 ano, junior = 1 a 2 anos, pleno = 2 a 5 anos, senior = 5 anos ou mais)
    }
    ` }],
            model: 'gpt-3.5-turbo',
        });
        return formatResponse((chatCompletion.choices[0].message.content) || '');
    });
}
exports.askGeralQuestions = askGeralQuestions;
const formatResponse = (response) => {
    var _a;
    if (response.includes('{') && response.includes('}')) {
        let formattedResponse = response;
        if ((response === null || response === void 0 ? void 0 : response.split('')[0]) !== '{') {
            if ((response === null || response === void 0 ? void 0 : response.split('}')[1]) !== '') {
                formattedResponse = '{' + ((_a = response === null || response === void 0 ? void 0 : response.split('{')[1]) === null || _a === void 0 ? void 0 : _a.split('}')[0]) + '}';
            }
            else
                formattedResponse = '{' + (response === null || response === void 0 ? void 0 : response.split('{')[1]);
        }
        else if ((response === null || response === void 0 ? void 0 : response.split('}')[1]) !== '') {
            formattedResponse = (response === null || response === void 0 ? void 0 : response.split('}')[0]) + '}';
        }
        return JSON.parse(formattedResponse);
    }
    else {
        throw new Error('Não foi possível extrair as informações do curriculo, por favor, tente novamente.');
    }
};
//# sourceMappingURL=askGeralQuestions.js.map