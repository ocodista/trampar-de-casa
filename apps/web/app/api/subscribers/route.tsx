import { NextResponse } from "next/server";
import { Entities } from "../../../global/enums/entities";
import { createClient } from "@supabase/supabase-js";

interface EmailRequest {
  email: string;
}

export async function POST (requisicao: Request) {
  const { email } = (await requisicao.json()) as EmailRequest;
  if (email) {
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

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return new NextResponse(null, { status: 500 });
  }

  return NextResponse.json(data);
}
