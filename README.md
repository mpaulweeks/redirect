# redirect

simple app to experiment with Node/Express + serverless architecture

## setting up claudia locally and creating the lamda

see [pkg/api/README.md](/pkg/api/README.md)

afterwards in AWS:

- ensure `fe` folder resources are public
  - see [s3_bucket_policy.txt](/s3_bucket_policy.txt)
  - see [s3_cors_policy.txt](/s3_cors_policy.txt)
- ensure role `redirect-api-executor` has the policy `AmazonS3FullAccess`

## setting up CircleCI and automated deploys

- create group with the following policies:
  - `AWSLambdaFullAccess`
  - `IAMFullAccess`
  - `AmazonAPIGatewayAdministrator`
- create new IAM user with the above group
- add user to CircleCI project config

## setting up custom domain

- use ACM to create a new cert
  - use DNS provider to verify the cert
- use API Gateway to add the custom domain
  - Create Custom Domain name using the cert generated above
  - add Base Path Mapping with the `Path` empty and the `Destination` set to production
