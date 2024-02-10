import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStateValue } from '../../context/stateProvider';
import ConfirmDelete from '../ConfirmDelete';
import GlobalTableHead from '../GlobalTableModel/GlobalTableHead';
import GlobalTableBody from '../GlobalTableModel/GlobalTableBody';

const TableClientsContent = ({getClient , filteredItems , isSearched , isDeleted ,checkSearch}) => {

    const {clients,deleteClient} = useStateValue();
    const [show , setShow] = useState(false)
    const [code ,setCode] = useState(null)
    const [input ,setInput] = useState(null)
    const [err ,setErr] = useState(false)
    const [noItems ,setNoItems] = useState(false)
    const navigate = useNavigate();

    const tableHead=['كود العميل','اسم العميل','رقم الموبايل','العنوان','تعديل','حذف']
    const specificProperties = ['code', 'name', 'phone','address'];

    const columns = specificProperties?.filter((propertyName) =>
      clients?.some((client) => client.hasOwnProperty(propertyName))
    ); 

    const handlePopup = (e) => {
        setShow(true)
        setCode(e)
    }
    const handleDelete = (e) => {
        deleteClient(e)
        setShow(false)
        isDeleted(true)
    }
    const handleEdit = (e) => {
        getClient(e)
        navigate(`/homepage/allclients/editClient/${e.code}`)
        localStorage.setItem('branch' , 'editClient')
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
                data={clients}
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

export default TableClientsContent