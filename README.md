# trpc-lambda-demo

This demo currently sets up a trpc server in AWS lambda and the client calls the API gateway endpoint to call the lambda function.

## How to split up procedures into separate lambda functions

You just need to setup a second lambda function for `hello2` and a second API gateway endpoint to link up with that second lambda function. Then, update the client.ts to call this second procedure.
