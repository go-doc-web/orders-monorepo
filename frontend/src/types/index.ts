export interface Product {
  id: number;
  serialNumber: number;
  isNew: number; // 1 или 0, как в базе
  photo: string;
  title: string;
  type: string;
  specification: string;
  status: string;
  guaranteeStart: string;
  guaranteeEnd: string;
  priceUsd: number;
  priceUah: number;
  orderId: number;
  order?: {
    id: number;
    title: string;
  };
}

export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  // Inner array of products  -  5 ТЗ
  products?: Product[];
}

// Interface for Items Menu
export interface SidebarMenuItem {
  pathname: string;
  translationKey: "orders" | "groups" | "products" | "users" | "settings";
  icon: React.ReactNode;
  inDevelopment?: boolean;
}
