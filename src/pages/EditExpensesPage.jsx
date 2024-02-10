import React, { useState } from 'react'
import ConfirmSignout from '../components/ConfirmSignout'
import Sidebar from '../components/Sidebar'
import EditExpenses from '../components/handleexpenses/EditExpenses'

const EditExpensesPage = ({expense,isEdited}) => {

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
          <EditExpenses expense={expense} isEdited={isEdited} />
        </div>
        {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
    </div>
  </div>
  )
}

export default EditExpensesPage