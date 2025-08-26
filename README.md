# AppForDevOps: Пайплайн приложения

Приложение для развёртки в среде Kubernetes

# ToDo Application

Это full-stack приложение для управления задачами (ToDo List), полный цикл от написания кода до автоматической сборки, развертывания и мониторинга.

## Технологии

-   **Бэкенд**: ASP.NET Core 9.0, Entity Framework Core, PostgreSQL.
-   **Фронтенд**: React 18, TypeScript, Axios.
-   **База данных**: PostgreSQL.
-   **Контейнеризация**: Docker, Docker Compose.
-   **CI/CD**: Azure DevOps (YAML Pipelines).
-   **Мониторинг**: Приложение экспортирует метрики для Prometheus по эндпоинту `/api/metrics`.

## Локальная разработка

Для запуска всего стека на локальной машине используется Docker Compose.

**Требования:**
-   Docker
-   Docker Compose

**Инструкции:**
1.  Клонируйте репозиторий:

    git clone https://github.com/DeadlyAhead/AppForDevops.git
    cd AppForDevops

2.  Запустите приложение:

    docker-compose up --build -d


**Доступные сервисы:**
-   **Фронтенд**: `http://localhost:3001`
-   **Бэеенд (Swagger)**: `http://localhost:5235/swagger`
-   **Метрики для Prometheus**: `http://localhost:5235/api/metrics`

## CI/CD Пайплайн

Репозиторий содержит `azure-pipelines.yml`, который настроен для работы в Azure DevOps.

**Возможности пайплайна:**
1.  **Триггер**: Запускается автоматически при создании нового Git-тега, соответствующего формату `v*.*.*`.
2.  **Сборка и Публикация**: Собирает Docker-образы для бэкенда и фронтенда и отправляет их в Docker Hub, помечая тегами версий приложения, и тегом `latest`.

## Развертывание (Deployment)

Это приложение предназначено для развертывания в Kubernetes. Вся необходимая конфигурация для этого находится в репозитории: **[Terraform-K8s](https://github.com/DeadlyAhead/Terraform-K8s)**.