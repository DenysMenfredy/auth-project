import type { FastifyPluginAsync } from "fastify"
import bcrypt from "bcryptjs"

const usersRoute: FastifyPluginAsync = async (fastify) => {

    fastify.get('/', { preHandler: fastify.authenticate }, async () => {
        return await fastify.prisma.user.findMany()
    })
}

export default usersRoute
