import fp from "fastify-plugin"
import type { FastifyInstance } from "fastify"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

async function prismaPlugin(fastify: FastifyInstance) {
    console.log("DATABASE_URL", process.env.DATABASE_URL)
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 5_000
    })

    const adapter = new PrismaPg(pool)

    const prisma = new PrismaClient({
        adapter,
        log: ["error", "warn"]
    })

    fastify.decorate("prisma", prisma)

    fastify.addHook("onClose", async () => {
        await prisma.$disconnect()
        await pool.end()
    })
}

export default fp(prismaPlugin, { name: "fastify-prisma-plugin"})
