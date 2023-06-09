/* eslint-disable import/prefer-default-export */
import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/shared/prisma'

type RequestBody = {
  email: string
}

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json()

  const user = await prisma.user.create({
    data: {
      email: body.email,
    },
  })

  const { password, ...result } = user

  return new NextResponse(JSON.stringify(result))
}
