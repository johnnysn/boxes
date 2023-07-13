import { Box, IBox } from "../models/box.model";
import { Item } from "../models/item.model";

export const addBox = (boxes: Box[], boxData: IBox): Box[] => {
  const box = new Box(
    (Math.random() + 1).toString(36).substring(7),
    boxData.label,
    boxData.color,
    boxData.description
  );

  return [...boxes, box];
};

export const updateBox = (boxes: Box[], id: string, boxData: IBox): Box[] => {
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

export const removeBox = (boxes: Box[], id: string): Box[] => {
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

export const addItem = (boxes: Box[], id: string, item: Item): Box[] => {
  let box = boxes.find((b) => b.id === id);

  if (box) {
    box.addItem(item);
    return [...boxes];
  }

  return boxes;
};

export const removeItem = (boxes: Box[], id: string, item: Item): Box[] => {
  let box = boxes.find((b) => b.id === id);

  if (box) {
    box.removeItem(item);
    return [...boxes];
  }

  return boxes;
};

export const byId = (boxes: Box[], id: string): Box | null => {
  return boxes.find((b) => b.id === id) ?? null;
};

export const addBoxToBox = (boxes: Box[], id: string, box: IBox): Box[] => {
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