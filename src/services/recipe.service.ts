import { Coffee } from "src/entity/Coffee";
import { CreateRecipeRequest } from "src/interfaces/recipe/create-recipe";
import { Roast } from "../entity/Roast";

export const recipeService = {
  createRecipe: async (request: CreateRecipeRequest) => {
    let roast: Roast | undefined = undefined;
    const { coffee: {roast: r_roast} } = request;
    if (!request.coffee.roast.toCreate) {
      roast = await Roast.findOne({ where: { id: r_roast.id }});
    } else {
      roast = new Roast();
      roast.name = r_roast.name;
      roast = await roast.save();
    }

    if (roast === undefined) {
      
    }

    let coffee = undefined;
    if (!request.coffee.toCreate) {
      coffee =  
    } else {
      coffee = new Coffee();
      const {coffee: r_coffee} = request;
      coffee.name = r_coffee.name;
      coffee.process = r_coffee.process;
    }
  },
};
