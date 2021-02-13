import { User } from "src/entity/User";

interface CoffeeDto {
  id: string;
  name: string;
  process: string;
  roast: {
    id: string;
    name: string;
    toCreate: boolean;
  };
  origin: OriginDto;
  toCreate: boolean;
}

interface OriginDto {
  country: string;
  region: string;
  farm: string;
  description: string;
}

export interface CreateRecipeRequest {
  rating: number;
  duration: number;
  weight: number;
  volume: number;
  remarks?: string;
  grind: string;
  coffee: CoffeeDto;
  tasteNotes: string[];
  user: User; // to attach user
}
