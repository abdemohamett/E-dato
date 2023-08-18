import prismadb from "@/lib/prismadb"

export const getTotalDebts = async (storeId: string) => {
  const debtTotal = await prismadb.debt.findMany({
    where: {
        storeId,
    }
  });

  const totalRevenue = debtTotal.reduce((total, debt) => {
    const orderTotal = debt.amount.toNumber();
    return total + orderTotal;

    }, 0);

  return totalRevenue
}