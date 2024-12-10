"use server"
import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/db/prisma"
import { CreateCricketDataSchema } from "@/lib/validation"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addCricketData(formData: CreateCricketDataSchema) {
    const session = await getServerSession(authOptions)
    if (!session) { return }
    const userId = session.user.id

    const { breedingPenCode, cricketType, cricketYield, cycleAge, cycleStatus, feedAmountUsed, feedConsumption, feedSource, productionCycle, comment, harvestEndDate, harvestStartDate } = formData

    await prisma.cricketFeedData.create({
        data: {
            userId,
            breedingPenCode,
            cricketType,
            cricketYield: parseInt(cricketYield),
            cycleAge: parseInt(cycleAge),
            cycleStatus,
            feedAmountUsed: parseInt(feedAmountUsed),
            feedConsumption: parseInt(feedConsumption),
            feedSource, productionCycle: parseInt(productionCycle),
            comment,
            harvestEndDate,
            harvestStartDate,
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

export async function deleteCricketData(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session) { return }

    const cricketDataId = formData.get("cricketDataId")?.toString()

    if (!cricketDataId) return

    await prisma.cricketFeedData.delete({
        where: {
            id: cricketDataId
        }
    })

    revalidatePath("/home")
}