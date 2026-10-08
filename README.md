# Cumulative Drugs Tracker

Приложение для отслеживания приёма лекарств: учёт доз, накопительный прогресс по дням и месяцам, настраиваемые параметры курса. Данные хранятся локально на устройстве (IndexedDB) и не передаются на сервер.

**🔗 Демо:** https://cumulative-drugs-tracker.vercel.app/

> ⚠️ **Приложение адаптировано только для смартфонов.** На десктопных экранах корректная работа интерфейса не гарантируется.

## Технологический стек

### Основные

- **React 19** — UI-библиотека
- **TypeScript** — типизация
- **Vite** — сборка и dev-сервер
- **Radix UI Themes / Radix UI Form** — компоненты интерфейса
- **Vanilla Extract** — типобезопасные CSS-модули (CSS-in-TS)
- **wouter** — лёгкий роутинг
- **idb** — работа с IndexedDB (локальное хранение записей и настроек)
- **vite-plugin-pwa / Workbox** — поддержка PWA

### Инфраструктура и качество кода

- **pnpm** — пакетный менеджер
- **Vitest + Testing Library** — unit-тесты и покрытие (coverage-istanbul)
- **ESLint** (airbnb config, typescript-eslint) — линтинг JS/TS
- **Stylelint** (clean-order, scss) — линтинг стилей
- **Prettier** — форматирование
- **Husky + lint-staged** — git-хуки и проверка изменённых файлов

## Локальный запуск

```bash
# установка зависимостей
pnpm install

# запуск dev-сервера
pnpm dev

# сборка production-версии
pnpm build

# предпросмотр production-сборки
pnpm preview
```

## Скрипты

| Команда       | Описание                                  |
| ------------- | ----------------------------------------- |
| `pnpm dev`    | Запуск dev-сервера с HMR                  |
| `pnpm build`  | Проверка типов (`tsc -b`) и сборка через Vite |
| `pnpm preview`| Локальный предпросмотр собранного приложения  |
| `pnpm test`   | Запуск тестов с покрытием                 |
| `pnpm test:watch` | Запуск тестов в watch-режиме          |
| `pnpm lint`   | Линтинг и автофикс (ESLint)               |

## Структура проекта

Проект организован по Feature-Sliced Design:

```
src/
├── app/        # инициализация приложения, провайдеры, роутер
├── entities/   # бизнес-сущности (record)
├── features/   # функциональные модули (calendar, records)
├── pages/      # страницы (HomePage, Settings)
├── shared/     # переиспользуемый код: провайдеры, UI-кит, типы, утилиты
└── main.tsx    # точка входа
```

## Деплой

Приложение развёрнуто на **Vercel**: https://cumulative-drugs-tracker.vercel.app/
