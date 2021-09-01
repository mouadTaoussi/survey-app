### How SurveyApp collects responses data and calculates and procces them to make them readable into graphes?

There is an Algorithm that handle that procces located in [this file](https://github.com/mouadTaoussi/survey-app/blob/master/Controllers/Questions.js#L136-L226)

#### First Step: Loop over the questions
#### Second Step: Loop over the options of each question
#### Third Step: Loop over the responses from the audience in Database
#### Fourth Step: Find the response of each relevent question in the responses
#### Fifth Step: Compare response to the options in questions
### Note: I'm gonna include Diagrams to explaining the mechanism of it!
