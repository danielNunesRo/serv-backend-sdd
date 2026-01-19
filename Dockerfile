# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia o restante da aplicação
COPY . .

# Build TypeScript para JavaScript
RUN npm run build

# Etapa 2: Imagem final para produção
FROM node:20-alpine

WORKDIR /app

# Copia apenas o build e node_modules necessários
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Expõe a porta da aplicação (ajuste se for diferente)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main.js"]
