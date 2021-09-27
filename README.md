> JobBoard project

## Setup Database
``` bash
# import database
mysql -u USERNAME -p
CREATE DATABASE JobBoard;
exit
mysql -u USERNAME -p JobBoard < /Step01/JobBoard.sql

# Go to /Backend/servers.js and /Backend/app/model/db.js and change username and password.
```

## Setup front and back
### open /Frontend and /Backend in terminal

``` bash
# install dependencies
npm install

# server with hot reload at localhost:8080 (frontend) and localhost:3000 (backend)
npm start
```
#### Connect to http://localhost:8080/index.html

