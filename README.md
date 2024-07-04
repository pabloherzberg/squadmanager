
# SquadManager

## Introdução
O SquadManager é uma aplicação web completa para gerenciamento de squads e tarefas. Este repositório contém tanto o frontend quanto o backend da aplicação.

## Estrutura do Repositório
- **frontend/**: Contém o código fonte do frontend da aplicação.
- **backend/**: Contém o código fonte do backend da aplicação.

## Documentação
### Frontend
A documentação completa do frontend pode ser encontrada [aqui](./sm-front/README.md).

### Backend
A documentação do backend é gerada automaticamente usando o Swagger. Para acessar a documentação da API, siga os passos abaixo para iniciar o backend e navegue até `http://localhost:3000/api-docs`.

## Instalação e Execução
### Requisitos
- Node.js >= 14
- npm >= 6
- Docker (opcional, para ambiente de desenvolvimento)

### Passos para Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/pabloherzberg/squadmanager.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd squadmanager
   ```

### Iniciar o Backend
1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
O backend estará disponível em `http://localhost:3000` e a documentação da API estará em `http://localhost:3000/api-docs`.

### Iniciar o Frontend
1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
O frontend estará disponível em `http://localhost:3001`.

### Usando Docker
Para iniciar toda a aplicação usando Docker, execute o comando abaixo na raiz do projeto:
```bash
docker-compose up --build
```
Isso irá construir e iniciar tanto o frontend quanto o backend em containers Docker.

## Contribuição
Contribuições são bem-vindas! Por favor, abra um pull request com melhorias, correções de bugs ou novas funcionalidades.

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
