/* eslint-disable import/prefer-default-export */
import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/shared/prisma'
import { User } from '@prisma/client'

type RequestBody = {
  email: string
}

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json()

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })

  const { password, ...result } = user as User

  return new NextResponse(JSON.stringify(result))
}
