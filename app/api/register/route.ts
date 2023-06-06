/* eslint-disable import/prefer-default-export */
import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/shared/prisma'
import * as bcrypt from 'bcrypt'

type RequestBody = {
  username: string
  email: string
  password: string
}

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json()

  const user = await prisma.user.create({
    data: {
      email: body.email,
      username: body.username,
      password: await bcrypt.hash(body.password, 10),
    },
  })

  const { password, ...result } = user

  return new NextResponse(JSON.stringify(result))
}
