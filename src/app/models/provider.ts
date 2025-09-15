import { ProviderCategories } from "../enum/provider-categories";

export interface Provider {
  id: number;
  name: string;
  email: string;
  contact: string;
  category: ProviderCategories;
}
