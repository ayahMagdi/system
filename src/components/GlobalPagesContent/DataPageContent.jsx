import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import ConfirmSignout from '../ConfirmSignout'
import ConfirmationComponent from '../pagesComonents/ConfirmationComponent'
import Goback from '../Goback'
import Search from '../Search'
import Buttons from '../Buttons'
import PrintData from '../printdata/PrintData'

const DataPageContent = ({TableDataContent,data,name,addMsg,branch
    ,editMsg,search,searchItem,url,checkPrint,setData}) => {

    const [logOut , setLogOut] = useState(false)
    const [showPrint , setShowPrint] = useState(false)
    const [deletedMsg , setDeletedMsg] = useState(false)

    const handleSearch = data?.filter(client => 
        client && client.name && search && client.name.toString().includes(search.toString())
    )

    console.log(data)

    const isDeleted = (deletedMsg) => {
        setDeletedMsg(deletedMsg)
    }

    const confirmLogOut = () => {setLogOut(() => true)}
  
    const cancelLogOut = () => {setLogOut(() => false)}

    useEffect(() => {
        setTimeout(() => {
          deletedMsg && setDeletedMsg(false)
        } , 3000)
      })

  return (
    <div className="flex justify-start items-start w-full gap-10">
        <div className="w-1/5">
           <Sidebar logOut={confirmLogOut} />
        </div>
        <div className="w-4/5 pl-8 h-screen flex flex-col">
            <ConfirmationComponent
                addMsg={addMsg}
                name={name}
                editMsg={editMsg}
                deletedMsg={deletedMsg}
            />
           <Buttons branch={branch} mr={'my-5'} title={name} handlePrint={() => setShowPrint(true)} urlAdd={url} />
           <Search handleSearch={() => handleSearch} searchItem={searchItem} placeholder='ابحث بالاسم' />
           <TableDataContent 
                data={data}
                // setData={setData}
                checkSearch={search?.length}
                isSearched={handleSearch?.length && search?.length} 
                filteredItems={handleSearch} 
                isDeleted={isDeleted} 
            />
            {showPrint && <PrintData data={data} show={checkPrint} handleClose={() => setShowPrint(false)} />}
            <Goback />
        </div>
        {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
    </div>
  )
}

export default DataPageContent