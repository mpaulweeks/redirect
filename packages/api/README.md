# redirect-api

https://yi9bbl5wp1.execute-api.us-east-1.amazonaws.com/latest

## installation

Following this [setup guide](https://medium.freecodecamp.org/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35)

altered steps for setting up lambda deploy via claudia:

```
yarn run claudia generate-serverless-express-proxy --express-module src/app
rm package-lock.json
yarn run claudia create --handler lambda.handler --deploy-proxy-api --region us-east-1
```

afterwards in AWS:

- ensure FE resources are public
- ensure role `redirect-api-executor` has the policy `AmazonS3FullAccess`
