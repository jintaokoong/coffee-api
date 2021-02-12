import { User } from "src/entity/User";

export const authService = {
  findUserById: async (id: number): Promise<User | undefined> => {
    try {
      const user = User.findOne({ where: { id } });
      return user;
    } catch (error) {
      throw error;
    }
  },
};
