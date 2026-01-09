import type { FastifyPluginAsync } from "fastify"
import bcrypt from "bcryptjs"

const authRoutes: FastifyPluginAsync = async (fastify) => {

    // LOGIN
    fastify.post("/login", { config: { public: true } }, async (request, reply) => {
       const { email, password } = request.body as {
       email: string,
       password: string
    }

    if (!email || !password) {
        return reply.status(400).send({ 
          message: 'Email and password are required' 
        })
    }

    const user = await fastify.prisma.user.findUnique({
        where: { email }
    })
    if(!user) {
        reply.code(401)
        return { message: "Invalid email or password" }
    }
    const isValid = await bcrypt.compare(password, user.password)

    if(!isValid) {
        reply.code(401)
        return { message: "Invalid credentials" }
    }
    const token = fastify.jwt.sign(
        { sub: user.id.toString(), email: user.email },
        { expiresIn: "1h" }
    )
    return { token, user: { name: user.name, email: user.email } }
    })

    fastify.get('/me', async (request, reply) => {
      // This route is protected by auth guard
      const userId = parseInt(request.user.sub)

      const user = await fastify.prisma.user.findUnique({
        where: { id: userId }
      })
      
      return {
        name: user?.name,
        email: user?.email
      }
    })

}
   
   export default authRoutes
