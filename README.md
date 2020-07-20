# Cygnet Login/Authentication app

A full-stack login/authorisation app using MongoDB, Express, Node and React. 
Also uses Redux for state management for React components.

App allows user to:

- Register
- Login 
- Access protected pages only accessible to logged in users
- Log out


## Built With

- Node.js
- Express
- MongoDB
- React

## API Routes

### Register endpoint

/api/users/register

POST

using x-www-form-urlencoded require following fields: 

- {'name': 'Fake Name'}
- {'email': 'name@domain.com'}
- {'password': 'password'}
- {'password2: 'password'}

Checks email if it already exists > if email does not exist and password match saves in DB

returns success status:200 and returns json object with users details 

if error it returns status 400 and returns msg with error message

### Login endpoint

/api/users/login

POST

using x-www-form-urlencoded require following fields:

- {'email': 'name@domain.com'}
- {'password': 'password'}

Checks for email in db and compares hashed password

returns success status:200 and returns success true with a authentication token that is stored in localstorage

if error returns status:400 and returns error msg


## Deploy to Heroku

```bash
cd into project root folder
heroku create
git push heroku master
```

This deployment will automatically:

  * detect [Node buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)
  * build the app with
    * `npm install` for the Node server
    * `npm run build` for create-react-app
  * launch the web process with `npm start`
    * serves `../react-ui/build/` as static files
    * customize by adding API, proxy, or route handlers/redirectors

⚠️ Using npm 5’s new `package-lock.json`? We resolved a compatibility issue. See [PR](https://github.com/mars/heroku-cra-node/pull/10) for more details.

👓 More about [deploying to Heroku](https://devcenter.heroku.com/categories/deployment).

