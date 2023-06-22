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
