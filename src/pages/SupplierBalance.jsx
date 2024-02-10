import { useState } from 'react'
import ConfirmSignout from '../components/ConfirmSignout'
import Goback from '../components/Goback'
import Navbar from '../components/Navbar'
import Search from '../components/Search'
import Sidebar from '../components/Sidebar'
import TableBalance from '../components/tablemodels/TableBalance'
import { useStateValue } from '../context/stateProvider'

const SupplierBalance = ({search , searchItem ,getRecordReduction}) => {

    const {supplierBalance} = useStateValue()
    const [logOut , setLogOut] = useState(false)

    const confirmLogOut = () => {setLogOut(() => true)}
  
    const cancelLogOut = () => {setLogOut(() => false)}

    const handleSearch = supplierBalance?.filter(item =>
       search && item.code.includes(search) 
     )

     const totalbalance = supplierBalance.map((e) => parseInt(e.remaining)).reduce((a, b)=> a+b, 0);

  return (
   <div>
    <div className="flex justify-start items-start w-full gap-10">
        <div className="w-1/5">
          <Sidebar logOut={confirmLogOut} />
        </div>
        <div className="w-4/5 pl-8 h-screen flex flex-col">
        <h2 className='text-center text-4xl font-bold my-5 text-main'>رصيد الموردين</h2>
        <Search 
           handleSearch={() => handleSearch} 
           searchItem={searchItem} 
           placeholder='ابحث بالكود'
        />
        <TableBalance 
            nameText='اسم المورد'
            codeText='كود المورد'
            supplierList={search && handleSearch.length === 0 ? [] : supplierBalance} 
            isSearched={handleSearch.length && search.length} 
            filteredItems={handleSearch} 
            totalbalance={totalbalance}
            branch='suppliersBills'
            url='/homepage/Accountstatements/supplierbalance/supplierreduction'
            getRecordReduction={getRecordReduction}
            checkSearch={search?.length}
        />
        <div className='text-center mb-5'>
           <h3>اجمالي باقي الحساب</h3>
           <div className='border w-full p-4 rounded-md border-main mt-3 font-bold text-lg'>{totalbalance}</div>
       </div>
        <Goback />
        </div>
        {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
    </div>
   </div>
  )
}

export default SupplierBalance