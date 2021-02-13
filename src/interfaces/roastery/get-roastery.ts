import { User } from "../../entity/User";
import { ErrorDto } from "../shared/error";

export interface RoasteryDto {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetRoasteriesRequest {
  user: User;
}

export interface GetRoasteriesResponse {
  roasteries?: RoasteryDto[];
  error?: ErrorDto;
}

export interface GetRoasteriesApiResponse extends GetRoasteriesResponse {}
