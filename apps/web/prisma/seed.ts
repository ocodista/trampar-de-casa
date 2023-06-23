import { Prisma, PrismaClient } from "./client";

const client = new PrismaClient();

const getSubscribers = (): Prisma.SubscribersCreateInput[] => {

  return [
    {
      email: 'mateus.vnlima@gmail.com' 
    },
    {
      email: 'caiohoborghi@gmail.com'
    }
  ]
}

void async function (){
  const subscribers = await Promise.all(
    getSubscribers().map(async (subscriber) => client.subscribers.create({ data: subscriber }))
  )
}()
