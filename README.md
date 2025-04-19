



# Todo Fullstack

Uma aplicação fullstack com React, Node.js, TypeScript e Docker

## Requisitos
- Docker 20.10+
- Docker Compose 2.20+

## Iniciando com Docker

1. **Clone o repositório**
```bash
git clone https://github.com/your-repo/todo-fullstack.git
cd todo
```

2. **Construa e execute os containers**
```bash
docker-compose up --build
```

3. **Acesse a aplicação**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Docs: http://localhost:3000/api-docs

## Comandos úteis do Docker

| Comando                          | Descrição                                  |
|----------------------------------|-------------------------------------------|
| `docker-compose up --build`      | Constroi e inicia os containers           |
| `docker-compose down`            | Para e remove os containers               |
| `docker-compose logs -f`         | Mostra logs em tempo real                 |
| `docker-compose restart`         | Reinicia os containers                    |
| `docker system prune`            | Limpa recursos não utilizados do Docker   |

## Configuração Específica do Node.js

Os Dockerfiles usam a versão específica do Node.js 22.14.0:

**Frontend Dockerfile**
```dockerfile
FROM node:22.14.0-alpine AS builder
```

**Backend Dockerfile**
```dockerfile
FROM node:22.14.0-alpine
```

Para alterar a versão do Node.js:
1. Edite ambos Dockerfiles
2. Altere a tag da imagem:
```dockerfile
FROM node:<nova-versão>-alpine
```
3. Reconstrua os containers:
```bash
docker-compose up --build --force-recreate
```

## Estrutura do Projeto
```bash
.
├── todo-frontend/
│   ├── Dockerfile          # Especifica Node 22.14.0
│   ├── nginx.conf
│   └── ...
├── todo-backend/
│   ├── Dockerfile          # Especifica Node 22.14.0
│   └── ...
└── docker-compose.yml
```

## Ambiente de Desenvolvimento
Para desenvolvimento local com a versão correta do Node:
```bash
nvm use 22.14.0  # Ou instale via nvm install 22.14.0
npm run dev      # Tanto no frontend quanto no backend
```
