import {
  CreateAWSLambdaContextOptions,
  awsLambdaRequestHandler
} from '@trpc/server/adapters/aws-lambda'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { z } from 'zod'
import { publicProcedure, router } from './trpc'

const appRouter = router({
  hello2: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts
      return `Hello, ${input.name}. This is the second procedure`
    })
})

// created for each request
const createContext = ({
  event,
  context
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}) // no context
// type Context = trpc.inferAsyncReturnType<typeof createContext>

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
