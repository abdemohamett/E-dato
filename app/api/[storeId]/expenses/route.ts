import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(
    req: Request,
    {params} : {params: {storeId: string}}
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
          return new NextResponse("Image URL is required", { status: 400 });
        }
    
        if (!params.storeId) {
          return new NextResponse("Store id is required", { status: 400 });
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
      
        const expense = await prismadb.expense.create({
            data: {
                amount,
                item,
                storeId: params.storeId,
                userId
            }
        });

        return NextResponse.json(expense);
    } catch (error) {
        console.log('[EXPENSE_POST]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
      if (!params.storeId) {
        return new NextResponse("Store id is required", { status: 400 });
      }
  
      const expenses = await prismadb.expense.findMany({
        where: {
          storeId: params.storeId
        }
      });
    
      return NextResponse.json(expenses);
    } catch (error) {
      console.log('[EXPENSES_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };