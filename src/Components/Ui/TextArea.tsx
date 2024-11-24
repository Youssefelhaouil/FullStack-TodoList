import { forwardRef, Ref, TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  row?: number;
}

const TextArea=forwardRef(({row, ...rest }: IProps ,ref:Ref<HTMLTextAreaElement>)=> {
  return (
    <>
      <textarea
      ref={ref}
        rows={6}
        className="w-full border-2 border-slate-300 shadow-md
          rounded-md h-fit focus:outline-none
           focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 px-2 py-2 text-lg "
        {...rest}
      />
    </>
  );
});

export default TextArea;
