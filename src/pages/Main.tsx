import Boxes from '../components/Boxes';
import SearchBox from '../components/SearchBox';
import AddBoxButton from '../components/AddBoxButton';
import { useState, useContext } from 'react';
import BoxesContextType from '../context/boxes-context.type';
import { BoxesContext } from '../context/boxes-context';

type Props = {};

export default function MainPage({}: Props) {
  const ctx = useContext<BoxesContextType>(BoxesContext);
  const [boxes, setBoxes] = useState(ctx.boxes);

  const searchHandler = (key: string) => {
    setBoxes(
      ctx.boxes.filter(
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
