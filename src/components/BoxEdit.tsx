import { useRef, FormEvent, useState, useEffect } from 'react';
import Button from './UI/Button';
import Input from './UI/Input';
import Textarea from './UI/Textarea';
import { IBox } from '../models/box.model';
import ColorPicker from './UI/ColorPicker';

type Props = {
  onSubmit: (data: IBox) => void,
  onClose: () => void,
  boxDataIn?: IBox | null
};

const emptyBoxData = { id: undefined, label: '', description: '', color: 'red' };

export default function BoxEdit({ onSubmit, onClose, boxDataIn }: Props) {
  const labelRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [ color, setColor ] = useState('');
  const boxData = boxDataIn ?? emptyBoxData;

  useEffect(() => {
    if (boxDataIn) {
      setColor(boxDataIn.color);
    }
  },[boxDataIn]);

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
    <div className="mb-2 w-full md:max-w-screen-md">
      <h2 className="text-lg font-bold mb-2">Box {boxData.id ? 'edit' : 'create'}</h2>

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

        <div className="flex items-center justify-between">
          <Button text="Save" color="primary" />
          <Button text="Cancel" color="secondary" type="button" onClick={onClose} />
        </div>
      </form>
    </div>
  );
}
