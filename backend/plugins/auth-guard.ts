import fp from "fastify-plugin"
import type { FastifyPluginAsync, FastifyRequest } from "fastify"


const authGuardPlugin: FastifyPluginAsync  = async (fastify) => {
    fastify.decorate(
        "authenticate",
        async (request: FastifyRequest) => {
            await request.jwtVerify()
        }
    )
}

export default fp(authGuardPlugin, {
    name: "auth-guard"
})
