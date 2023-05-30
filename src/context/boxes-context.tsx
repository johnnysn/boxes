import React, { ReactNode, useState } from "react";
import BoxesContextType from "./boxes-context.type";
import { Box, IBox } from "../models/box.model";

const initialContext = {
  boxes: [],
  addBox: (box: IBox) => {},
  updateBox: (id: string, box: IBox) => {},
  removeBox: (id: string) => {},
};

const addBox = (boxes: Box[], boxData: IBox): Box[] => {
  const box = new Box("id", boxData.label, boxData.color, boxData.description);

  return [...boxes, box];
};

const updateBox = (boxes: Box[], id: string, boxData: IBox): Box[] => {
  let box = boxes.find((b) => b.id === id);

  if (box) {
    box.label = boxData.label;
    box.color = boxData.color;
    box.description = boxData.description;
    return [...boxes];
  }

  return boxes;
};

const removeBox = (boxes: Box[], id: string): Box[] => {
  let box = boxes.find((b) => b.id === id);

  if (box) {
    return boxes.filter((b) => b.id !== id);
  }

  return boxes;
};

export const BoxesContext =
  React.createContext<BoxesContextType>(initialContext);

const BoxesProvider = ({ children }: { children: ReactNode }) => {
  const [boxes, setBoxes] = useState<Box[]>([]);

  const contextValue: BoxesContextType = {
    boxes: boxes,
    addBox: (box: IBox) => setBoxes((state) => addBox(state, box)),
    updateBox: (id: string, box: IBox) =>
      setBoxes((state) => updateBox(state, id, box)),
    removeBox: (id: string) => setBoxes((state) => removeBox(state, id)),
  };

  return (
    <BoxesContext.Provider value={contextValue}>
      {children}
    </BoxesContext.Provider>
  );
};

export default BoxesProvider;
