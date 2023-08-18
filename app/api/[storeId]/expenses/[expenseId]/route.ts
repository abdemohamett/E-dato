import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(
    req: Request,
    { params }: { params: { expenseId: string } }
  ) {
    try {
      if (!params.expenseId) {
        return new NextResponse("Billboard id is required", { status: 400 });
      }
  
      const expense = await prismadb.expense.findUnique({
        where: {
          id: params.expenseId
        }
      });
    
      return NextResponse.json(expense);
    } catch (error) {
      console.log('[EXPENSE_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

export async function PATCH(
    req: Request,
    {params}: {params: {storeId: string, expenseId: string}}
){
    try {
        const user = await getCurrentUser()
        const userId = user?.id
        const body = await req.json();

        const { item, amount } = body;
    
        if (!userId) {
          return new NextResponse("Unauthenticated", { status: 403 });
        }
    
        if (!item) {
          return new NextResponse("Label is required", { status: 400 });
        }
        if (!amount) {
          return new NextResponse("Image Url is required", { status: 400 });
        }
    
        if (!params.expenseId) {
          return new NextResponse("expense id is required", { status: 400 });
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
      
    
        const expense = await prismadb.expense.updateMany({
          where: {
            id: params.expenseId
          },

          data: {
            item,
            amount
          }
        });
      
        return NextResponse.json(expense);
      } catch (error) {
        console.log('[EXPENSE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
      }
    };


    export async function DELETE(
        req: Request,
        { params }: { params: { storeId: string, expenseId: string } }
      ) {
        try {
            const user = await getCurrentUser()
            const userId = user?.id
      
            if (!userId) {
                return new NextResponse("Unauthenticated", { status: 403 });
              }
          
              if (!params.expenseId) {
                return new NextResponse("Billboard id is required", { status: 400 });
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

              const expense = await prismadb.expense.deleteMany({
                where: {
                  id: params.expenseId,
                }
              });
        
          return NextResponse.json(expense);
        } catch (error) {
          console.log('[EXPENSE_DELETE]', error);
          return new NextResponse("Internal error", { status: 500 });
        }
      };
    