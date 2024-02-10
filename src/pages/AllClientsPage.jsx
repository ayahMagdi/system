import Navbar from '../components/Navbar'
import Buttons from '../components/Buttons'
import TableClientsContent from '../components/tablemodels/TableClientsContent'
import { useStateValue } from '../context/stateProvider'
import { useEffect, useState } from 'react'
import SuccessMsg from '../components/SuccessMsg'
import Sidebar from '../components/Sidebar'
import Search from '../components/Search'
import ConfirmSignout from '../components/ConfirmSignout'
import Goback from '../components/Goback'
import PrintData from '../components/printdata/PrintData'

const AllClientsPage = ({getClient , editedClients , searchItem , search , addMsg ,editMsg}) => {

  const {clients} = useStateValue()
  const [logOut , setLogOut] = useState(false)
  const [showPrint , setShowPrint] = useState(false)

  const confirmLogOut = () => {setLogOut(() => true)}

  const cancelLogOut = () => {setLogOut(() => false)}

  const handleSearch = clients.filter(client => 
    client.name.includes(search)
  )
  const [deletedMsg , setDeletedMsg] = useState(false)
  const [branch , setBranch] = useState('addClient')

  const isDeleted = (deletedMsg) => {
    setDeletedMsg(deletedMsg)
  }

  useEffect(() => {
    setTimeout(() => {
      deletedMsg && setDeletedMsg(false)
    } , 3000)
  })

  return (
    <div>
       <div className="flex justify-start items-start w-full gap-10">
          <div className="w-1/5">
            <Sidebar logOut={confirmLogOut} />
          </div>
          <div className="w-4/5 pl-8 h-screen flex flex-col">
          {addMsg ? <SuccessMsg title='تمت اضافة العميل' /> 
              : deletedMsg ? <SuccessMsg title='تم حذف العميل' /> 
              : editMsg ? <SuccessMsg title='تم تعديل العميل' /> 
              : ''
            }
            <Buttons
                branch={branch}
                mr={'my-5'}
                title='عميل' 
                urlAdd={'allclients/addClient'}
                handlePrint={() => setShowPrint(true)} 
            />
            <Search handleSearch={() => handleSearch} searchItem={searchItem} placeholder='ابحث بالاسم' />
            <TableClientsContent 
                isSearched={handleSearch.length && search.length} 
                filteredItems={handleSearch} 
                editedClients={editedClients} 
                getClient={getClient} 
                isDeleted={isDeleted} 
                checkSearch={search?.length}
            />
            {showPrint && <PrintData data={clients} show='clients' handleClose={() => setShowPrint(false)} />}
            <Goback />
          </div>
          {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
        </div>
    </div>
  )
}

export default AllClientsPage