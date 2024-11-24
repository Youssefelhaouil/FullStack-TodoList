import { forwardRef, InputHTMLAttributes, Ref } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(({ ...rest }: IProps ,ref:Ref<HTMLInputElement>) => {
  return (
    <>
      <input
        ref={ref}
        className="w-full border-2 border-slate-300 shadow-md
          rounded-md h-12 focus:outline-none
           focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 px-2 py-2 text-lg"
        {...rest}
      />
    </>
  );
});

export default Input;
