import { FastifyReply, FastifyRequest} from 'fastify'
import { z } from "zod"

import { hash } from 'bcryptjs'
import { registerService } from '../../service/register/register';

export async function register(request: FastifyRequest, response: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)  
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    await registerService({ email, name, password })
  } catch (error) {
    response.status(401).send()
  }

  return response.status(201).send()
}