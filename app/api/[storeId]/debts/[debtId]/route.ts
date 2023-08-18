import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(
    req: Request,
    { params }: { params: { debtId: string } }
  ) {
    try {
      if (!params.debtId) {
        return new NextResponse("debtId id is required", { status: 400 });
      }
  
      const customer = await prismadb.customer.findUnique({
        where: {
          id: params.debtId
        }
      });
    
      return NextResponse.json(customer);
    } catch (error) {
      console.log('[CUSTOMER_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

export async function PATCH(
    req: Request,
    {params}: {params: {storeId: string, debtId: string}}
){
    try {
        const user = await getCurrentUser()
        const userId = user?.id
        const body = await req.json();

        const { name, phone } = body;
    
        if (!userId) {
          return new NextResponse("Unauthenticated", { status: 403 });
        }
    
        if (!name) {
          return new NextResponse("Name is required", { status: 400 });
        }
        if (!phone) {
          return new NextResponse("Phone Number is required", { status: 400 });
        }
    
        if (!params.debtId) {
          return new NextResponse("debt id is required", { status: 400 });
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
      
    
        const customer = await prismadb.customer.updateMany({
          where: {
            id: params.debtId
          },

          data: {
            name,
            phone
          }
        });
      
        return NextResponse.json(customer);
      } catch (error) {
        console.log('[CUSTOMER_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
      }
    };


    export async function DELETE(
        req: Request,
        { params }: { params: { storeId: string, debtId: string } }
      ) {
        try {
            const user = await getCurrentUser()
            const userId = user?.id
      
            if (!userId) {
                return new NextResponse("Unauthenticated", { status: 403 });
              }
          
              if (!params.debtId) {
                return new NextResponse("Debt id is required", { status: 400 });
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

              const customer = await prismadb.customer.deleteMany({
                where: {
                  id: params.debtId,
                  // debts: true
                },
              });
        
          return NextResponse.json(customer);
        } catch (error) {
          console.log('[CUSTOMER_DELETE]', error);
          return new NextResponse("Internal error", { status: 500 });
        }
      };
    