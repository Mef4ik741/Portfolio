# Деплой на Netlify

## Что уже настроено

- `netlify.toml` — конфигурация деплоя
- `@netlify/plugin-nextjs` — добавлен в devDependencies
- `next.config.ts` — настроен с `output: 'standalone'`

## Шаги деплоя

### 1. Установи зависимости

```bash
npm install
```

### 2. Локальная проверка (опционально)

```bash
netlify dev
```

### 3. Деплой через CLI

```bash
# Установи Netlify CLI если ещё нет
npm install -g netlify-cli

# Авторизуйся
netlify login

# Свяжи проект с Netlify (первый раз)
netlify init

# Или если уже связан
netlify deploy --prod
```

### 4. Деплой через Git (рекомендуется)

1. Запушь код на GitHub/GitLab/Bitbucket
2. В Netlify Dashboard: **Add new site** → **Import from Git**
3. Выбери репозиторий
4. Настройки:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Нажми **Deploy site**

### 5. Environment Variables

В Netlify Dashboard → **Site settings** → **Environment variables** добавь:

```
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

**Важно:** База данных должна быть доступна извне. В Render проверь:
- External Database URL активен
- IP Allow List: `0.0.0.0/0` (все) или IP Netlify

### 6. Проверка после деплоя

Открой сайт и проверь:
- `/api/projects` — должен вернуть JSON с проектами
- `/portfolio` — должна отображаться сетка проектов
- Главная страница — фото и текст

## Возможные проблемы

### 404 на API
- Убедись что `@netlify/plugin-nextjs` установлен
- Проверь `netlify.toml` наличие `[[plugins]]`

### БД недоступна
- Проверь `DATABASE_URL` в Environment Variables
- Проверь External Connection в Render Dashboard

### CORS ошибки
- Проверь что `middleware.ts` не блокирует API

## Полезные команды

```bash
# Локальный запуск как на Netlify
netlify dev

# Проверка конфигурации
netlify status

# Логи деплоя
netlify deploy --prod --debug
```
