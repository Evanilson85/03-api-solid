import fastify from 'fastify'
import { register } from './http/controller/register'
import { appRoutes } from './http/routes'

export const app = fastify()


app.register(appRoutes)

