import { Item } from "./item.model";

export class Box {
  private _items: Item[] = [];
  private _parent: Box | null = null;
  private _boxes: Box[] = [];

  constructor(
    private _id: string,
    private _label: string,
    private _color: string,
    private _description?: string,
    _items?: Item[],
    _parent?: Box
  ) {
    if (_items) {
      this._items = _items;
    }
    if (_parent) {
      this._parent = _parent;
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

  public get boxes() {
    return this._boxes;
  }

  public get parent(): Box | null {
    return this._parent;
  }

  public set parent(parent: Box | null) {
    this._parent = parent;
  }

  public addItem(item: Item) {
    this._items = [item, ...this._items];
  }

  public removeItem(item: Item) {
    this._items = this._items.filter(i => i.label.trim() !== item.label.trim());
  }

  public addBox(box: Box) {
    const index = this._boxes.findIndex(b => b.id === box.id);
    if (index > -1) return;
    this._boxes.push(box);
    box._parent = this;
  }

  public removeBox(box: Box) {
    this._boxes = this._boxes.filter(b => b.id !== box.id);
    box._parent = null;
  }
}

export interface IBox {
  id?: string;
  label: string;
  color: string;
  description?: string;
  items?: Item[];
  parent?: IBox | null;
  boxes?: IBox[];
}
