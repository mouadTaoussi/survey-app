<p align="center">
  <img src="https://github.com/mouadTaoussi/survey-app/blob/master/Screenshots/newestLogo.jpg"/>
  <!-- <img src="https://github.com/mouadTaoussi/survey-app/blob/master/Public/src/assets/logoShowCase.jpg"/> -->
</p>
<!-- <p align="center">
  <img src="https://github.com/mouadTaoussi/checkwebsite/blob/master/wc-front-end/src/assets/LogoPreview.png"/>
</p>
<p align="center">
  <img src="https://github.com/mouadTaoussi/checkwebsite/blob/master/wc-front-end/src/assets/DashboardPreview.svg"/>
</p> -->

<!-- <h1 align="center">Create Surveys and get responses about it</h1> -->
<h6 align="center">
	<strong>Create Surveys and get responses about them😎</strong>
</h6>

# Get Up and running in local env

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