FROM node:20-alpine

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем схему Prisma отдельно для генерации клиента
COPY prisma ./prisma/
RUN npx prisma generate

# Копируем весь остальной код
COPY . .

# Открываем порт бэкенда
EXPOSE 3001

# Команда запуска с автоматическим накатыванием миграций и сидом базы
CMD npx prisma migrate deploy && npx prisma db seed && npm run dev