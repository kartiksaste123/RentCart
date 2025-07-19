import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  itemCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const res = await fetch('http://localhost:9090/items');
    if (!res.ok) throw new Error('Failed to fetch items');
    const items = await res.json();

    // Debug: log the items
    console.log("Fetched items from backend:", items);

    // Map items to ListingCard-compatible objects, with robust fallbacks
    const safeListings = (Array.isArray(items) ? items : []).map((item: any) => ({
      id: item.id || "",
      title: item.title || "No title",
      description: item.description || "",
      price: item.price ?? 0,
      initialPrice: item.initialPrice ?? 0,
      category: item.category || "",
      type: item.type || "",
      features: Array.isArray(item.features) ? item.features : [],
      available: item.available ?? true,
      userId: item.userId || "",
      createdAt: item.createdAt || "",
      location: item.location || "",
      imageSrc: Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : '/images/placeholder.jpg',
      images: Array.isArray(item.images) ? item.images : [],
      rating: item.rating ?? 0,
      usagePolicy: item.usagePolicy || "",
      securityDeposit: item.securityDeposit ?? 0,
    }));

    return safeListings;
  } catch (error: any) {
    // Log the error for debugging
    console.error("Error in getListings:", error);
    throw new Error(error);
  }
}
