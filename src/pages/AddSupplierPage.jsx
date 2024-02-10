import { useState } from "react"
import ConfirmSignout from "../components/ConfirmSignout"
import Sidebar from "../components/Sidebar"
import AddSupplier from "../components/handlesuppliers/AddSupplier"

const AddSupplierPage = ({isAdded}) => {

  const [logOut , setLogOut] = useState(false)

  const confirmLogOut = () => {setLogOut(() => true)}

  const cancelLogOut = () => {setLogOut(() => false)}

  return (
     <div className="flex justify-start items-start w-full gap-10">
       <div className="w-1/5">
          <Sidebar logOut={confirmLogOut} />
       </div>
       <div className="w-4/5 pl-8">
          <AddSupplier isAdded={isAdded} />
       </div>
       {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
     </div>
  )
}

export default AddSupplierPage