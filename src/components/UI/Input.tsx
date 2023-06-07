import React, { ChangeEvent, useState } from "react";

type Props = {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  defaultValue?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>( (props: Props, ref) => {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
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

      <input
        className={`appearance-none border rounded w-full max-w-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black ${hasError ? 'border-red-500' : 'border-gray-400'}`}
        id={props.id}
        type={props.type ? props.type : 'text'}
        placeholder={props.placeholder ? props.placeholder : props.label}
        required={props.required}
        maxLength={props.maxLength ?? 40}
        ref={ref}
        onChange={changeHandler}
        onBlur={blurHandler}
        onInvalid={() => setHasError(true)}
        defaultValue={props.defaultValue}
      />
    </div>
  );
}); 

export default Input;
