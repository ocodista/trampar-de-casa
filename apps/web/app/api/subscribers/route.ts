import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { StatusCodes } from "http-status-codes";
import { getSupabaseClient } from "../../db/getSupabaseClient";
import { Entities, SupabaseCodes } from 'shared/src/enums';
import { sendConfirmationEmail } from "shared";

interface EmailRequest {
  email: string;
}

export async function POST (request: Request) {
  const { email } = (await request.json()) as EmailRequest;
  if (!email) {
    return new NextResponse(null, { status: 403 });
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from(Entities.Subcribers)
    .insert({ email })
    .select();

  if (!error) {
    try {
      await sendConfirmationEmail({ 
        secretKey: process.env['CRYPT_SECRET'], 
        to: email, 
        resendKey: process.env['RESEND_KEY'], 
        subscriberId: data[0].id 
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
    return NextResponse.json(data);
  }

  if (error.code === SupabaseCodes.DuplicatedRow) {
    return new NextResponse("Email já cadastrado.", { status: StatusCodes.CONFLICT })
  }

  // eslint-disable-next-line no-console
  console.error(error);
  return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR });
}

export async function GET () {
  const supabase = createClient(
    process.env['SUPABASE_URL'],
    process.env['SUPABASE_SERVICE_ROLE']
  )

  const { count, error } = await supabase.from(Entities.Subcribers).select('*', { count: "exact" })
  if (!error)
    return NextResponse.json(count)
  
  return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
}
