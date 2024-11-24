import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterForm } from "../Data";
import Input from "../Components/Ui/Input";
import Button from "../Components/Ui/Button";
import { registerSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../Components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { IErrorResponse } from "../Interfaces";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

function Register() {
  const [isLoading,setIsLoading]=useState(false)


  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true)
    try {
      const res = await axiosInstance.post("/auth/local/register", data);
      console.log(res);
      if (res.status === 200) {
        toast.success("you're registred successfully", {
          duration: 2000,
        });
        setTimeout(() => {
          navigate("/login")
        }, 1500);
      }
      
    } catch (error) {
      const errArr=error as AxiosError<IErrorResponse>
      toast.error(`${errArr.response?.data.error.message}`)
    } finally{
      setIsLoading(false)
    }
  };

  const RenderRegisterInput = RegisterForm.map((input, idx) => (
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
      <div className="flex justify-center">
        <div className="flex flex-col text-gray-700 space-y-5 mt-10 w-[600px] shadow-md p-10 rounded-md">
          <h1 className="text-2xl font-bold text-center">
            Create Your Account
          </h1>
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {RenderRegisterInput}
            <Button
              classname="bg-indigo-600 hover:bg-indigo-400 mt-4"
              width="w-full"
              isLoading={isLoading}
            >
              Register
            </Button>
            <h1 className="text-base text-center ">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 cursor-pointer hover:text-blue-700 underline "
              >
                Log in
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
