# redirect-api

https://yi9bbl5wp1.execute-api.us-east-1.amazonaws.com/production
https://yi9bbl5wp1.execute-api.us-east-1.amazonaws.com/staging

## installation

Following this [setup guide](https://medium.freecodecamp.org/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35)

slightly altered steps for the initial setting up lambda deploy via claudia:

### create lambda proxy

```
yarn run claudia generate-serverless-express-proxy --express-module src/app
rm package-lock.json
```

generated `lambda.js`

### create remote AWS resources

```
yarn run claudia create --handler lambda.handler --deploy-proxy-api --region us-east-1
```

generated `claudia.json`
