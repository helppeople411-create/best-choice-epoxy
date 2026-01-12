import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
  ghlProductId?: string; // GoHighLevel Product ID
  stripePriceId?: string; // Stripe Price ID
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) => item.id === newItem.id && item.variant === newItem.variant
      );

      const quantityToAdd = newItem.quantity || 1;

      if (existingItemIndex > -1) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += quantityToAdd;
        toast.success(`Updated quantity for ${newItem.name}`);
        return updatedItems;
      } else {
        toast.success(`Added ${newItem.name} to cart`);
        return [...currentItems, { ...newItem, quantity: quantityToAdd }];
      }
    });
  };

  const removeItem = (id: string, variant?: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => !(item.id === id && item.variant === variant))
    );
    toast.info("Item removed from cart");
  };

  const updateQuantity = (id: string, quantity: number, variant?: string) => {
    if (quantity < 1) {
      removeItem(id, variant);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.variant === variant ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
