/* eslint-disable import/prefer-default-export */
import { signJwtAccessToken } from '@/shared/jwt'
import prisma from '@/shared/prisma'
import * as bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

type RequestBody = {
  username: string
  password: string
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json()

  const user = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  })

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPassword } = user
    const accessToken = signJwtAccessToken(userWithoutPassword)
    const result = {
      ...userWithoutPassword,
      accessToken,
    }
    return new NextResponse(JSON.stringify(result))
  }

  return new NextResponse(JSON.stringify(null))
}
