import { Link, useLocation } from "react-router-dom";
import Button from "./Ui/Button";
import { userDatas,storageKey } from "./Auth/LocalStorageKey";

interface IProps {}

function Navbar({}: IProps) {
  
  const { pathname } = useLocation();

  const onLogOut = () => {
    localStorage.removeItem(storageKey);

    setTimeout(() => {
      location.replace(pathname);
    }, 1000);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Link to={""} className="font-bold text-xl text-gray-700">
          You<span className="text-indigo-700">Do</span>
        </Link>
        {userDatas ? (
          <Button
            onClick={onLogOut}
            width="w-fit"
            classname="bg-indigo-700 hover:bg-indigo-500 px-4"
          >
            Log Out
          </Button>
        ) : (
          <div className="flex space-x-1">
            <Link to={"register"}>
              <Button
                width="w-fit"
                classname="bg-gray-300 hover:bg-gray-400 px-4"
              >
                Register
              </Button>
            </Link>
            <Link to={"login"}>
              <Button
                width="w-fit"
                classname="bg-indigo-600 hover:bg-indigo-400"
              >
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
