import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface IProps{
    isAllowed:boolean,
    children:ReactNode,
    redirectPath:string,
    data?:unknown


}

function ProtectedRoute({isAllowed,children,redirectPath,data}:IProps) {
  return (
    <>
    {isAllowed ? children :<Navigate to={redirectPath} state={data}/>}

    </>
  )
}

export default ProtectedRoute