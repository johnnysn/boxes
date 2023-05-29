export class Item {
  label: string;
  quantity: number;
  color?: string;

  constructor(label: string) {
    this.label = label;
    this.quantity = 1;
  }
}