import { useRef, FormEvent, useState } from 'react';
import Button from './UI/Button';
import Input from './UI/Input';
import Textarea from './UI/Textarea';
import { IBox } from '../models/box.model';
import ColorPicker from './UI/ColorPicker';

type Props = {
  onSubmit: (data: IBox) => void,
  onClose: () => void;
};

export default function NewBox({ onSubmit, onClose }: Props) {
  const labelRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [ color, setColor ] = useState('');

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
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
        />

        <Textarea
          id="description"
          label="Description"
          placeholder="Description for your box"
          ref={descriptionRef}
        />

        <ColorPicker onSelectColor={ (c: string) => setColor(c) } />

        <div className="flex items-center justify-around">
          <Button text="Create" color="primary" />
          <Button text="Cancel" color="secondary" type="button" onClick={onClose} />
        </div>
      </form>
    </div>
  );
}
