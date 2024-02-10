import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

const GlobalTableBody = ({noItems,checkSearch,isSearched,filteredItems,data,handleEdit,handlePopup,columns}) => {

    const [dataList , setDataList] = useState([])

    useEffect(() => {
         isSearched ? setDataList(filteredItems) : setDataList(data)
    },[isSearched , data])

  return (
    <tbody className={noItems && checkSearch > 0 ? 'hidden' : 'visible'}>
    {dataList?.map(e => (
        <tr className='border-b border-slate-300 even:bg-tablerow' key={e.code}>
            {columns.map((column) => (
                <td
                    className="px-6 py-3"
                    style={{ border: '1px solid #00000024' }} 
                    key={column}>
                        {column === 'expenses_date' ? new Date(e[column]).toLocaleDateString() : e[column]}
                </td>
            ))}
            <td className="px-6 py-3 cursor-pointer" onClick={() => handleEdit(e)} style={{border: '1px solid #00000024'}}>
                <FontAwesomeIcon icon={faEdit} />
            </td>
            <td className="px-6 py-3 cursor-pointer" onClick={() => handlePopup(e.code === undefined ? e?.itemCode : e?.code)} style={{border: '1px solid #00000024'}}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </td>
        </tr>
    ))}
    </tbody>
  )
}

export default GlobalTableBody