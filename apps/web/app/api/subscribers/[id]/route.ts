import { getId } from 'app/api/getId'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import {
  ProfileSchema,
  profileFormSchema,
} from '../../../subscriber/profile/profileSchema'
import { logError } from '../../logError'
import { getById, updateSubscriber } from '../db'

export async function GET(request: Request) {
  return await getById(getId(request))
}
export async function PUT(request: Request) {
  const id = getId(request)
  if (!id) {
    return new NextResponse(null, { status: StatusCodes.BAD_REQUEST })
  }

  const body = (await request.json()) as ProfileSchema
  try {
    await profileFormSchema.parseAsync(body)
  } catch (err) {
    if (err instanceof ZodError) {
      return new NextResponse(err.message, { status: StatusCodes.BAD_REQUEST })
    }
    return await logError(err)
  }

  try {
    const { data } = await updateSubscriber(id, body)
    return NextResponse.json(data)
  } catch (error) {
    return await logError(error)
  }
}
