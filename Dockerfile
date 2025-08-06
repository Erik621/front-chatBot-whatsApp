# Etapa 1: Build
FROM node:20-alpine AS build

# Diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código
COPY . .

# Gera build otimizado
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Copia build para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração customizada do Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Comando para manter o Nginx rodando
CMD ["nginx", "-g", "daemon off;"]
