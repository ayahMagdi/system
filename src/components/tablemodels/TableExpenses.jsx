import { useNavigate } from "react-router-dom"
import ConfirmDelete from "../ConfirmDelete"
import GlobalTableBody from "../GlobalTableModel/GlobalTableBody"
import GlobalTableHead from "../GlobalTableModel/GlobalTableHead"
import { useEffect, useState } from "react"
import { useStateValue } from "../../context/stateProvider"

const TableExpenses = ({expensesList ,getRecord ,isDeleted}) => {
    
    const [show , setShow] = useState(false)
    const [code ,setCode] = useState(null)
    const [input ,setInput] = useState(null)
    const [err ,setErr] = useState(false)
    const navigate = useNavigate();
    const {deleteExpenses} = useStateValue()
    
    const tableHead=['التاريخ','قيمة المصروف','سبب الصرف','تعديل','حذف']
    const specificProperties = ['date', 'total', 'reason'];

    const columns = specificProperties.filter((propertyName) =>
      expensesList.some((expense) => expense.hasOwnProperty(propertyName))
    ); 

    
    const handlePopup = (e) => {
        setShow(true)
        setCode(e)
    }

    const handleEdit = (e) => {
        getRecord(e)
        navigate(`/homepage/expensespage/editexpenses/${e.code}`)
        localStorage.setItem('branch' , 'editexpense')
    }

    const handleDelete = (e) => {
        deleteExpenses(e)
        setShow(false)
        isDeleted(true)
    };

      const cancelDelete = () => {
        setErr(false)
        setShow(false)
      }

      useEffect(() => {
        input === '' && setErr(false) 
     } ,[input])

  return (
    <div className={`mb-5 mx-auto w-full border shadow overflow-y-auto`}>
        <table className="table-auto w-full text-center border h-fit" style={{borderCollapse: 'collapse'}}>
        <GlobalTableHead data={tableHead} />
            <GlobalTableBody
                data={expensesList}
                handleEdit={handleEdit}
                handlePopup={handlePopup}
                columns={columns}
            />
            {/* <thead className="sticky top-0 bg-main text-white border-b">
                <tr className='border-b border-slate-300'>
                    <th scope="col" className="px-6 py-3" style={{border: '1px solid #00000024'}}>التاريخ</th>
                    <th scope="col" className="px-6 py-3" style={{border: '1px solid #00000024'}}>قيمة المصروف</th>
                    <th scope="col" className="px-6 py-3" style={{border: '1px solid #00000024'}}>سبب الصرف</th>
                </tr>
            </thead>
            <tbody>
                {expensesList?.map((e , i) => (
                    <tr className='border-b border-slate-300 even:bg-tablerow' key={i}>
                        <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.date}</td>
                        <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.total}</td>
                        <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.reason}</td>
                    </tr>
                ))}
            </tbody> */}
        </table>
        {show && <ConfirmDelete
                    err={err}
                    handleChange={(e) => setInput(e.target.value)}
                    checkDelete={parseInt(input) === parseInt(100100) ? () => handleDelete(code) : () => setErr(true)}
                    cancelDelete={() => cancelDelete()}
        />}
    </div>
  )
}

export default TableExpenses