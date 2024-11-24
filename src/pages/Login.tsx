import { SubmitHandler, useForm } from "react-hook-form";
import { loginForm } from "../Data";
import Input from "../Components/Ui/Input";
import Button from "../Components/Ui/Button";
import { loginSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../Components/ErrorMessage";
import { Link } from "react-router-dom";
import axiosInstance from "../Config/axios.config";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { IErrorResponse } from "../Interfaces";
import { useState } from "react";

interface IFormInput {
  identifier: string;
  password: string;
}

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const { status, data: resData } = await axiosInstance.post(
        "/auth/local",
        data
      );
      if (status === 200) {
        toast.success("You're logged in successfully", {
          duration: 2000,
        });
        localStorage.setItem("userData",JSON.stringify(resData))

        setTimeout(() => {
          location.replace("/")
        }, 1500);
      }
    } catch (error) {
      const errArr = error as AxiosError<IErrorResponse>;
      toast.error(`${errArr.response?.data.error.message}`);
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  const RenderLoginInput = loginForm.map((input, idx) => (
    <div key={idx} className="flex flex-col space-y-1">
      <label htmlFor={input.name} className="text-sm text-indigo-500 pl-1">
        {input.name}
      </label>
      <Input
        type={input.type}
        id={input.name}
        placeholder={input.placeholder}
        {...register(input.name, input.validation)}
      />
      {errors[input.name] && <ErrorMessage msg={errors[input.name]?.message} />}
    </div>
  ));

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="flex flex-col text-gray-700 space-y-5 mt-10 w-[600px] shadow-md p-10 rounded-md">
          <h1 className="text-2xl font-bold text-center">
            Login to your Account
          </h1>
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {RenderLoginInput}
            <Button
              classname="bg-indigo-600 hover:bg-indigo-400 mt-4"
              width="w-full"
              isLoading={isLoading}
            >
              LOGIN
            </Button>
            <h1 className="text-base text-center ">
              Create Account?{"  "}
              <Link
                to={"/register"}
                className="text-blue-500 cursor-pointer hover:text-blue-700 underline "
              >
                register
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
