import fp from "fastify-plugin"
import type { FastifyPluginAsync, FastifyRequest } from "fastify"

const authGuardPlugin: FastifyPluginAsync = async (fastify) => {
    // Decorate first
    fastify.decorate(
        "authenticate",
        async (request: FastifyRequest) => {
            await request.jwtVerify()
        }
    )
    
    // Then add the global hook
    fastify.addHook('onRequest', async (request, reply) => {
        if (request.routeOptions.config?.public === true) {
            return
        }
        
        await request.jwtVerify()
    })
}

export default fp(authGuardPlugin, {
    name: "auth-guard"
})
