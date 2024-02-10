import React from 'react'
import GlobalTableHead from '../GlobalTableModel/GlobalTableHead'

const TableReports = ({dataList}) => {

    const tableHead=['رقم الفاتورة','التاريخ','مالك الفاتورة','كود الصنف','اسم الصنف','نوع الحركة','الكمية الواردة','الكمية الصاردة']

    return (
      <div className={`mb-6 mx-auto w-full border shadow overflow-y-auto`}>
        <table className="table-auto w-full text-center" style={{ borderCollapse: 'collapse' }}>
            <GlobalTableHead data={tableHead} /> 
            <tbody> 
              {dataList?.map((e , i) => 
              (<tr className='border-b border-slate-300 even:bg-tablerow' key={i}> 
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.invoice}</td> 
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{new Date(e.date).toLocaleDateString()}</td> 
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{ e.supplierName || e.clientName}</td> 
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.itemCode}</td> 
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.itemName}</td> 
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.clientName ? 'مبيعات' :  'مشتريات'}</td> 
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.clientName ? 0 : e.qty}</td> 
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.clientName ? e.qty : 0}</td> 
                 </tr> )
              )} 
           </tbody>
        </table>
      </div>
    )
}

export default TableReports