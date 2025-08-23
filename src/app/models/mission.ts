export interface Mission {
  id: number;
  title: string;
  description: string;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  orderId: number;
}
