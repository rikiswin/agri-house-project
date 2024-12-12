"use server"
import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/db/prisma"
import { CreateBreedingPenSchema, CreateCricketFeedDataSchema, CreateCricketFarmSchema, UpdateCricketFarmSchema } from "@/lib/validation"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Convenience Types for Type Safety
export type CricketFarmWithBreedingPens = Prisma.CricketFarmGetPayload<{
    include: { BreedingPen: { include: { CricketFeedData: true } } };
}>;

// Cricket Feed Data Server Actions
export async function addCricketFeedData(formData: CreateCricketFeedDataSchema) {
    const session = await getServerSession(authOptions)
    if (!session) { return }
    const userId = session.user.id

    const { breedingPenId, cricketYield, cycleAge, cycleStatus, feedAmountUsed, feedConsumption, feedSource, productionCycle, comment, harvestEndDate, harvestStartDate } = formData

    await prisma.cricketFeedData.create({
        data: {
            userId,
            cricketYield: parseInt(cricketYield),
            cycleAge: parseInt(cycleAge),
            cycleStatus,
            feedAmountUsed: parseInt(feedAmountUsed),
            feedConsumption: parseInt(feedConsumption),
            feedSource, productionCycle: parseInt(productionCycle),
            comment,
            harvestEndDate,
            harvestStartDate,
            breedingPenId
        }
    })

    revalidatePath("/dashboard")
    redirect("/dashboard")
}

export async function getCricketFeedData() {
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

    revalidatePath("/dashboard")
    redirect("/dashboard")
}

// Cricket Farm Server Actions
export async function addCricketFarm(formData: CreateCricketFarmSchema) {
    const session = await getServerSession(authOptions)
    if (!session) { return }

    const { location, latitude, longitude } = formData

    await prisma.cricketFarm.create({
        data: {
            location,
            latitude,
            longitude
        }
    })

    revalidatePath("/dashboard")
    redirect("/dashboard")
}

export async function getCricketAllFarmData() {
    const session = await getServerSession(authOptions)
    if (!session) { return }

    const cricketFarmData = await prisma.cricketFarm.findMany({
        include: {
            BreedingPen: { include: { CricketFeedData: true } }
        }
    })

    return cricketFarmData
}

export async function getCricketFarmData(id: string): Promise<CricketFarmWithBreedingPens | null> {
    const session = await getServerSession(authOptions)
    if (!session) { return null }

    const cricketFarmData = await prisma.cricketFarm.findFirst({
        where: { id },
        include: {
            BreedingPen: { include: { CricketFeedData: true } }
        }
    })

    return cricketFarmData
}

export async function updateCricketFarm(formData: UpdateCricketFarmSchema) {
    const session = await getServerSession(authOptions)
    if (!session) { return }

    const { location, latitude, longitude, id } = formData

    await prisma.cricketFarm.update({
        where: {
            id
        },
        data: {
            location,
            latitude,
            longitude
        }
    })

    revalidatePath("/dashboard")
    redirect("/dashboard")
}

export async function deleteCricketFarm(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session) { return }

    const cricketFarmId = formData.get("cricketFarmId")?.toString()

    if (!cricketFarmId) return

    await prisma.cricketFarm.delete({
        where: {
            id: cricketFarmId
        }
    })

    revalidatePath("/dashboard")
    redirect("/dashboard")
}

// Cricket Breeding Pen Server Actions
export async function addBreedingPenWithFarmId(formData: CreateBreedingPenSchema) {
    const session = await getServerSession(authOptions)
    if (!session) { return }

    const { breedingPenCode, cricketFarmId, cricketType } = formData

    await prisma.breedingPen.create({
        data: {
            breedingPenCode,
            cricketType,
            cricketFarmId
        }
    })

    revalidatePath(`/dashboard/cricket/farm/${cricketFarmId}`)
    redirect(`/dashboard/cricket/farm/${cricketFarmId}`)
}

export async function getBreedingPenWithFarmId(cricketFarmId: string) {
    const session = await getServerSession(authOptions)
    if (!session) { return }

    const breedingPens = await prisma.breedingPen.findMany({
        where: {
            cricketFarmId
        }
    })

    return breedingPens
}