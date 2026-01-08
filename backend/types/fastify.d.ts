import { PrismaClient } from "@prisma/client"
import type { FastifyRequest } from "fastify"

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient
    authenticate(request: FastifyRequest): Promise<void>
  }

  interface FastifyContextConfig {
    public?: boolean
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      sub: string
      email: string
    }
  }
}
