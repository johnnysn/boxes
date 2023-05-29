import { Item } from '../models/item.model';
import { Box } from '../models/box.model';
import Boxes from '../components/Boxes';
import { useState } from 'react';

type Props = {};

const DUMMY_BOXES: Box[] = [
  {
    id: '1',
    label: 'Caixa marrom grande',
    items: [new Item('Cabos HDMI'), new Item('Acessórios da TV LG')],
    color: 'blue',
  },
  {
    id: '2',
    label: 'Caixa de ventilador ventisol',
    items: [new Item('DVDs antigos'), new Item('Livros de auto-sabotagem')],
    color: 'emerald',
  },
  {
    id: '3',
    label: 'Caixa de gabinete de PC',
    items: [],
    color: 'red',
  },
  {
    id: '4',
    label: 'Caixa de sapato 1',
    items: [new Item('Pilhas novas')],
    color: 'yellow',
  },
];

export default function MainPage({}: Props) {
  const [boxes, setBoxes] = useState(DUMMY_BOXES);

  return <div className="flex flex-col items-center">
    <Boxes boxes={ boxes } />
  </div>;
}
