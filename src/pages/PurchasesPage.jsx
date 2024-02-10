import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Purchases from '../components/handleinvoices/Purchases';
import ConfirmSignout from '../components/ConfirmSignout';

const PurchasesPage = () => {

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
            <Purchases />
          </div>
          {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
      </div>
    </div>
  )
}

export default PurchasesPage