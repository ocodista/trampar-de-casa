import { Prisma, PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const getSubscribers = (): Prisma.InscritosCreateInput[] => {

    return [
        {
           email: 'test@gmail.com' 
        },
        {
            email: '@gmail.com'
        },
        {
            email: 'tombrady@gmail.com'
        }
    ]
}

void async function(){
    const subscribers = await Promise.all(
        getSubscribers().map(async (subscriber) => client.inscritos.create({ data: subscriber }))
    )
}()


/*
SUPABASE_URL=https://xkllxuhvzzrqokqiszok.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrbGx4dWh2enpycW9rcWlzem9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczOTcwODUsImV4cCI6MjAwMjk3MzA4NX0.mzmdczt3BIB5iwChRXDiOXopI-ysx9RkGyLc_YDtEdI
Caio Borghi17:49
hbw9FXH0bcx_anv7cwz
*/