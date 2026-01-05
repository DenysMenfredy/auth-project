import type { FastifyPluginAsync } from "fastify"
import bcrypt from "bcryptjs"

const usersRoute: FastifyPluginAsync = async (fastify) => {

    fastify.addHook("preHandler", fastify.authenticate)

    fastify.get('/', async () => {
        return await fastify.prisma.user.findMany()
    })
    fastify.post('/', async (request, reply) => {
        const { email, name, password }  = request.body as {
            email: string,
            name: string,
            password: string
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await fastify.prisma.user.create({
            data: { email, name, password:hashedPassword }
        })
            reply.code(201)
            return { id: user.id, name: user.name, email: user.email } 
        } catch(error) {
            console.error(error)
            reply.code(400)
            return { "message": "Error creating user" }
        }
    })
}

export default usersRoute
