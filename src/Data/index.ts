import { ILoginInput, IRegisterForm } from "../Interfaces";

export const RegisterForm :IRegisterForm[] = [
  {
    name: "username",
    placeholder: "Username",
    type: "text",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
    name: "email",
    placeholder: "Email Address",
    type: "email",
    validation: {
      required: true,
      pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: true,
      minLength: 8,
    },
  },
];
export const loginForm :ILoginInput[] = [
  {
    name: "identifier",
    placeholder: "Email Address",
    type: "text",
    validation: {
      required: true,
      pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: true,
      minLength: 8,
    },
  },
];

