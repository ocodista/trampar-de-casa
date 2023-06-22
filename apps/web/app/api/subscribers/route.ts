import { NextResponse } from "next/server";
import { Entities } from "../../../global/enums/entities";
import { createClient } from "@supabase/supabase-js";
import { StatusCodes } from "http-status-codes";
import { SupabaseCodes } from "../../../global/enums/supabaseCodes";

interface EmailRequest {
  email: string;
}

export async function POST (request: Request) {
  const { email } = (await request.json()) as EmailRequest;
  if (!email) {
    return new NextResponse(null, { status: 403 });
  }

  const supabase = createClient(
    process.env['SUPABASE_URL'],
    process.env['SUPABASE_ANON_KEY']
  );

  const { data, error } = await supabase
    .from(Entities.Subcribers)
    .insert({ email })
    .select();

  if (!error)
    return NextResponse.json(data);

  if (error.code === SupabaseCodes.DuplicatedRow) {
    return new NextResponse("Email já cadastrado.", { status: StatusCodes.CONFLICT })
  }

  // eslint-disable-next-line no-console
  console.error(error);
  return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR });
}
