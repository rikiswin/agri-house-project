import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/db/prisma"
import {  CreateCricketDataSchema } from "@/lib/validation"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addCricketData(formData: CreateCricketDataSchema) {
    const session = await getServerSession(authOptions)
    if (!session) { return }
    const userId = session.user.id

    const { amount, cost, type } = formData

    await prisma.cricketFeedData.create({
        data: {
            userId,
            cost: parseInt(cost),
            type: type,
            amount: parseInt(amount)
        }
    })

    revalidatePath("/home")
    redirect("/home")
}

export async function getCricketData() {
    const session = await getServerSession(authOptions)
    if (!session) { return }

    const cricketData = await prisma.cricketFeedData.findMany()

    return cricketData
}