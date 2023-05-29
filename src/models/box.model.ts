import { Item } from "./item.model";

export interface Box {
  id: string;
  label: string;
  color: string;
  items: Item[];
}