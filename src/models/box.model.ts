import { Item } from "./item.model";

export class Box {
  items: Item[] = [];
  parent: Box | null = null;

  constructor(
    public id: string,
    public label: string,
    public color: string,
    public description?: string
  ) {}
}

export interface IBox {
  id?: string;
  label: string;
  color: string;
  description?: string;
  items?: Item[];
  parent?: Box | null;
}
