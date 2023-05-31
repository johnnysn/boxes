import { Box, IBox } from "../models/box.model";
import { Item } from "../models/item.model";

export type BoxesContextType = {
  boxes: Box[],
  addBox: (box: IBox) => void,
  updateBox: (id: string, box: IBox) => void,
  removeBox: (id: string) => void,
  addItem: (id: string, item: Item) => void,
  removeItem: (id: string, item: Item) => void,
};

export default BoxesContextType;

export const initialBoxesContext = {
  boxes: [],
  addBox: (box: IBox) => {},
  updateBox: (id: string, box: IBox) => {},
  removeBox: (id: string) => {},
  addItem: (id: string, item: Item) => {},
  removeItem: (id: string, item: Item) => {}
};