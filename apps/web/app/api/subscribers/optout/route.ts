import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"
import { getSupabaseClient } from "../../../db/getSupabaseClient"
import { Entities } from 'shared/src/enums';
import { decrypt } from "shared/src/security";
import url from 'url'

export async function GET (request: Request) {
    try {
        // Get query params
        // Ref: https://stackoverflow.com/a/76246887/18256370
        const { id } = url.parse(request.url, true).query

        if (!id)
        return new NextResponse(null, { status: StatusCodes.BAD_REQUEST })

        const realId = decrypt(process.env['CRYPT_SECRET'], id as string)
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
            .from(Entities.Subcribers)
            .update({ optOut: true })
            .eq('id', realId)
            .select()

        if (error) throw error

        return NextResponse.json(data)

    } catch(err) {
        // console.error(err)
        return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
    }

}