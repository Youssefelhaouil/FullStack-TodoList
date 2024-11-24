import Button from "./Ui/Button";
import { IErrorResponse, ITodo } from "../Interfaces";
import useFetch from "../hooks/UseFetch";
import Modal from "./Ui/Modal";
import Input from "./Ui/Input";
import { useState } from "react";
import TextArea from "./Ui/TextArea";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import axiosInstance from "../Config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import TodoSkeleton from "./TodoSkeleton";
import { userDatas } from "./Auth/LocalStorageKey";
import Paginator from "./paginator";
interface IProps {}

function Todo({}: IProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState(0);
  const [querykey, setSetQueryKey] = useState(0);
  const [addTodo, setAddTodo] = useState({
    title: "",
    description: "",
  });
  const [editTodo, setEditTodo] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
  });
  console.log(addTodo, editTodo);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { isLoading, data } = useFetch({
    queryKey: ["todoList", `${querykey}`],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userDatas.jwt}`,
      },
    },
  });
  const onOpenAddModal = () => {
    reset({ title: "", description: "" });

    setOpenAddModal(true);
  };
  const onCloseAddModal = () => {
    setAddTodo({
      title: "",
      description: "",
    });
    setOpenAddModal(false);
  };
  const onOpenEditModal = (todo: ITodo) => {
    setEditTodo(todo);
    reset({ title: todo.title, description: todo.description });
    setOpenEditModal(true);
  };
  const onCloseDeleteModal = () => setOpenDeleteModal(false);
  const onCloseEditModal = () => {
    setEditTodo({
      id: 0,
      title: "",
      description: "",
    });
    setOpenEditModal(false);
    reset();
  };

  const OnSubmitAdd = async (data: any) => {
    const { title, description } = data;
    try {
      const res = await axiosInstance.post(
        `/todos`,
        { data: { title, description, user: [userDatas.user.id] } },
        {
          headers: {
            Authorization: `Bearer ${userDatas.jwt}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success(`Todo has been Added`, {
          duration: 2000,
        });
        setSetQueryKey((c) => c + 1);
        setAddTodo({
          title: "",
          description: "",
        });
      }
    } catch (error) {
      const errAx = error as AxiosError<IErrorResponse>;
      toast.error(`${errAx.response?.data.error.message}`);
    } finally {
      setOpenAddModal(false);
    }
  };

  const OnSubmitEdit = async (data: any) => {
    const { title, description } = data;
    try {
      const res = await axiosInstance.put(
        `/todos/${editTodo.id}`,
        { data: { title, description } },
        {
          headers: {
            Authorization: `Bearer ${userDatas.jwt}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success(`Todo's id :${editTodo.id} Updated`, {
          duration: 2000,
        });
        setSetQueryKey((c) => c + 1);
      }
    } catch (error) {
      const errAx = error as AxiosError<IErrorResponse>;
      toast.error(`${errAx.response?.data.error.message}`);
    } finally {
      onCloseEditModal();
    }
  };
  const handleOpenDeleteTodo = (id: number) => {
    setOpenDeleteModal(true);
    setDeleteTodoId(id);
  };
  const onDeleteTodo = async () => {
    try {
      const res = await axiosInstance.delete(`/todos/${deleteTodoId}`, {
        headers: {
          Authorization: `Bearer ${userDatas.jwt}`,
        },
      });
      if (res.status === 200) {
        setDeleteTodoId(0);
        toast.success("Todo has been Deleted");
        setSetQueryKey((c) => c + 1);
      }
    } catch (err) {
      const errObj = err as AxiosError<IErrorResponse>;
      toast.error(`${errObj.response?.data.error.message}`);
    } finally {
      setOpenDeleteModal(false);
    }
  };

  if (isLoading) return <TodoSkeleton />;
  return (
    <>
      <div className="mt-10 flex flex-col  space-y-2">
        {data.todos.length ? (
          <div className="flex justify-end  mb-4">
            <Button
              width="w-fit"
              classname="bg-indigo-500 hover:bg-indigo-400 flex justify-end "
              onClick={onOpenAddModal}
            >
              Add New Todo
            </Button>
          </div>
        ) : null}

        <div className=" flex flex-col items-center space-y-2 ">
          {data.todos.length ? (
            data.todos.map((todo: ITodo) => (
              <div
                key={todo.id}
                className="flex justify-between items-center w-full md:w-[300px] lg:w-[400px] xl:w-[500px] p-2 rounded-md shadow-md"
              >
                <h1 className=" text-base ">{todo.title}</h1>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => onOpenEditModal(todo)}
                    classname="bg-gray-500 hover:bg-gray-700"
                    width="w-fit"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteTodo(todo.id)}
                    classname="bg-red-500 hover:bg-red-700"
                    width="w-fit"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center space-y-3">
              <h1 className=" text-xl">there's no Todos</h1>
              <div className="flex justify-center  mb-4">
                <Button
                  width="w-fit"
                  classname="bg-indigo-500 hover:bg-indigo-400 flex justify-end px-4 "
                  onClick={onOpenAddModal}
                >
                  Add Todo
                </Button>
              </div>
            </div>
          )}
        </div>
        <Paginator />
      </div>
      <Modal
        isOpenModal={openEditModal}
        title="Edit Todo"
        closeModal={onCloseEditModal}
      >
        <form onSubmit={handleSubmit(OnSubmitEdit)}>
          <div>
            <label htmlFor="title" className="text-gray-700 pl-1 mb-1">
              Title
            </label>
            <Input
              id="title"
              {...register("title", {
                required: "Title is Required",
              })}
            />
            {errors.title && <ErrorMessage msg={`${errors.title?.message}`} />}
          </div>
          <div>
            <label htmlFor="description" className="text-gray-700 pl-1 mb-1">
              Description
            </label>
            <TextArea id="description" {...register("description")} />
          </div>
          <div className="flex space-x-1">
            <Button
              classname="bg-indigo-600 hover:bg-indigo-400 "
              width="w-full"
            >
              Edit Todo
            </Button>
            <Button
              onClick={onCloseEditModal}
              classname="bg-gray-400 hover:bg-gray-700 "
              width="w-full"
              type="button"
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
      <Modal isOpenModal={openDeleteModal} closeModal={onCloseDeleteModal}>
        <h1 className="text-red-500 font-bold text-lg ml-1">
          Are You sure You want to delete this Todo
        </h1>
        <div className="flex space-x-1">
          <Button
            onClick={onDeleteTodo}
            classname="bg-red-600 hover:bg-red-400 "
            width="w-full"
          >
            Delete Todo
          </Button>
          <Button
            onClick={onCloseDeleteModal}
            classname="bg-gray-400 hover:bg-gray-700 "
            width="w-full"
            type="button"
          >
            Close
          </Button>
        </div>
      </Modal>
      <Modal
        isOpenModal={openAddModal}
        title="Add Todo"
        closeModal={onCloseAddModal}
      >
        <form onSubmit={handleSubmit(OnSubmitAdd)}>
          <div>
            <label htmlFor="title" className="text-gray-700 pl-1 mb-1">
              Title
            </label>
            <Input
              id="title"
              {...register("title", {
                required: "Title is Required",
              })}
            />
            {errors.title && <ErrorMessage msg={`${errors.title?.message}`} />}
          </div>
          <div>
            <label htmlFor="description" className="text-gray-700 pl-1 mb-1">
              Description
            </label>
            <TextArea id="description" {...register("description")} />
          </div>
          <div className="flex space-x-1">
            <Button
              classname="bg-indigo-600 hover:bg-indigo-400 "
              width="w-full"
            >
              Add Todo
            </Button>
            <Button
              onClick={onCloseAddModal}
              classname="bg-gray-400 hover:bg-gray-700 "
              width="w-full"
              type="button"
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Todo;
