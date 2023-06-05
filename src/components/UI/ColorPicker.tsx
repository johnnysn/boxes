import { useState } from 'react';
import selectableColors from '../../constants/selectable-colors';

type Props = { onSelectColor: (color: string) => void };

export default function ColorPicker({ onSelectColor }: Props) {
  const [color, setColor] = useState('red');

  const colorClickHandler = (c: string) => {
    setColor(c);
    onSelectColor(c);
  };

  return (
    <div className="mb-4">
      <p className="text-gray-700 font-bold mb-1">Color</p>

      <div className="flex gap-1 w-full max-w-lg">
        {selectableColors.map((c) => (
          <div
            key={c}
            className={`bg-${c}-400 w-7 h-7 rounded-sm hover:bg-${c}-300 ${c === color ? 'border-2 border-black' : ''}`}
            onClick={ () => colorClickHandler(c) }
          ></div>
        ))}
      </div>
    </div>
  );
}
