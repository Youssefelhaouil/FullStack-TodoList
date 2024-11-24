function TodoSkeleton() {
  return (
    <>
      <div className="mt-10 flex flex-col items-center space-y-2 ">
        <div className=" flex justify-between items-center space-x-4  w-[500px] h-12 p-2 mx-auto shadow-md bg-gray-100 rounded-md">
          <span className=" font-semibold text-xl bg-gray-300 h-4 w-full rounded-md"></span>
          <div className=" flex space-x-2 ">
            <span className=" bg-gray-300 h-10 w-[80px] rounded-md"></span>
            <span className=" bg-gray-300 h-10 w-[80px] rounded-md"></span>
          </div>
        </div>
        <div className=" flex justify-between items-center space-x-4  w-[500px] h-12 p-2 mx-auto shadow-md bg-gray-100 rounded-md">
          <span className=" font-semibold text-xl bg-gray-300 h-4 w-full rounded-md"></span>
          <div className=" flex space-x-2 ">
            <span className=" bg-gray-300 h-10 w-[80px] rounded-md"></span>
            <span className=" bg-gray-300 h-10 w-[80px] rounded-md"></span>
          </div>
        </div>
        <div className=" flex justify-between items-center space-x-4  w-[500px] h-12 p-2 mx-auto shadow-md bg-gray-100 rounded-md">
          <span className=" font-semibold text-xl bg-gray-300 h-4 w-full rounded-md"></span>
          <div className=" flex space-x-2 ">
            <span className=" bg-gray-300 h-10 w-[80px] rounded-md"></span>
            <span className=" bg-gray-300 h-10 w-[80px] rounded-md"></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoSkeleton;
