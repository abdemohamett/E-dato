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
    
        const { name, phone } = body;
    
        if (!userId) {
          return new NextResponse("Unauthenticated", { status: 403 });
        }
    
        if (!name) {
          return new NextResponse("name name is required", { status: 400 });
        }
    
        if (!phone) {
          return new NextResponse("Phone number is required", { status: 400 });
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
      
        const customer = await prismadb.customer.create({
            data: {
                name,
                phone,
                storeId: params.storeId,
                userId
            }
        });

        return NextResponse.json(customer);
    } catch (error) {
        console.log('[CUSTOMER_POST]', error);
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
  
      const customers = await prismadb.customer.findMany({
        where: {
          storeId: params.storeId
        }
      });
    
      return NextResponse.json(customers);
    } catch (error) {
      console.log('[CUSTOMER_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };