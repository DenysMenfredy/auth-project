import type { FastifyPluginAsync } from "fastify"
import bcrypt from "bcryptjs"

const authRoutes: FastifyPluginAsync = async (fastify) => {

    // LOGIN
    fastify.post("/login", { config: { public: true } }, async (request, reply) => {
       const { email, password } = request.body as {
       email: string,
       password: string
    }
    const user = await fastify.prisma.user.findUnique({
        where: { email }
    })
    if(!user) {
        reply.code(401)
        return { message: "Invalid credentials" }
    }
    const isValid = await bcrypt.compare(password, user.password)

    if(!isValid) {
        reply.code(401)
        return { message: "Invalid credentials" }
    }
    const token = fastify.jwt.sign(
        { sub: user.id, email: user.email },
        { expiresIn: "1h" }
    )
    return { token }
    })
   }
   
   export default authRoutes
