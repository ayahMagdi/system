import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import ConfirmDelete from "../ConfirmDelete";
import GlobalTableHead from "../GlobalTableModel/GlobalTableHead";
import GlobalTableBody from "../GlobalTableModel/GlobalTableBody";

const TableInvoices = ({purchases , handleDelete ,deletCode , getRecord ,handleEdit}) => {

    const [show , setShow] = useState(false)
    const [code ,setCode] = useState(null)
    const [input ,setInput] = useState(null)
    const [err ,setErr] = useState(false)
    const tableHead=['كود المنتج','اسم المنتج','الوحدة','الكمية','السعر','الاجمالي','تعديل','حذف']
    const specificProperties = ['itemCode', 'itemName', 'unit','qty','price','total'];

    const columns = specificProperties.filter((propertyName) =>
      purchases?.some((client) => client.hasOwnProperty(propertyName))
    ); 

    const handlePopup = (e) => {
        setShow(true)
        setCode(e)
        deletCode(e)
    }

    const checkDelete = (e) => {
        handleDelete(e)
        setShow(false)
    }

    const checkEdit = (e) => {
        getRecord(e)
        handleEdit(e)
    }

    const cancelDelete = () => {
        setErr(false)
        setShow(false)
     }  

     useEffect(() => {
        input === '' && setErr(false) 
     } ,[input])

  return (
    <div className={`mt-5 mx-auto w-full border shadow overflow-y-auto`}>
        <table className="table-auto w-full text-center border h-fit" style={{borderCollapse: 'collapse'}}>
            <GlobalTableHead data={tableHead} />
            <GlobalTableBody
                data={purchases}
                handleEdit={checkEdit}
                handlePopup={handlePopup}
                columns={columns}
            />
        </table>
        {show && <ConfirmDelete  
           err={err}
           handleChange={(e) => setInput(e.target.value)}
           checkDelete={parseInt(input) === parseInt(100100) ? () => checkDelete(code) : () => setErr(true)}
           cancelDelete={() => cancelDelete()}
         />}
    </div>
  )
}

export default TableInvoices