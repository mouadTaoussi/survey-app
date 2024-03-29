<p align="center">
  <!-- <img src="https://github.com/mouadTaoussi/survey-app/blob/master/Public/src/assets/logoLightBg.svg"/> -->
  <img src="https://github.com/mouadTaoussi/survey-app/blob/master/Public/src/assets/logoShowCase.jpg"/>
</p>

<h4 align="center">
	<strong>Create Surveys and Collect data of them😎</strong>
</h4>

<h3 align="center">
  <a href="https://github.com/mouadTaoussi/survey-app/blob/master/CONTRIBUTING.md">Contribute</a>
  <span> · </span>
  <a href="https://github.com/mouadTaoussi/survey-app/blob/master/CODE_OF_CONDUCT.md">Code of conduct</a>
</h3>

---

### What is SurveyApp ?
Open source software to create surveys then collects responses from your target (eg: clients-students...etc) represented in graphes describing the responses, for easier understanding!
You can now use an aternative **Open source** application that fit your needs if you have worries about your **data**.

### How it works ?
If you are intresting about learning how the application collects and handles responses in order to give the user full report of responses represented in graphs, see [this algorithm that responsible about that Job](https://github.com/mouadTaoussi/survey-app/blob/master/Controllers/Questions.js#L136-L226), it is provided with comments to understand each block of code.

**Note: if you couldn't understand any part of the code, Please open up new issue attached with the ``question`` label, to get help for better understanding!**

### Technologies
#### Back-End side
- **NodeJS / ExpressJS** : Back-end API
- **MongoDB / Mongoose / RedisLab** : Data Storage / Auth Cookies
- **Nodemailer** : Reset Password
- **PassportJS** : Oauth 2.0
- **Puppeteer** : Survey Responses report (PDF)
#### Front-End side
- **Bootstrap** : Initial styles
- **Webpack** : Front-end bundle
- **[AntVG2Plot](https://g2plot.antv.vision/)** : Responses in Charts
- **[SortableJS](https://sortablejs.github.io/Sortable/)** : Sorting questions

### Contributing
If you want to give something helpfull to the project (eg: more orianted to open source, improve the app...) we are welcoming you! 😊<br />
Before start, I invite you to read the [contributing](https://github.com/mouadTaoussi/survey-app/blob/master/CONTRIBUTING.md) for easier set-up and understanding the codebase!<br />
then read the [code of conduct](https://github.com/mouadTaoussi/survey-app/blob/master/CODE_OF_CONDUCT.md) to keep in mind our community standards
#### Submitting a PR
If you have an idea that needs to be implemented in **SurveyApp**, First Open up new issue with label of **enhancement** and, create a branch in your copy of the repo, then start work on the feature.

##### Guidlines to respect:
- Open new issue if it doesn't aleardy exists,
- Less commits, no more than 10
- No useless comments
- Code should be readable
- respect the code standards
<!-- - If any similar PR already exists, mention it, -->

#### Reporting an issue
When you find an issue in the app, any kind, follow the same way above but with some changes:
Labels should be **bug** and other labels related to the issue listed in the labels section, then you decide whether you'll work on it or not.

### Code of conduct 
Please read the [code of conduct](https://github.com/mouadTaoussi/survey-app/blob/main/CODE_OF_CONDUCT.md)

### Licence
This project is under [MIT License](https://github.com/mouadTaoussi/survey-app/blob/master/LICENSE)
