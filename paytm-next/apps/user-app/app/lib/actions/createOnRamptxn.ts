"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount:number,provider:string){
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session?.user?.id;
  try {
    if(!userId){
        return {
            message: "you are not logged in"
        }
    }
    if(amount==0){
        throw new Error();
    }
   console.log(amount,provider)
    await prisma.onRampTransaction.create({
        data: {
             userId:Number(userId),
             amount: amount,
             provider,
             status:"Processing",
             startTime: new Date(),
             token:token,
        }
    })

    return { 
        message:"on ramp transaction added",
    }
  } catch (error) {
     console.log(error) 
  }
}