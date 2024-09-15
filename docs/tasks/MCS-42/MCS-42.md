# Задача "Установление связи между устройствами"
 
### MCS-43 Добавление экрана "Направления"
### MCS-44 Обработка выбора текущего направления
### MCS-45 Поиск списка сессий с заданной частотой 

15.04.2024 Понедельник

**Задачи:**

**Ответственный**: Матвей
- [x] Посмотреть проекты на python с использованием WebRTC, сделать MVP:
  - [x] Два клиента связываются в локальной сети через сервер

**Ответственный**: Семён 
- [x] Доработка UI для вызова
  - [x] Сохранение активного направления
  - [x] Обработка нажатия на кнопку вызова

- ~~Не удается сделать соединение через WebRTC~~:
  - Для того, чтобы передавать звук через браузер, необходимо иметь https соединение
  - С хоста https можно отправлять запросы только по https протоколу
  - Протокол WSS при локальном запуске работает через 127.0.0.1, localhost, а через ip-адрес вида 192.168.0.X - не работает
- Победили WebRTC, чтобы можно было по IP-адресу подключаться, чтобы в дальнейшем таких проблем не было, нужно:
  - Выпустить нормальный сертификат (купить за деньги)
  - Настроить WS на стороне MCS, прокинуть сертификаты
  - Накидать логику по добавлению в комнаты
----

MCS-46
- [x] Логика по созданию комнаты и обмену информации, написанная на Python
- [x] Логика по закрытию комнаты, написанная на Python
- [ ] Подключаем pet-project c видеоконференциями к Python FastAPI over SSL
- [ ] Переносим логику на фронт MCS



----
Полезные ссылки:

https://chankapure.medium.com/live-audio-streaming-with-node-js-web-audio-api-and-webrtc-1cec0655ea09

https://stackoverflow.com/questions/41352426/javascript-real-time-voice-streaming-and-processing-it-in-django-backend

https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API

https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Build_a_phone_with_peerjs/Connect_peers/Get_microphone_permission

https://webaudioplayground.appspot.com/#