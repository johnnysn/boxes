import { Item } from "./item.model";

export class Box {
  private _items: Item[] = [];
  private _parent: Box | null = null;

  constructor(
    private _id: string,
    private _label: string,
    private _color: string,
    private _description?: string,
    _items?: Item[]
  ) {
    if (_items) {
      this._items = _items;
    }
  }

  public get items() {
    return this._items;
  }

  public get id() {
    return this._id;
  }

  public get label() {
    return this._label;
  }

  public get color() {
    return this._color;
  }

  public get description() {
    return this._description;
  }

  public addItem(item: Item) {
    this._items = [item, ...this._items];
  }

  public removeItem(item: Item) {
    this._items = this.items.filter(i => i.label.trim() !== item.label.trim());
  }
}

export interface IBox {
  id?: string;
  label: string;
  color: string;
  description?: string;
  items?: Item[];
  parent?: Box | null;
}
