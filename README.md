# Movie Favorites - Documentação do Projeto

## Descrição

Aplicação web para gerenciamento de filmes favoritos utilizando a API do TMDb (The Movie Database). O projeto permite buscar filmes, adicionar aos favoritos, visualizar diferentes categorias de filmes e compartilhar listas de favoritos com outros usuários.

## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- Prisma ORM
- MySQL (Docker)
- Axios
- CORS

### Frontend
- React 19
- Vite
- CSS3
- Axios

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js (versão 16 ou superior)
- Docker e Docker Compose
- npm ou yarn
- Conta na API do TMDb

## Configuração do Ambiente

### 1. Obter API Key do TMDb

1. Acesse [The Movie Database](https://www.themoviedb.org/)
2. Crie uma conta ou faça login
3. Vá em Configurações > API
4. Solicite uma API Key (gratuita)
5. Copie o Bearer Token gerado

### 2. Configuração do Banco de Dados MySQL com Docker

O projeto já possui um arquivo `docker-compose.yml` configurado na pasta `backend`.

#### Iniciar o Container MySQL

```bash
cd backend
docker-compose up -d
```

Isso irá criar um container MySQL com as seguintes configurações:
- Host: localhost
- Porta: 3306
- Database: movies_db
- Usuário root: root
- Senha root: root
- Usuário: user
- Senha: password

#### Verificar se o Container está Rodando

```bash
docker ps
```

Você deverá ver o container `mysql_prisma` na lista.

#### Parar o Container (quando necessário)

```bash
docker-compose down
```

#### Parar e Remover Volumes (limpar dados)

```bash
docker-compose down -v
```

### 3. Configuração do Backend

#### Instalar Dependências

```bash
cd backend
npm install
```

#### Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais:

```env
DATABASE_URL="mysql://root:root@localhost:3306/movies_db"
TMDB_API_KEY="seu_bearer_token_aqui"
```

Substitua `seu_bearer_token_aqui` pelo Bearer Token obtido do TMDb.

#### Executar Migrations do Prisma

Aguarde alguns segundos para o MySQL inicializar completamente, então execute:

```bash
npx prisma generate
npx prisma migrate deploy
```

### 4. Configuração do Frontend

#### Instalar Dependências

```bash
cd frontend
npm install
```

## Executando o Projeto

### 1. Iniciar o MySQL (Docker)

```bash
cd backend
docker-compose up -d
```

### 2. Iniciar o Backend

Na pasta `backend`:

```bash
npm install
npm start
```

O servidor backend estará rodando em `http://localhost:3000`

### 3. Iniciar o Frontend

Em um novo terminal, na pasta `frontend`:

```bash
npm install
npm run dev
```

O aplicativo frontend estará disponível em `http://localhost:5173`

## Estrutura do Projeto

```
movie-favorites/
├── backend/
│   ├── controllers/
│   │   └── moviesController.js
│   ├── routes/
│   │   └── movies.js
│   ├── services/
│   │   └── tmdbService.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── prisma.config.ts
│   ├── docker-compose.yml
│   ├── app.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── MovieCard.jsx
    │   │   ├── MovieRow.jsx
    │   │   └── SharedFavoritesModal.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Funcionalidades

### Principais Recursos

1. **Busca de Filmes**: Pesquise filmes por título usando a barra de pesquisa
2. **Categorias**: Navegue por diferentes categorias:
   - Em Alta Esta Semana
   - Filmes Populares
   - Mais Bem Avaliados
   - Em Breve
   - Ação, Comédia, Terror, Romance, Ficção Científica
   - Documentários
   - Séries Populares

3. **Gerenciamento de Favoritos**:
   - Adicionar filmes aos favoritos
   - Remover filmes dos favoritos
   - Visualizar lista de favoritos

4. **Compartilhamento**:
   - Gerar link de compartilhamento dos favoritos
   - Visualizar favoritos compartilhados por outros usuários

## API Endpoints

### Filmes

- `GET /movies/search?query={query}` - Buscar filmes
- `GET /movies/discover` - Obter séries populares
- `GET /movies/categories` - Obter todas as categorias de filmes

### Favoritos

- `GET /movies/favorites` - Listar favoritos
- `POST /movies/favorites` - Adicionar favorito
- `DELETE /movies/favorites/:id` - Remover favorito
- `POST /movies/favorites/share` - Gerar link de compartilhamento
- `GET /movies/shared/:token` - Obter favoritos compartilhados

## Comandos Úteis do Docker

### Verificar Logs do MySQL

```bash
docker logs mysql_prisma
```

### Acessar o MySQL via Terminal

```bash
docker exec -it mysql_prisma mysql -uroot -proot movies_db
```

### Listar Volumes do Docker

```bash
docker volume ls
```

### Remover Container e Volume

```bash
cd backend
docker-compose down -v
```

## Solução de Problemas

### Container MySQL não Inicia

Verifique se:
- A porta 3306 não está sendo usada por outra instância do MySQL
- O Docker está rodando corretamente
- Há espaço em disco disponível

```bash
# Verificar se a porta está em uso
sudo lsof -i :3306

# ou no Windows
netstat -ano | findstr :3306
```

### Erro de Conexão com o Banco de Dados

Aguarde alguns segundos após iniciar o container MySQL antes de executar as migrations:

```bash
docker-compose up -d
sleep 10
npx prisma migrate deploy
```

### Erro na API do TMDb

Verifique se:
- A API Key no `.env` está correta
- Você está usando o Bearer Token, não a API Key v3
- Há limite de requisições disponíveis na sua conta

### Resetar o Banco de Dados

```bash
cd backend
docker-compose down -v
docker-compose up -d
sleep 10
npx prisma migrate deploy
```

## Scripts Disponíveis

### Backend

- `npm start` - Inicia o servidor

### Frontend

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## Guia Rápido de Inicialização

```bash
# 1. Clone o repositório
git clone https://github.com/Gui-leite233/movie-favorites.git
cd movie-favorites

# 2. Configure o backend
cd backend
npm install
cp .env.example .env
# Edite o .env com suas credenciais

# 3. Inicie o MySQL
docker-compose up -d
sleep 10

# 4. Execute as migrations
npx prisma generate
npx prisma migrate deploy

# 5. Inicie o backend
npm start

# 6. Em outro terminal, configure o frontend
cd ../frontend
npm install
npm run dev
```