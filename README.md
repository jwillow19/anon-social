# Secret Share

An social media web app that lets you share your thoughts anonymously

## Made With

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Redux](https://redux.js.org/) - State Management
* [Node](https://nodejs.org/en/) - Used for backend server
* [Express](https://expressjs.com/) - Node.js framework
* [MongoDB](https://rometools.github.io/rome/) - Database

## What it do?
* Create and update profile information
* Send verification email
* Post, comment, replies
* Like, unlike posts, comments, replies
* Delete owned posts and comments
* Search user
* Pagination for home feed, user profile, tag page, comments and replies, 

### Realtime
* Get realtime notification when someone like, comment, reply on your posts
* Chatting, message text or image

## Installing

### [1.] Installing project dependencies
```
npm i[install] 
cd client
npm i[install]
cd ..
```


### [2.] Changing environment variables
Go to ```config/default.json``` to change 
```
{
"mongoURL"= "YOUR_MONGODB_CONNECTION_STRING",
"jwtSecret"= "YOUR_JSON_WEB_TOKEN_SECRET"
}
```
### [3.] (Optional) Replace hosting address
Default port for server is http://localhost:5000
Default port for client is http://localhost:3000

To change port for client, go to package.json in root dir and replace NEW_PORT
```
 "scripts": {
    ...
    "client": "PORT=NEW_PORT npm start --prefix client",
    ...
  },
  ```
  
To change port for server, go to server.js in root dir and replace NEW_PORT
```
const PORT = process.env.PORT || NEW_PORT;
```

## Run Project
cd to root dir and run ```npm run dev```

