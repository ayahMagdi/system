import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Buttons from '../components/Buttons'
import TableSuppliersContent from '../components/tablemodels/TableSuppliersContent'
import { useStateValue } from '../context/stateProvider'
import SuccessMsg from '../components/SuccessMsg'
import Sidebar from '../components/Sidebar'
import Search from '../components/Search'
import Goback from '../components/Goback'
import ConfirmSignout from '../components/ConfirmSignout'
import PrintData from '../components/printdata/PrintData'

const AllsuppliersPage = ({editedSuppliers , getSupplier , searchItem , search , addMsg ,editMsg}) => {

  const {suppliers} = useStateValue()
  const [logOut , setLogOut] = useState(false)
  const [showPrint , setShowPrint] = useState(false)

  const confirmLogOut = () => {setLogOut(() => true)}

  const cancelLogOut = () => {setLogOut(() => false)}

  const handleSearch = suppliers.filter(item => 
     item.name.includes(search)
  )
  const [deletedMsg , setDeletedMsg] = useState(false)
  const [branch , setBranch] = useState('addSupplier')

  const isDeleted = (deletedMsg) => {
    setDeletedMsg(deletedMsg)
  }

  useEffect(() => {
    setTimeout(() => {
      deletedMsg && setDeletedMsg(false)
    } , 2000)
  })

  return (
    <div>
    <div className="flex justify-start items-start w-full gap-10">
      <div className="w-1/5">
         <Sidebar logOut={confirmLogOut} />
      </div>
      <div className="w-4/5 pl-8 h-screen flex flex-col">
         {addMsg ? <SuccessMsg title='تمت اضافة المورد' /> 
             : deletedMsg ? <SuccessMsg title='تم حذف المورد' /> 
             : editMsg ? <SuccessMsg title='تم تعديل المورد' /> 
             : ''
           }
         <Buttons 
              branch={branch}
              mr={'my-5'}
              title='مورد' 
              urlAdd={'allsuppliers/addSupplier'} 
              handlePrint={() => setShowPrint(true)}
        />
        <Search handleSearch={() => handleSearch} searchItem={searchItem} placeholder='ابحث بالاسم' />
        <TableSuppliersContent 
           isSearched={handleSearch.length && search.length} 
           filteredItems={handleSearch} 
           editedSuppliers={editedSuppliers} 
           getSupplier={getSupplier} 
           isDeleted={isDeleted} 
           checkSearch={search?.length}
        />
        {showPrint && <PrintData data={suppliers} show='suppliers' handleClose={() => setShowPrint(false)} />}
        <Goback />
      </div>
      {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
    </div>
  </div>
  )
}

export default AllsuppliersPage