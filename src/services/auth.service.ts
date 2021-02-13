import { User } from "../entity/User";

export const authService = {
  findUserById: async (id: number): Promise<User | undefined> => {
    try {
      const user = await User.findOne({ id });
      return user;
    } catch (error) {
      throw error;
    }
  },
};
