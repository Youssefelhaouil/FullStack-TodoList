import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import ProtectedRoute from "../Components/Auth/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";
import { userDatas } from "../Components/Auth/LocalStorageKey";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index
          element={
            <ProtectedRoute isAllowed={userDatas?.jwt} redirectPath="/login" data={userDatas}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!userDatas?.jwt} redirectPath="/" data={userDatas}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="register" element={
            <ProtectedRoute isAllowed={!userDatas?.jwt} redirectPath={"/"} data={userDatas}>
              <Register />
            </ProtectedRoute>
          } />
      </Route>
      <Route path="*" element={<PageNotFound />}/>
    </>
  ),
  
);
export default router;
