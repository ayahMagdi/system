import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStateValue } from '../../context/stateProvider';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import ConfirmDelete from '../ConfirmDelete';
import GlobalTableBody from '../GlobalTableModel/GlobalTableBody';
import GlobalTableHead from '../GlobalTableModel/GlobalTableHead';

const TableSuppliersContent = ({getSupplier, filteredItems ,isSearched ,isDeleted ,checkSearch}) => {

    const {suppliers} = useStateValue();
    const [show , setShow] = useState(false)
    const [code ,setCode] = useState(null)
    const [input ,setInput] = useState(null)
    const [err ,setErr] = useState(false)
    const [noItems ,setNoItems] = useState(false)
    const navigate = useNavigate();

    const {deleteSupplier} = useStateValue()

    const tableHead=['كود المورد','اسم المورد','رقم الهاتف','تعديل','حذف']
    const specificProperties = ['code', 'name', 'phone'];

    const columns = specificProperties?.filter((propertyName) =>
      suppliers?.some((supplier) => supplier.hasOwnProperty(propertyName))
    ); 

    const handlePopup = (e) => {
        setShow(true)
        setCode(e)
    }
    const handleDelete = (e) => {
        deleteSupplier(e)
        setShow(false)
        isDeleted(true)
    }
    const handleEdit = (e) => {
        getSupplier(e)
        navigate(`/homepage/allsuppliers/editSupplier/${e.code}`)
        localStorage.setItem('branch' , 'editSupplier')
    }

    useEffect(() => {

        const checkItems = filteredItems?.length > 0 ? setNoItems(false) : setNoItems(true)
 
     }, [filteredItems])

     useEffect(() => {
        input === '' && setErr(false) 
     } ,[input])
 

  return (
    <div className={`my-5 mx-auto w-full border shadow overflow-y-auto`}>
        <table className="table-auto w-full text-center" style={{borderCollapse: 'collapse'}}>
            <GlobalTableHead data={tableHead} />
            <GlobalTableBody
                noItems={noItems}
                checkSearch={checkSearch}
                isSearched={isSearched}
                filteredItems={filteredItems}
                data={suppliers}
                handleEdit={handleEdit}
                handlePopup={handlePopup}
                columns={columns}
            />
        </table>
        {show && <ConfirmDelete  
        err={err}
        handleChange={(e) => setInput(e.target.value)}
        checkDelete={parseInt(input) === parseInt(100100) ? () => handleDelete(code) : () => setErr(true)}
        cancelDelete={() => setShow(false)}
        />}
    </div>
  )
}

export default TableSuppliersContent