# Corvell Immigration

Многостраничный сайт Corvell Immigration на React и Vite.

## Запуск

```bash
npm install
copy .env.example .env
npm run dev
```

После запуска сайт доступен по адресу `http://127.0.0.1:5173/`.

Перед отправкой формы заполните SMTP-параметры в `.env`. Для SMTP на порту `465` установите `SMTP_SECURE=true`, для порта `587` — `SMTP_SECURE=false`. Значение `CONTACT_TO_EMAIL` — адрес, на который должны приходить обращения, а `SMTP_FROM` — подтвержденный у почтового провайдера адрес отправителя.

Команда `npm run dev` одновременно запускает Vite на порту `5173` и API формы на порту `5174`.

## Production-сборка

```bash
npm run build
npm start
```

После production-сборки сервер отдает и сайт, и API по адресу `http://127.0.0.1:5174/`.

## Развертывание

Готовые production-конфигурации находятся в `deploy/nginx` и `deploy/systemd`. Репозиторий размещается непосредственно в `/var/www/corvellimmigration.com`. Nginx раздает собранный React-сайт из `dist` и передает только запросы `/api` локальному Node.js-процессу. Node.js запускается от существующего пользователя `devel` с группой `www-data`. SMTP-параметры на сервере хранятся вне Git-репозитория в `/etc/corvellimmigration/corvellimmigration.env`.

## Структура

- `src/app` — маршрутизация и корневая композиция приложения;
- `src/pages` — страницы сайта;
- `src/components/layout` — общие шапка и футер;
- `src/components/common` — универсальные элементы интерфейса;
- `src/components/cards` — переиспользуемые карточки;
- `src/components/home`, `src/components/about`, `src/components/team`, `src/components/services`, `src/components/industries`, `src/components/insights`, `src/components/careers` и `src/components/contact` — модульные секции страниц;
- `src/content` — контент и общие сущности: фирма, услуги, отрасли, материалы и команда;
- `src/styles` — дизайн-токены и глобальные стили;
- `src/assets` — локальные изображения и графика.
- `shared` — общая клиентская и серверная валидация;
- `server` — API формы и SMTP-отправка.

Новые страницы добавляются в `src/pages`, а маршруты — в `src/app/App.jsx`. Повторяющиеся блоки размещаются в `src/components` и наполняются данными из `src/content`.

Общая механика бегущих строк находится в `Marquee`, текстовые ленты собираются через `TextTicker`, секционные заголовки — через `SectionIntro`, блоки руководств — через `GuideCollection`, повторяющиеся списки — через `DetailList`, а нижние CTA — через `LinkListCta` и `ActionBanner`. Страницы передают этим компонентам только свой контент и нужный вариант отображения.

## Архитектура контента

- `/about`, `/team`, `/careers`, `/contact` — самостоятельные страницы;
- `/services` — каталог услуг, `/services/:slug` — страница визовой категории;
- `/industries` — каталог отраслей, `/industries/:slug` — страница отрасли;
- `/insights` — редакционный архив;
- `/insights/briefs/:slug` — квартальные обзоры и статьи;
- `/insights/guides/:slug` — практические руководства;
- `/careers/:slug` — отдельная вакансия при расширении раздела.

Команда в текущем дизайне является единой страницей с якорями профилей. Общие сущности хранятся отдельно в `src/content`, поэтому карточки на главной, архивы и будущие детальные страницы смогут использовать один источник данных.
