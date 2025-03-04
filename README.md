# React + TypeScript + Vite
### 📝 Технологии:
* React: Управление UI и компонентами.
* TypeScript:  Типизация.
* Redux Toolkit: Управление состоянием.
* Vite: Быстрая сборка и разработка.
* Axios: Работа с API.
* react-infinite-scroll-component: для бесконечной прокрутки.
* SASS: Для стилизации компонентов.
* express: Поднятие локального сервера


# News_app (Тестовое задание)

Это приложение позволяет получать новости на основе данных из [The New York Times Developer Network API](https://developer.nytimes.com).


## 🚀 Как запустить проект

1. Склонируйте репозиторий:
   ```sh
   git clone https://github.com/Khant2709/news_app_test_task.git
   cd weather-app

2. Установите зависимости:
    ``` 
   npm install
    
3. Запуск мини-сервера:
* Для обхода CORS-политики используется прокси-сервер.
* Убедитесь, что у вас есть файл server.js с настроенным ключом API NYT.
* Запустите сервер
    ``` 
   node server.js

5. Запуск приложения:
    ``` 
   npm run dev
   
* Откройте браузер по адресу http://localhost:5173 (или другой порт, указанный в консоли).

### ⚠️ Примечания
* Если ключ устарел, то вам нужно установить свой ключь в файле server.js.
* Если у вас нет ключа API NYT, зарегистрируйтесь на developer.nytimes.com и добавьте ключ в server.js.