import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import TransactionLogs from "../../../components/TransactionLogs";


async function getP2pSent() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id
   const sent = await prisma.p2PTransfer.findMany({
    where:{
        fromUserId : Number(userId),
    },
    select:{
        toUserId:true,
        amount:true,
        timestamp: true,
        toUser:{
            select:{
                number:true,
            }
        }
    }
   })
    return sent;
}


async function getP2pReceived() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id
    const received =await prisma.p2PTransfer.findMany({
        where:{
            toUserId:Number(userId)
        },
        select:{
            toUserId:true,
            amount:true,
            timestamp:true,
            toUser:{
                select:{
                    number: true,
                }
            }
        }
    }) 
    return received;
}


export default async function() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id
    const sent = await getP2pSent();
    const received = await getP2pReceived(); 
    return <div className="flex justify-center w-full">
       <TransactionLogs logs={sent} userId={userId} title="Sent Transaction"/>
       <TransactionLogs logs={received} userId={userId} title="Received Transaction"/>
    </div>
}