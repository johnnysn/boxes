import React, { useRef, KeyboardEvent, useImperativeHandle } from "react";

type Props = { onAdded: (name: string) => void, onCancel?: () => void }

const NewItemInput = React.forwardRef((props: Props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current!.focus();
      },
    };
  });

  const keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key == 'Enter') {
      props.onAdded(inputRef.current!.value);
      inputRef.current!.value = '';
    }
  }

  const blurHandler = () => {
    if (props.onCancel) {
      props.onCancel();
    }
  };

  return (
    <div className="flex items-center bg-orange-100 rounded-lg py-1 px-1 hover:bg-orange-50 focus-within:bg-orange-50 transition-colors duration-300 mt-2 max-w-[240px]">
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-700 text-sm font-medium font-sans px-1 leading-tight focus:outline-none"
        type="text"
        aria-label="New item"
        ref={inputRef}
        onKeyDown={keyDownHandler}
        onBlur={blurHandler}
      />
    </div>
  )
});

export default NewItemInput;