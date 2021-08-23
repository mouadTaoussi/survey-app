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