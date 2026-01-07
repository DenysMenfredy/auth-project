import fastify from 'fastify'
import prismaPlugin from './plugins/prisma.js'
import usersRoute from './routes/user.js'
import authRoutes from './routes/auth.js'
import jwtPlugin from './plugins/jwt.js'
import envPlugin from "./plugins/env.js"
import authGuardPlugin from './plugins/auth-guard.js'
import cors from "@fastify/cors"

const server = fastify({
    logger: true
})

server.register(cors)

server.register(envPlugin)
server.register(prismaPlugin)
server.register(jwtPlugin)
server.register(authGuardPlugin)
server.register(usersRoute, { prefix: '/users' })
server.register(authRoutes, { prefix: '/auth' })
server.listen({ port: 8080}, (err, address) => {
    if(err) {
        console.error(err)
        process.exit(1) 
    }
    console.log(`Server listening at ${address}`)
})
