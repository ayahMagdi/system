import { useState } from "react"
import ConfirmSignout from "../components/ConfirmSignout"
import Sidebar from "../components/Sidebar"
import EditSupplier from "../components/handlesuppliers/EditSupplier"

const EditSupplierPage = ({supplier , isEdited }) => {

  const [logOut , setLogOut] = useState(false)

  const confirmLogOut = () => {setLogOut(() => true)}

  const cancelLogOut = () => {setLogOut(() => false)}

  return (
     <div>
     <div className="flex justify-start items-start w-full gap-10">
         <div className="w-1/5">
           <Sidebar logOut={confirmLogOut} />
         </div>
         <div className="w-4/5 pl-8">
           <EditSupplier supplier={supplier} isEdited={isEdited} />
         </div>
         {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
     </div>
     </div>
  )
}

export default EditSupplierPage