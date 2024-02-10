import React, { useMemo } from 'react'
import { useStateValue } from '../context/stateProvider';
import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import TableSupplierbills from '../components/tablemodels/TableSupplierbills';
import Goback from '../components/Goback';
import isEqual from 'lodash/isEqual';

const ReturnBills = ({searchItem , search}) => {


    const {returnBills} = useStateValue()

    const uniqueDataInvoice = useMemo(() => {
      const unique = [];
  
      returnBills?.forEach(item => {
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
   }, [returnBills]);
  
  
    const handleSearch = uniqueDataInvoice.filter(item => 
       item.supplierName.includes(search) || item.invoice.includes(search))

  return (
    <div>
    <div className="flex justify-start items-start w-full gap-10">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 pl-8 h-screen flex flex-col">
          <h2 className='text-center text-4xl font-bold my-5 text-main'>فواتير المرتجعات</h2>
          <Search handleSearch={() => handleSearch} searchItem={searchItem} />
          <TableSupplierbills
              isSearched={handleSearch.length && search.length} 
              filteredItems={handleSearch} 
              bills={uniqueDataInvoice} 
              name='اسم العميل'
              checkInvoice={false}
              allbills={returnBills}
          />
          <Goback />
        </div>
    </div>
  </div>
  )
}

export default ReturnBills