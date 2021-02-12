import { TasteNote } from "src/entity/TasteNote";

export const tasteNoteService = {
  addTasteNotes: async (tasteNotes: string[]): Promise<TasteNote[]> => {
    const inserts = tasteNotes.map((tasteNote) => {
      const t = new TasteNote();
      t.description = tasteNote;
      return t.save();
    });

    try {
      const tns = await Promise.all(inserts);
      return tns;
    } catch (error) {
      throw error;
    }
  },
};
