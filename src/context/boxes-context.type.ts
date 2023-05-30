import { Box, IBox } from "../models/box.model";

export type BoxesContextType = {
  boxes: Box[],
  addBox: (box: IBox) => void,
  updateBox: (id: string, box: IBox) => void
  removeBox: (id: string) => void
};

export default BoxesContextType;