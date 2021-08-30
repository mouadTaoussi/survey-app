## Files structure

> We are about to change the files structure to a more good one for modern file structures

| Website&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Description |
| ----------------------- | ------------------ |
| [Api](https://github.com/mouadTaoussi/webcheck/tree/main/wc-front-end)| The Restful API |
| [Config](https://github.com/mouadTaoussi/webcheck/tree/main/src)| Back-end API, Written in Typescript |
| [Controllers](https://github.com/mouadTaoussi/webcheck/tree/main/dist)| The controllers that handle the HTTP requests |
| [Desktop](https://github.com/mouadTaoussi/webcheck/tree/main/dist)| Desktop version, ElectronJS |
| [Grahpql](https://github.com/mouadTaoussi/webcheck/tree/main/dist)| GraphQL API (not available yet) |
| [Middlewares](https://github.com/mouadTaoussi/webcheck/tree/main/dist)| Middlewares of the Back-end API |
| [Models](https://github.com/mouadTaoussi/webcheck/tree/main/dist)| Models of the Back-end API |
| [Passport](https://github.com/mouadTaoussi/webcheck/tree/main/dist)| Authentication Oauth2.0 |
| [Public](https://github.com/mouadTaoussi/webcheck/tree/main/dist)| Front-end code |
| [Resources](https://github.com/mouadTaoussi/webcheck/tree/main/dist)|  |
| [Routes](https://github.com/mouadTaoussi/webcheck/tree/main/dist)| Routes of the Back-end API |
| [Views](https://github.com/mouadTaoussi/webcheck/tree/main/dist)| EJS views |

## Init the project in local env

### Clone the repo

```
git clone https://github.com/mouadTaoussi/survey-app.git
```
```
cd survey-app
```

### Install the dependencies

```
npm install
```

### Create ``.env`` file and add those elements within your credentiels below:

```
touch Config/.env
```
```
NODE_ENV = development
NODE_PORT = 5000
HOST_NAME = localhost:5000

EXPRESS_SESSION_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
JSON_WEB_TOKEN_SECRET = xxxxxxxxxxxxxxxxxxxxxxxxxxx

GOOGLE_ID = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_SECRET = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LINKEDIN_ID = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LINKEDIN_SECRET = xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_ID = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_SECRET = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

DATABASE_CONNECTION = xxxxxxxxxxxxxxxxxxxxxxxxx

FIREBASE_API_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxx
FIREBASE_AUTH_DOMAIN = xxxxxxxxxxxxxxxxxxxxxxxx
FIREBASE_DATABASE_URL = xxxxxxxxxxxxxxxxxxxxxxx
FIREBASE_STORAGE_BUCKET = xxxxxxxxxxxxxxxxxxxxx
FIREBASE_PROJECT_ID = xxxxxxxxxxxxxxxxxxxxxxxxx

REDIS_LABS_HOST = xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REDIS_LABS_PORT = 19679
REDIS_LABS_PASSWORD = xxxxxxxxxxxxxxxxxxxxxxxxx

EMAIL_ADDRESSE = xxxxxxxxxxxxxxxxxxxxxx
EMAIL_PASSWORD = xxxxxxxxxxxxxxxxxxxxxx

```

### run app locally

```
npm run dev
```

### run app when it is in prod

```
npm run start
```
