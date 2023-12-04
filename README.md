# API de Currículos

A API de Currículos é um sistema que permite aos usuários criar, visualizar, atualizar e gerenciar currículos online. Esta documentação fornece informações sobre como configurar, instalar e utilizar a API.

## Pré-requisitos

Antes de começar, certifique-se de que você tenha o seguinte software instalado em seu sistema:

- Node.js
- Yarn

## Instalação

1. Clone este repositório: git clone https://github.com/seu-usuario/api-curriculos.git

2. Acesse o diretório do projeto: cd api-curriculos

3. Instale as dependências usando o Yarn: yarn install

## Configuração

A configuração da API de Currículos é realizada por meio de variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:

PORT=3001
DATABASE_URL=mongodb://localhost/api_curriculos
SECRET_KEY=seu-segredo

Ajuste os valores acima conforme necessário.

## Uso

Para iniciar o servidor de desenvolvimento, execute: yarn start

A API estará disponível em `http://localhost:3001` por padrão.

## Rotas

A API de Currículos oferece as seguintes rotas:

- `GET /curriculos`: Obtém todos os currículos.
- `GET /curriculos/:id`: Obtém um currículo específico pelo ID.
- `POST /curriculos`: Cria um novo currículo.
- `PUT /curriculos/:id`: Atualiza um currículo existente.
- `DELETE /curriculos/:id`: Exclui um currículo.

Certifique-se de autenticar suas solicitações, conforme necessário, para acessar rotas protegidas.

## Autenticação

Esta API utiliza autenticação baseada em tokens JWT (JSON Web Tokens). Para acessar rotas protegidas, inclua o token JWT no cabeçalho da solicitação: authorization: Bearer SEU_TOKEN_JWT


## Contribuição

Sinta-se à vontade para contribuir para o desenvolvimento desta API. Crie um fork do repositório, faça as modificações necessárias e envie um pull request. Certifique-se de seguir as diretrizes de contribuição.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.

## Contato

Em caso de dúvidas ou problemas, entre em contato conosco em [jtneto.dev@gmail.com](mailto:jtneto.dev@gmail.com).












