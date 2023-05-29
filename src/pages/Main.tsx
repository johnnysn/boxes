import { Item } from '../models/item.model';
import { Box } from '../models/box.model';
import Boxes from '../components/Boxes';
import SearchBox from '../components/SearchBox';
import AddBoxButton from '../components/AddBoxButton';
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

  const searchHandler = (key: string) => {
    setBoxes(
      DUMMY_BOXES.filter(
        (b) => b.label.toLowerCase().indexOf(key.trim().toLowerCase()) > -1
      )
    );
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <SearchBox searchHandler={searchHandler} />
        <AddBoxButton />
      </div>
      <Boxes boxes={boxes} />
    </div>
  );
}
