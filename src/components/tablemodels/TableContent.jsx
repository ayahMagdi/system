import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStateValue } from '../../context/stateProvider';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import ConfirmDelete from '../ConfirmDelete';
import GlobalTableHead from '../GlobalTableModel/GlobalTableHead';
import GlobalTableBody from '../GlobalTableModel/GlobalTableBody';

const TableContent = ({getRecord , filteredItems ,isSearched , isDeleted,checkSearch}) => {

    const {items} = useStateValue();
    const [show , setShow] = useState(false)
    const [code ,setCode] = useState(null)
    const [input ,setInput] = useState(null)
    const [err ,setErr] = useState(false)
    const [noItems ,setNoItems] = useState(false)
    const navigate = useNavigate();

    const tableHead=['كود المنتج','اسم المنتج','الوحدة','سعر الداخل','سعر الخارج','تعديل','حذف']
    const specificProperties = ['code', 'name', 'unit','income','outcome'];
    const columns = specificProperties.filter((propertyName) =>
       items?.some((item) => item.hasOwnProperty(propertyName))
     );   

    const {deleteItem} = useStateValue()

    const handlePopup = (e) => {
        setShow(true)
        setCode(e)
    }
    const handleDelete = (e) => {
        deleteItem(e)
        setShow(false)
        isDeleted(true)
    }
    
    const handleEdit = (e) => {
        getRecord(e)
        navigate(`/homepage/allproducts/editproduct/${e.code}`)
        localStorage.setItem('branch' , 'editItem')

    }

    const cancelDelete = () => {
        setErr(false)
        setShow(false)
    } 

    useEffect(() => {

       const checkItems = filteredItems?.length > 0 ? setNoItems(false) : setNoItems(true)

    }, [filteredItems])

    useEffect(() => {
       input === '' && setErr(false) 
    } ,[input])

  return (
    <div className={`my-5 mx-auto w-full border shadow overflow-y-auto`}>
        <table className="table-auto w-full text-center border h-fit" style={{borderCollapse: 'collapse'}}>
             <GlobalTableHead data={tableHead} />
             <GlobalTableBody 
                noItems={noItems}
                checkSearch={checkSearch}
                isSearched={isSearched}
                filteredItems={filteredItems}
                data={items}
                handleEdit={handleEdit}
                handlePopup={handlePopup}
                columns={columns}
            />
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

export default TableContent