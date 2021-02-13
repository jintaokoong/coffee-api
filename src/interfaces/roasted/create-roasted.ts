export interface CreateRoastedCoffeeApiRequest {
  weight: number;
  coffee: string; // coffee id
  roastery: string; // roastery id
  roast: {
    id?: string;
    name: string;
  };
}
