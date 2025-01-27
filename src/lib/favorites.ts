import { prisma } from './prisma';

type ItemType = 'Packages' | 'Events' | 'Activities' | 'Transportation' | 'Hotels';

export async function favoriteItem(userId: string, itemId: string, itemType: ItemType) {
  try {
    // Check if the user already favorited the item
    const existingFavorite = await prisma.favorites.findFirst({
      where: { userId, itemId, itemType },
    });

    if (existingFavorite) {
      return { message: 'You have already favorited this item.' };
    }

    // Add the favorite to the Favorites table
    await prisma.favorites.create({
      data: {
        userId,
        itemId,
        itemType,
      },
    });

    // Update the favorites count for the specific item type
    switch (itemType) {
      case 'Packages':
        await prisma.packages.update({
          where: { package_id: itemId },
          data: { favorites: { increment: 1 } },
        });
        break;
      case 'Events':
        await prisma.events.update({
          where: { event_id: itemId },
          data: { favorites: { increment: 1 } },
        });
        break;
      case 'Activities':
        await prisma.activities.update({
          where: { activity_id: itemId },
          data: { favorites: { increment: 1 } },
        });
        break;
      case 'Transportation':
        await prisma.transportation.update({
          where: { transportation_id: itemId },
          data: { favorites: { increment: 1 } },
        });
        break;
      case 'Hotels':
        await prisma.hotels.update({
          where: { hotel_id: itemId },
          data: { favorites: { increment: 1 } },
        });
        break;
      default:
        throw new Error('Invalid item type');
    }

    return { message: 'Item favorited successfully!' };
  } catch (error: unknown) {
    return handleError(error);
  }
}

// Common error handler
function handleError(error: unknown) {
  if (error instanceof Error) {
    return { error: error.message };
  }
  return { error: 'An unknown error occurred' };
}


// Create a favorite
export async function createFavorite(data: { userId: string; itemId: string; itemType: string }) {
    try {
        const favorite = await prisma.favorites.create({
            data,
        });

        return { favorite };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// Get all favorites for a user
export async function getFavoritesByUser(userId: string) {
    try {
        const favorites = await prisma.favorites.findMany({
            where: { userId },
        });

        return { favorites };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// Get a specific favorite
export async function getFavoriteById(favoriteId: string) {
    try {
        const favorite = await prisma.favorites.findUnique({
            where: { id: favoriteId },
        });

        if (!favorite) return { error: 'Favorite not found' };
        return { favorite };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// Update a favorite
export async function updateFavorite(favoriteId: string, data: Partial<{ itemId: string; itemType: string }>) {
    try {
        const updatedFavorite = await prisma.favorites.update({
            where: { id: favoriteId },
            data,
        });

        return { updatedFavorite };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// Delete a favorite (normal delete with decrement on related item)
export async function deleteFavorite(favoriteId: string) {
  try {
    // Find the favorite record before deletion to get itemId and itemType
    const favorite = await prisma.favorites.findUnique({
      where: { id: favoriteId },
    });

    if (!favorite) {
      return { error: 'Favorite not found' };
    }

    const { itemId, itemType } = favorite;

    // Delete the favorite record
    await prisma.favorites.delete({
      where: { id: favoriteId },
    });

    // Decrement the favorites count for the specific item type
    switch (itemType) {
      case 'Packages':
        await prisma.packages.update({
          where: { package_id: itemId },
          data: { favorites: { decrement: 1 } },
        });
        break;
      case 'Events':
        await prisma.events.update({
          where: { event_id: itemId },
          data: { favorites: { decrement: 1 } },
        });
        break;
      case 'Activities':
        await prisma.activities.update({
          where: { activity_id: itemId },
          data: { favorites: { decrement: 1 } },
        });
        break;
      case 'Transportation':
        await prisma.transportation.update({
          where: { transportation_id: itemId },
          data: { favorites: { decrement: 1 } },
        });
        break;
      case 'Hotels':
        await prisma.hotels.update({
          where: { hotel_id: itemId },
          data: { favorites: { decrement: 1 } },
        });
        break;
      default:
        throw new Error('Invalid item type');
    }

    return { message: 'Favorite deleted and favorites count decremented successfully' };
  } catch (error: unknown) {
    return handleError(error);
  }
}
