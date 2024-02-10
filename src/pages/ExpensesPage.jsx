import React, { useEffect, useState } from 'react'
import FormInventory from '../components/formmodels/FormInventory'
import Buttons from '../components/Buttons'
import { useStateValue } from '../context/stateProvider'
import moment from 'moment'
import TableExpenses from '../components/tablemodels/TableExpenses'
import Sidebar from '../components/Sidebar'
import PrintData from '../components/printdata/PrintData'
import Goback from '../components/Goback'
import ConfirmSignout from '../components/ConfirmSignout'
import SuccessMsg from '../components/SuccessMsg'

const ExpensesPage = ({addMsg,editMsg ,getRecord , editedExpenses }) => {

  const {expenses} = useStateValue()
  const [branch , setBranch] = useState('addexpense')
  const [logOut , setLogOut] = useState(false)
  const [showPrint , setShowPrint] = useState(false)
  const [deletedMsg , setDeletedMsg] = useState(false)

  const confirmLogOut = () => {setLogOut(() => true)}

  const cancelLogOut = () => {setLogOut(() => false)}

  const setdates = [];
  expenses?.forEach((data) => {setdates.push({value: data.date, label: data.date})})
  let mapindates = new Map();
  for (let date of setdates) {mapindates.set(date["value"], date)}
  let iteratorinvoices = mapindates.values();
  let getdates = [...iteratorinvoices];

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filter , setFilter] = useState(false)

  let getItemsTotal = []

  function getDates(startDate, endDate) {
    const dateArray = [];
    let currentDate = moment(startDate, 'M/DD/YYYY').startOf('day');
    const formattedEndDate = moment(endDate, 'M/DD/YYYY').startOf('day');

    while (currentDate <= formattedEndDate) {
      dateArray.push(new Date(currentDate).toLocaleDateString());
      currentDate = moment(currentDate).add(1, 'days');
    }
  
    return dateArray;
  }

  const datesBetween = getDates(startDate?.value, endDate?.value);

  const getTotal = expenses?.filter(expens => {
    const filtered = datesBetween?.filter(date => expens.date === date);
    if (filtered && filtered.length > 0) {
      return true;
    }
    return false;
  });

  getItemsTotal = getTotal || [];

  useEffect(() => {

    const handleFilter = startDate !== null && endDate !== null ?
                setFilter(true) : setFilter(false)

  } , [startDate , endDate , getItemsTotal])

  const isDeleted = (deletedMsg) => {
    setDeletedMsg(deletedMsg)
  }

  useEffect(() => {
    setTimeout(() => {
      deletedMsg && setDeletedMsg(false)
    } , 3000)
  })

  const calcExpenses = getItemsTotal.map((e) => parseInt(e.total)).reduce((a, b)=> a+b, 0);

  return (
    <div>
      <div className="flex justify-start items-start w-full gap-10">
          <div className="w-1/5">
            <Sidebar logOut={confirmLogOut} />
          </div>
          <div className="w-4/5 pl-8 h-screen flex flex-col">
            <h2 className='text-center text-3xl mt-5 mb-3 font-bold text-main'>المصاريف</h2>
            {addMsg ? <SuccessMsg title='تمت اضافة المصروف' /> 
              : deletedMsg ? <SuccessMsg title='تم حذف المصروف' /> 
              : editMsg ? <SuccessMsg title='تم تعديل المصروف' /> 
              : ''
            }
            <Buttons
                branch={branch}
                title='مصروف' 
                handlePrint={() => setShowPrint(true)}
                urlAdd={'expensespage/addexpenses'}
            />
            <FormInventory 
                dateoptions={getdates} 
                startDateval={startDate}
                endDateval={endDate}
                totalVal={calcExpenses || ''}
                handleChangeStartDate={(selectedOption) => setStartDate(selectedOption)}
                handleChangeEndDate={(selectedOption) => setEndDate(selectedOption)}
            />
            <TableExpenses 
                expensesList={filter ? getItemsTotal : filter && getItemsTotal.length === 0 ? [] : expenses} 
                isDeleted={isDeleted}
                getRecord={getRecord} 
            />
            {showPrint && <PrintData
                data={expenses} 
                show='expenses'
                handleClose={() => setShowPrint(false)}
             />
            }
             <Goback />
          </div>
          {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
      </div>
    </div>
  )
}

export default ExpensesPage