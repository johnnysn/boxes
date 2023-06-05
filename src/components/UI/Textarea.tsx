import React, { ChangeEvent, useState } from "react";

type Props = {
  id: string;
  label: string;
  rows?:number;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>( (props: Props, ref) => {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    if (event.target.value.trim() !== '') {
      setHasError(false);
    }
  }

  const blurHandler = () => {
    if (props.required && (!value || value.trim() === '')) {
      setHasError(true);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={props.id} className="block text-gray-700 font-bold mb-1">
        {props.label}
      </label>

      <textarea
        className={`appearance-none border rounded w-full max-w-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black ${hasError ? 'border-red-500' : 'border-gray-400'}`}
        id={props.id}
        placeholder={props.placeholder ? props.placeholder : props.label}
        required={props.required}
        maxLength={props.maxLength ?? 120}
        ref={ref}
        rows={props.rows ? props.rows : 5}
        onChange={changeHandler}
        onBlur={blurHandler}
        onInvalid={() => setHasError(true)}
      ></textarea>
    </div>
  );
}); 

export default Textarea;
