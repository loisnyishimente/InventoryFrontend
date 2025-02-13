const BASE_URL = "http://localhost:5000/api/products"; // Replace with your actual backend URL

export interface Product {
  name: string;
  SKU: string;
  stock: number;
  price: number;
  barcode?: string;
  category_id: number;
  warehouse_id: number;
}

/**
 * Add a new product to the inventory.
 * @param productData - The product details to be added.
 * @returns Response data from the backend.
 */
export async function addProduct(productData: Product) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

/**
 * Fetch the list of product categories.
 * @returns An array of categories.
 */
export async function fetchCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

/**
 * Fetch the list of warehouses.
 * @returns An array of warehouses.
 */
export async function fetchWarehouses() {
  try {
    const response = await fetch(`${BASE_URL}/warehouses`);
    if (!response.ok) {
      throw new Error("Failed to fetch warehouses");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    throw error;
  }
}
