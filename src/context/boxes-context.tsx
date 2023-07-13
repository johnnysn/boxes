import React, { ReactNode, useEffect, useState } from 'react';
import BoxesContextType, { initialBoxesContext } from './boxes-context.type';
import { Box, IBox } from '../models/box.model';
import { Item } from '../models/item.model';
import * as boxesContextFunctions from './boxes-context-functions';
import { retrieveBoxesFromLocalStorage, storeBoxesIntoLocalStorage } from './boxes-context-storage';

export const BoxesContext =
  React.createContext<BoxesContextType>(initialBoxesContext);

let retrievedFromStorage = false;

const BoxesProvider = ({ children }: { children: ReactNode }) => {
  const [boxes, setBoxes] = useState<Box[]>([]);

  useEffect(() => {
    const _boxes = retrieveBoxesFromLocalStorage();
    if (_boxes) {
      setBoxes(_boxes);
    }
    retrievedFromStorage = true;
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (retrievedFromStorage) storeBoxesIntoLocalStorage(boxes);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [boxes]);

  const contextValue: BoxesContextType = {
    boxes: boxes,
    addBox: (box: IBox) => setBoxes((state) => boxesContextFunctions.addBox(state, box)),
    updateBox: (id: string, box: IBox) =>
      setBoxes((state) => boxesContextFunctions.updateBox(state, id, box)),
    removeBox: (id: string) => setBoxes((state) => boxesContextFunctions.removeBox(state, id)),
    addItem: (id: string, item: Item) =>
      setBoxes((state) => boxesContextFunctions.addItem(state, id, item)),
    removeItem: (id: string, item: Item) =>
      setBoxes((state) => boxesContextFunctions.removeItem(state, id, item)),
    getById: (id: string) => boxesContextFunctions.byId(boxes, id),
    addBoxToBox: (id: string, box: IBox) =>
      setBoxes((state) => boxesContextFunctions.addBoxToBox(state, id, box)),
  };

  return (
    <BoxesContext.Provider value={contextValue}>
      {children}
    </BoxesContext.Provider>
  );
};

export default BoxesProvider;
