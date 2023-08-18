import CustomerId from "@/app/(dashboard)/[storeId]/(routes)/debts/[debtId]/[customerId]/page";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(
    req: Request,
    {params} : {params: {storeId: string, debtId: string}}
){
    try {
        const user = await getCurrentUser();
        const userId = user?.id
    
        const body = await req.json();
    
        const { item, amount } = body;
    
        if (!userId) {
          return new NextResponse("Unauthenticated", { status: 403 });
        }
    
        if (!item) {
          return new NextResponse("Item name is required", { status: 400 });
        }
    
        if (!amount) {
          return new NextResponse("Amount is required", { status: 400 });
        }
    
        if (!params.storeId) {
          return new NextResponse("store id is required", { status: 400 });
        }
    
        const storeByUserId = await prismadb.store.findFirst({
            where: {
              id: params.storeId,
              userId,
            }
          });
      
          if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 405 });
          }
      
        const debt = await prismadb.debt.create({
            data: {
                amount, 
                item,
                customerId: params.debtId,
                storeId: params.storeId,
                userId
            },
        });

        return NextResponse.json(debt);
    } catch (error) {
        console.log('[DEBT_POST]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { customerId: string } }
  ) {
    try {
      if (!params.customerId) {
        return new NextResponse("Store id is required", { status: 400 });
      }
  
      const debts = await prismadb.debt.findMany({
        where: {
          // customerId: params.customerId
        }
      });
    
      return NextResponse.json(debts);
    } catch (error) {
      console.log('[DEBTS_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };