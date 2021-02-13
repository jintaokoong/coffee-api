import { User } from "../../entity/User";
import { ErrorDto } from "../shared/error";

export interface CreateRoasteryApiRequest {
  name: string;
  latitude: number;
  longitude: number;
}

export interface CreateRoasteryRequest {
  name: string;
  latitude: number;
  longitude: number;
  user: User;
}

interface RoasteryDto {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRoasteryResponse {
  roastery?: RoasteryDto;
  error?: ErrorDto;
}

export interface CreateRoasteryApiResponse {
  roastery?: RoasteryDto;
  error?: ErrorDto;
}
