import { Card } from "@repo/ui/card"

export default function TransactionLogs({logs ,userId,title}:{logs:{toUserId:number,amount:number,timestamp:Date,toUser:{number:string}}[]; userId:number; title:string}) {
  if (!logs.length) {
    return <div className="w-[300px] m-5">
      <Card title={title}>
        <div className="text-center pb-8 pt-8">
            No Recent transactions
        </div>
    </Card>
    </div>
}
return <div className="min-w-[300px] m-5">
  <Card title={title}>
    <div className="pt-2">
        {logs.map((t ,idx)=> <div  key={idx} className="flex justify-between">
            <div>
                <div className="text-sm">
                    {userId==t.toUserId?"Received":"Sent"} INR
                </div>
                <div className="text-slate-600 text-xs">
                    {t.timestamp.toDateString()}
                </div>
            </div>
            <div>
            <div className={`flex flex-col justify-end text-sm ${userId==t.toUserId?"text-green-500":"text-red-500"}`}>
            {userId==t.toUserId?"+":"-"} Rs {t.amount / 100}
            </div>
            <div className="text-sm">{userId==t.toUserId?"from":"to"} {t.toUser.number}</div>
            </div>
        </div>)}
    </div>
</Card>
</div>
}
