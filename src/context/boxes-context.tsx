import React, { ReactNode, useState } from 'react';
import BoxesContextType, { initialBoxesContext } from './boxes-context.type';
import { Box, IBox } from '../models/box.model';
import { Item } from '../models/item.model';

const addBox = (boxes: Box[], boxData: IBox): Box[] => {
  const box = new Box(
    (Math.random() + 1).toString(36).substring(7),
    boxData.label,
    boxData.color,
    boxData.description
  );

  return [...boxes, box];
};

const updateBox = (boxes: Box[], id: string, boxData: IBox): Box[] => {
  let index = boxes.findIndex((b) => b.id === id);

  if (index >= 0) {
    const oldBox = boxes[index];
    const box = new Box(id, boxData.label, boxData.color, boxData.description, [
      ...oldBox.items,
    ]);
    const boxes_new = [...boxes];
    boxes_new[index] = box;
    return boxes_new;
  }

  return boxes;
};

const removeBox = (boxes: Box[], id: string): Box[] => {
  let box = boxes.find((b) => b.id === id);

  if (box) {
    if (box.parent) {
      box.parent.removeBox(box);
    }

    const new_boxes = boxes.filter((b) => b.id !== id);
    return [...new_boxes];
  }

  return boxes;
};

const addItem = (boxes: Box[], id: string, item: Item): Box[] => {
  let box = boxes.find((b) => b.id === id);

  if (box) {
    box.addItem(item);
    return [...boxes];
  }

  return boxes;
};

const removeItem = (boxes: Box[], id: string, item: Item): Box[] => {
  let box = boxes.find((b) => b.id === id);

  if (box) {
    box.removeItem(item);
    return [...boxes];
  }

  return boxes;
};

const byId = (boxes: Box[], id: string): Box | null => {
  return boxes.find((b) => b.id === id) ?? null;
};

const addBoxToBox = (boxes: Box[], id: string, box: IBox): Box[] => {
  const parentBox = boxes.find(b => b.id === id);
  if (!parentBox) return boxes;

  const newBoxes = [...boxes];

  let realBox = boxes.find(b => b.id === box.id);
  if (!realBox) {
    realBox = new Box(
      (Math.random() + 1).toString(36).substring(7),
      box.label,
      box.color,
      box.description
    );
    newBoxes.push(realBox);
  } 
  realBox.parent = parentBox;
  parentBox.addBox(realBox);

  return newBoxes;
}

export const BoxesContext =
  React.createContext<BoxesContextType>(initialBoxesContext);

const BoxesProvider = ({ children }: { children: ReactNode }) => {
  const [boxes, setBoxes] = useState<Box[]>([
    new Box('Id', 'Caixa de TV LG', 'red', 'Description 1', [
      { label: 'Suporte de tv' },
      { label: 'Manuais diversos' },
    ]),
    new Box('Id2', 'Caixa de sapato', 'yellow', 'Description 2', [
      { label: 'Cabos' },
      { label: 'Pilhas' },
      { label: 'Componentes eletrônicos' },
    ]),
  ]);

  const contextValue: BoxesContextType = {
    boxes: boxes,
    addBox: (box: IBox) => setBoxes((state) => addBox(state, box)),
    updateBox: (id: string, box: IBox) =>
      setBoxes((state) => updateBox(state, id, box)),
    removeBox: (id: string) => setBoxes((state) => removeBox(state, id)),
    addItem: (id: string, item: Item) =>
      setBoxes((state) => addItem(state, id, item)),
    removeItem: (id: string, item: Item) =>
      setBoxes((state) => removeItem(state, id, item)),
    getById: (id: string) => byId(boxes, id),
    addBoxToBox: (id: string, box: IBox) => setBoxes((state) => addBoxToBox(state, id, box))
  };

  return (
    <BoxesContext.Provider value={contextValue}>
      {children}
    </BoxesContext.Provider>
  );
};

export default BoxesProvider;
