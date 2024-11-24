interface IProps {
  msg ?: string;
}

function ErrorMessage({ msg }: IProps) {
  return (
    <>{msg ? <p className="block text-sm text-red-600 ">{msg}</p> : null}</>
  );
}

export default ErrorMessage;
