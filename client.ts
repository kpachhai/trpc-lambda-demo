import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter as AppRouter1 } from './lambda'
import { AppRouter as AppRouter2 } from './lambda2'

const client1 = createTRPCProxyClient<AppRouter1>({
  links: [
    httpBatchLink({
      url: 'https://scfqruwvi6.execute-api.us-east-2.amazonaws.com/test'
    })
  ]
})

const client2 = createTRPCProxyClient<AppRouter2>({
  links: [
    httpBatchLink({
      url: 'https://your-second-api-gateway-url'
    })
  ]
})

// Create a function to call your 'hello' procedure
async function callHelloProcedure() {
  const data = await client1.hello.mutate({ name: 'Kiran' })
  console.log(data) // should print: Hello, Kiran
}

// Create a function to call your 'hello2' procedure
async function callHello2Procedure() {
  const data = await client2.hello2.mutate({ name: 'Kiran' })
  console.log(data) // should print: Hello, Kiran. This is the second procedure
}

// Call the functions
callHelloProcedure().catch(console.error)
// TODO: The below line is commented because the second api gateway is not setup
// callHello2Procedure().catch(console.error)
