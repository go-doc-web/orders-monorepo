FROM node:20-alpine

WORKDIR /app

# Копируем package.json
COPY package*.json ./

# Устанавливаем чистые зависимости
RUN npm install

# Копируем весь код
COPY . .

# Прописываем адрес бэкенда для этапа компиляции
ENV NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Собираем оптимизированный Production билд (без Турбопака!)
RUN npm run build

EXPOSE 3000

# Запускаем готовый продакшн сервер
CMD ["npm", "run", "start"]