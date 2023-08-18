import prismadb from "@/lib/prismadb"

export const getTotalExpenses = async (storeId: string) => {
  const expneseTotal = await prismadb.expense.findMany({
    where: {
        storeId,
    }
  });

  const totalRevenue = expneseTotal.reduce((total, expense) => {
    const orderTotal = expense.amount.toNumber();
    return total + orderTotal;

    }, 0);

  return totalRevenue
}