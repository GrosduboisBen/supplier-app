import { OrderStatus } from "src/app/enum/order-status";

export interface Order {
  id: number;
  description: string;
  quantity: number;
  status: OrderStatus;
  projectId: number;
  providerId: number;
}
