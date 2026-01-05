
import fp from "fastify-plugin"
import env from "@fastify/env"

export default fp(async (fastify) => {
  await fastify.register(env, {
    dotenv: true,
    schema: {
      type: "object",
      required: ["DATABASE_URL", "JWT_SECRET"],
      properties: {
        DATABASE_URL: { type: "string" },
        JWT_SECRET: { type: "string" }
      }
    }
  })
})
