import { InventoryItem } from '../types/InventoryItem';


const BASE_URL = 'http://192.168.8.152:5000/api/products';
export const addInventory = async (newItem: {
    name: string;
    sku: string;
    category: string;
    supplier: string;
    quantity: number;
    price: number;
  }): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/add`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',  
        },
        body: JSON.stringify(newItem), 
      });
  
      if (!response.ok) {
    
        throw new Error('Failed to add inventory item');
      }
  
      const data = await response.json(); 
      console.log('Inventory item added successfully:', data);
    } catch (error) {
      console.error('Error adding inventory item:', error);
      throw new Error('Failed to add inventory item');
    }
  };

export const getInventory = async (): Promise<InventoryItem[]> => {
  const response = await fetch(`${BASE_URL}/get`);
  if (!response.ok) {
    throw new Error('Failed to fetch inventory');
  }
  return response.json();
};

export const deleteInventoryItem = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/delete/:id`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete inventory item');
  }
};


export const getStockAlerts = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/stock-alerts`);
  if (!response.ok) {
    throw new Error('Failed to fetch stock alerts');
  }
  return response.json();
};
export const updateInventoryItem = async (
    id: number,
    updatedItem: Omit<InventoryItem, 'id'> 
  ): Promise<void> => {
    const response = await fetch(`${BASE_URL}/update/:id`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update inventory item');
    }}