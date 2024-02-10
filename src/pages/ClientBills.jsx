import { useMemo, useState } from "react"
import TableSupplierbills from "../components/tablemodels/TableSupplierbills"
import { useStateValue } from "../context/stateProvider"
import isEqual from 'lodash/isEqual';
import Goback from "../components/Goback";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import ConfirmSignout from "../components/ConfirmSignout";

const ClientBills = ({searchItem , search}) => {
 
    const {outwardBills} = useStateValue()
    const [logOut , setLogOut] = useState(false)

    const confirmLogOut = () => {setLogOut(() => true)}
    const cancelLogOut = () => {setLogOut(() => false)}

    const uniqueDataInvoice = useMemo(() => {
      const unique = [];
  
      outwardBills.forEach(item => {
      let exists = false;
      
      unique.forEach(u => {
        if(isEqual(u.invoice, item.invoice)) {
          exists = true;
        }
      });
  
      if(!exists) {
        unique.push(item);
      }
    });
  
    return unique;
    }, [outwardBills]);
  
  
    const handleSearch = uniqueDataInvoice.filter(item => 
      search && item?.supplierName.includes(search) || item?.invoice.toString().includes(search.toString())
    )

  return (
    <div>
    <div className="flex justify-start items-start w-full gap-10">
      <div className="w-1/5">
         <Sidebar logOut={confirmLogOut} />
      </div>
      <div className="w-4/5 pl-8 h-screen flex flex-col">
        <h2 className='text-center text-4xl font-bold my-5 text-main'>فواتير العملاء</h2>
        <Search handleSearch={() => handleSearch} searchItem={searchItem} placeholder='ابحث بالاسم او الكود' />
        <TableSupplierbills 
            isSearched={handleSearch.length && search.length} 
            filteredItems={handleSearch} 
            bills={uniqueDataInvoice}
            name='اسم العميل'
            checkInvoice={true}
            allbills={outwardBills}
        />
        <Goback />
      </div>
      {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
    </div>
    </div>
  )
}

export default ClientBills