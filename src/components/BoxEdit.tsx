import { useRef, FormEvent, useState, useEffect, useContext } from 'react';
import Button from './UI/Button';
import Input from './UI/Input';
import Textarea from './UI/Textarea';
import { IBox } from '../models/box.model';
import ColorPicker from './UI/ColorPicker';
import BoxesContextType from '../context/boxes-context.type';
import { BoxesContext } from '../context/boxes-context';

type Props = {
  onSubmit: (data: IBox) => void,
  onClose: () => void,
  boxId?: string
};

const emptyBoxData = { label: '', description: '', color: 'red' };

export default function BoxEdit({ onSubmit, onClose, boxId }: Props) {
  const labelRef = useRef<HTMLInputElement>(null);
  const { getById } = useContext<BoxesContextType>(BoxesContext);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [ color, setColor ] = useState('');
  const [ boxData, setBoxData ] = useState<IBox>(emptyBoxData);

  useEffect(() => {
    if (boxId) {
      const box = getById(boxId);
      if (box) {
        setBoxData({ id: boxId, label: box.label, description: box.description, color: box.color });
        setColor(box.color);
      } else {
        setBoxData(emptyBoxData);
        setColor(emptyBoxData.color);
      }
    }
  },[boxId]);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      id: boxData.id,
      label: labelRef.current!.value,
      description: descriptionRef.current!.value,
      color: color
    };
    onSubmit(data);
    onClose();
  };

  return (
    <div className="mb-2">
      <h2 className="text-lg font-bold mb-2">New box</h2>

      <form onSubmit={onSubmitHandler}>
        <Input
          id="label"
          label="Label"
          placeholder="A label for your box"
          required={true}
          ref={labelRef}
          defaultValue={boxData.label}
        />

        <Textarea
          id="description"
          label="Description"
          placeholder="Description for your box"
          ref={descriptionRef}
          defaultValue={boxData.description}
        />

        <ColorPicker onSelectColor={ (c: string) => setColor(c) } selectedColor={color} />

        <div className="flex items-center justify-around">
          <Button text="Save" color="primary" />
          <Button text="Cancel" color="secondary" type="button" onClick={onClose} />
        </div>
      </form>
    </div>
  );
}
