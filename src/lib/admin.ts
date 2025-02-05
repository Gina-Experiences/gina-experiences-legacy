import { prisma } from "./prisma";

// GET: Total LTV (Lifetime Value) of all users
export async function getTotalLTV() {
  try {
    const totalLTV = await prisma.user.aggregate({
      _sum: {
        ltv: true,
      },
    });

    return { totalLTV: totalLTV._sum.ltv || 0 }; // Return 0 if no users
  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// GET: Total items sold across all product categories
export async function getTotalSold() {
  try {
    // Aggregate sold items across all relevant tables
    const productSales = await prisma.product.findMany({
      select: {
        Packages: { select: { number_of_sold_items: true } },
        Activities: { select: { number_of_sold_items: true } },
        Events: { select: { number_of_sold_items: true } },
        Hotels: { select: { number_of_sold_items: true } },
        Transportation: { select: { number_of_sold_items: true } },
      },
    });

    // Sum up totals from all tables
    const totalSold = productSales.reduce((sum, product) => {
      return (
        sum +
        (product.Packages?.number_of_sold_items || 0) +
        (product.Activities?.number_of_sold_items || 0) +
        (product.Events?.number_of_sold_items || 0) +
        (product.Hotels?.number_of_sold_items || 0) +
        (product.Transportation?.number_of_sold_items || 0)
      );
    }, 0);

    return { totalSold };
  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
