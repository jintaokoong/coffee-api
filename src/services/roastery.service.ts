import { Roastery } from "../entity/Roastery";
import {
  CreateRoasteryRequest,
  CreateRoasteryResponse,
} from "../interfaces/roastery/create-roastery";
import {
  GetRoasteriesRequest,
  GetRoasteriesResponse,
  RoasteryDto,
} from "../interfaces/roastery/get-roastery";

export const roasteryService = {
  createRoastery: async (
    request: CreateRoasteryRequest
  ): Promise<CreateRoasteryResponse> => {
    let roastery = new Roastery();
    roastery.name = request.name;
    roastery.latitude = request.latitude;
    roastery.longitude = request.longitude;
    roastery.createdBy = request.user;

    try {
      roastery = await roastery.save();
    } catch (err) {
      console.error(err);
      return {
        error: {
          type: "insert_error",
          message: "insert failed.",
        },
      };
    }

    return {
      roastery: {
        id: roastery.id,
        name: roastery.name,
        longitude: roastery.longitude,
        latitude: roastery.latitude,
      },
    };
  },
  fetchRoasteries: async (
    request: GetRoasteriesRequest
  ): Promise<GetRoasteriesResponse> => {
    try {
      const roasteries = request.user.roasteries;
      const dtos: RoasteryDto[] = roasteries.map((r) => ({
        id: r.id,
        name: r.name,
        latitude: r.latitude,
        longitude: r.longitude,
      }));
      return {
        roasteries: dtos,
      };
    } catch (err) {
      return {
        error: {
          type: "internal_error",
          message: "an error has occured.",
        },
      };
    }
  },
};
