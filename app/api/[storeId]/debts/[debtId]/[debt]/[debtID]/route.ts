import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(
    req: Request,
    { params }: { params: { debtID: string } }
  ) {
    try {
      if (!params.debtID) {
        return new NextResponse("debtID is required", { status: 400 });
      }
  
      const debt = await prismadb.debt.findUnique({
        where: {
          id: params.debtID
        }
      });
    
      return NextResponse.json(debt);
    } catch (error) {
      console.log('[DEBTID_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

export async function PATCH(
    req: Request,
    {params}: {params: {storeId: string, debtID: string}}
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
          return new NextResponse("Item is required", { status: 400 });
        }
        if (!amount) {
          return new NextResponse("Amount is required", { status: 400 });
        }
    
        if (!params.debtID) {
          return new NextResponse("debtID is required", { status: 400 });
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
      
    
        const debt = await prismadb.debt.updateMany({
          where: {
            id: params.debtID
          },

          data: {
            item,
            amount
          }
        });
      
        return NextResponse.json(debt);
      } catch (error) {
        console.log('[debtID_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
      }
    };


    export async function DELETE(
        req: Request,
        { params }: { params: { storeId: string, debtID: string } }
      ) {
        try {
            const user = await getCurrentUser()
            const userId = user?.id
      
            if (!userId) {
                return new NextResponse("Unauthenticated", { status: 403 });
              }
          
              if (!params.debtID) {
                return new NextResponse("debtID is required", { status: 400 });
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

              const debt = await prismadb.debt.deleteMany({
                where: {
                  id: params.debtID,
                }
              });
        
          return NextResponse.json(debt);
        } catch (error) {
          console.log('[debtID_DELETE]', error);
          return new NextResponse("Internal error", { status: 500 });
        }
      };
    