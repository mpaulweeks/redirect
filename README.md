# redirect

simple app to experiment with Node + serverless

## ci setup

- create group with the following policies:
  - AWSLambdaFullAccess
  - IAMFullAccess
  - AmazonAPIGatewayAdministrator
- create new IAM user with the above group
- add user to CircleCI project config
