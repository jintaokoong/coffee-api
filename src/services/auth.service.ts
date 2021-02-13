import { User } from "../entity/User";

export const authService = {
  findUserById: async (
    id: number,
    load?: string[]
  ): Promise<User | undefined> => {
    try {
      const user = await User.findOne({ id }, { relations: load });
      return user;
    } catch (error) {
      throw error;
    }
  },
};
