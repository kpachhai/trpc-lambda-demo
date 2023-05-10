import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from './lambda'

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'https://scfqruwvi6.execute-api.us-east-2.amazonaws.com/test'
    })
  ]
})

// Create a function to call your 'hello' procedure
async function callHelloProcedure() {
  const data = await client.hello.mutate({ name: 'Kiran' })
  console.log(data) // should print: Hello, Alice
}

// Call the function
callHelloProcedure().catch(console.error)
