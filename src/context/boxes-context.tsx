import React, { ReactNode, useState } from 'react';
import BoxesContextType, { initialBoxesContext } from './boxes-context.type';
import { Box, IBox } from '../models/box.model';
import { Item } from '../models/item.model';
import { addBox, addBoxToBox, addItem, byId, removeBox, removeItem, updateBox } from './boxes-context-functions';

export const BoxesContext =
  React.createContext<BoxesContextType>(initialBoxesContext);

const BoxesProvider = ({ children }: { children: ReactNode }) => {
  const [boxes, setBoxes] = useState<Box[]>([
    new Box('idBox1', 'Philips TV box', 'red', 'A large TV box', [
      { label: 'TV wall mount' },
      { label: 'Old keyboard' },
      { label: 'Two computer mices' },
      { label: 'HDMI cable' },
    ]),
    new Box('Id2', 'Yellow shoe box', 'yellow', 'A small box of shoes', [
      { label: 'My favorite cds' },
      { label: 'Digital watch' },
      { label: 'External hard drive' },
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
