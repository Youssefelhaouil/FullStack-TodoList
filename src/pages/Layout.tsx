import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"


function Layout() {
  return (
    <>
    <div className="flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>

    </>
  )
}

export default Layout