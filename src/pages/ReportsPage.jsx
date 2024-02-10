import React, { useEffect, useState } from 'react'
import ConfirmSignout from '../components/ConfirmSignout'
import Sidebar from '../components/Sidebar'
import Goback from '../components/Goback'
import { useStateValue } from '../context/stateProvider'
import { isEqual } from 'lodash'
import TableReports from '../components/tablemodels/TableReports'
import Reports from '../components/handleinvoices/Reports'

const ReportsPage = () => {

    const {inwardBills , outwardBills ,items,stores} = useStateValue()

    const [logOut , setLogOut] = useState(false)

    const confirmLogOut = () => {setLogOut(() => true)}
  
    const cancelLogOut = () => {setLogOut(() => false)}

    const collectData = [...inwardBills , ...outwardBills]

    const collectDataWithType = collectData?.map(e => ({...e ,type: e.supplierName ? 'purchase' : 'sale'}))

    const getCodes = []
    collectDataWithType.map(e => getCodes.push({value: e.itemCode , label: e.itemCode}))
    let uniqeCodes = new Map()
    for (let code of getCodes) {uniqeCodes.set(code['value'] , code)}
    let setCodes = [...uniqeCodes.values()]

    const getNames = []
    collectDataWithType.map(e => getNames.push({value: e.itemName , label: e.itemName}))
    let uniqueNames = new Map()
    for (let name of getNames) {uniqueNames.set(name['value'] , name)}
    let setNames = [...uniqueNames.values()]

    const setType = [{value: 'purchase' , label: 'مشتريات'},{value: 'sale' , label: 'مييعات'}]

    const [selectedValues , setSelectedValues] = useState(
        {
          filtercodes: null,
          filternames: null,
          filteractions: null
        }
      )
      
      const handleSelectChange = (value, name) => {
        if (name === 'filtercodes') {
          const selectedCode = value;
          const matchedName = items.find((item) => item.code === selectedCode?.value)?.name;
          const selectedName = matchedName ? { value: matchedName, label: matchedName } : null;
      
          setSelectedValues((prevValues) => ({
            ...prevValues,
            [name]: selectedCode,
            filternames: selectedName,
          }));
        } else if (name === 'filternames') {
          const selectedName = value;
          const matchedCode = items.find((item) => item.name === selectedName?.value)?.code;
          const selectedCode = matchedCode ? { value: matchedCode, label: matchedCode } : null;
      
          setSelectedValues((prevValues) => ({
            ...prevValues,
            [name]: selectedName,
            filtercodes: selectedCode,
          }));
        } else {
          setSelectedValues((prevValues) => ({
            ...prevValues,
            [name]: value,
          }));
        }
      };

      const [filtrationArry , setFiltrationArry] = useState()

      const filterData = () => {
        const filteredArray = collectDataWithType.filter((item) => {
          return (
            (selectedValues.filteractions === null || isEqual(selectedValues.filteractions?.value, item.type )) && 
            (selectedValues.filtercodes === null || isEqual(selectedValues.filtercodes?.value, item.itemCode))
            // (selectedValues.filternames === null || isEqual(selectedValues.filternames?.value, item.itemName)) 
          );
        });

        setFiltrationArry(filteredArray);
      };

  
       const [matched , setMatched] = useState(true)
  
      const [filter , setFilter] = useState(false)
  
      const handleSubmit = (e) => {
          e.preventDefault() 
          if(matched && selectedValues.filteractions || selectedValues.filtercodes || selectedValues.filternames) {
              setFilter(true)
              filterData()
          }
      }
    
      const handlecancel = () => {
        setFilter(false)
        setMatched(true)
        setSelectedValues({
          filteractions: null,
          filtercodes: null,
          filternames: null
        })
      }
  
      useEffect(() => {
        const checkSelectedArray =
          !selectedValues.filteractions &&
          !selectedValues.filtercodes &&
          !selectedValues.filternames;
      
        const checkCodeAndName =
          selectedValues.filternames !== null &&
          selectedValues.filtercodes !== null &&
          items.find(item => item.code === selectedValues.filtercodes?.value);
      
        const matchNameWithCode =
          checkCodeAndName &&
          checkCodeAndName.name === selectedValues.filternames?.value;
  
          const conditionsMet =
          selectedValues.filternames === null ||
          selectedValues.filtercodes === null ||
          matchNameWithCode;
  
        setMatched(conditionsMet);
      
        if (checkSelectedArray || !conditionsMet) {
          setFiltrationArry([]);
          setFilter(false)
        }
     
  
      }, [selectedValues]);

      const qty_in = filtrationArry && stores?.find(e => filtrationArry[0]?.itemCode == e.code)?.avlqty || 0
      const qty_out = filtrationArry && stores?.find(e => filtrationArry[0]?.itemCode == e.code)?.soldqty || 0
      const qty_avl = parseInt(qty_in) - parseInt(qty_out) || 0

  return (
    <div>
    <div className="flex justify-start items-start w-full gap-10">
        <div className="w-1/5">
          <Sidebar logOut={confirmLogOut} />
        </div>
        <div className="w-4/5 pl-8 h-screen flex flex-col">
          <Reports
            handlecancel={handlecancel} 
            handleChangeCodes={(value) => handleSelectChange(value, 'filtercodes')}
            handleChangeNames={(value) => handleSelectChange(value, 'filternames')}
            handleChangeActions={(value) => handleSelectChange(value, 'filteractions')}
            codeoptions={setCodes}
            nameoptions={setNames}
            actionoptions={setType}
            handleSubmit={handleSubmit}
            codeval={selectedValues.filtercodes}
            nameval={selectedValues.filternames}
            actionval={selectedValues.filteractions}
        />
        <TableReports dataList={filtrationArry !== null && matched && filter ? filtrationArry : collectDataWithType} />
        {filtrationArry !== null && matched && filter && 
            <div className='border p-2 w-2/8 mr-auto grid grid-cols-3 items-center text-center rounded-md border-main'>
                <div className='border-l p-2 text-sm font-bold border-main'> الوارد : <span className='text-main font-extrabold'>{qty_in}</span></div>
                <div className='border-l p-2 text-sm font-bold border-main'> الصادر : <span className='text-main font-extrabold'>{qty_out}</span></div>
                <div className='p-2 text-sm font-bold'> المتاح : <span className='text-main font-extrabold'>{qty_avl}</span></div>
            </div>
          }
          <Goback />
        </div>
        {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
    </div>
  </div>
  )
}

export default ReportsPage