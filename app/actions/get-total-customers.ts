import prismadb from "@/lib/prismadb"

export const getTotalCustomers = async (storeId: string) => {
  const totalCustomers = await prismadb.customer.count({
    where: {
        storeId,
    }
  });


  return totalCustomers
}