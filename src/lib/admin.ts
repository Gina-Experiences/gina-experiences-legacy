import { prisma } from './prisma';

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
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// GET: Total items sold across all services
export async function getTotalSold() {
  try {
    // Aggregate sold items across all relevant tables
    const [
      activitiesSold,
      eventsSold,
      hotelsSold,
      packagesSold,
      transportationSold,
    ] = await Promise.all([
      prisma.activities.aggregate({
        _sum: { number_of_sold_items: true },
      }),
      prisma.events.aggregate({
        _sum: { number_of_sold_items: true },
      }),
      prisma.hotels.aggregate({
        _sum: { number_of_sold_items: true },
      }),
      prisma.packages.aggregate({
        _sum: { number_of_sold_items: true },
      }),
      prisma.transportation.aggregate({
        _sum: { number_of_sold_items: true },
      }),
    ]);

    // Sum up totals from all tables
    const totalSold =
      (activitiesSold._sum.number_of_sold_items || 0) +
      (eventsSold._sum.number_of_sold_items || 0) +
      (hotelsSold._sum.number_of_sold_items || 0) +
      (packagesSold._sum.number_of_sold_items || 0) +
      (transportationSold._sum.number_of_sold_items || 0);

    return { totalSold };
  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
