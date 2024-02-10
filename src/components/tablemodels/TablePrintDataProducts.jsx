import React from 'react'

const TablePrintDataProducts = ({data , show}) => {

  return (
    <div className={`mb-5 mx-auto w-full border shadow overflow-y-auto print:overflow-visible print:h-auto`}>
    <table className="table-auto w-full text-center" style={{borderCollapse: 'collapse'}}>
           <thead className="sticky top-0 bg-black text-white border-b">
                 <tr className='border-b border-slate-300'>
                    <th scope="col" style={{border: '1px solid #00000024'}} className="px-5 py-2">{show === 'suppliers' ? 'كود المورد' : show === 'clients' ? 'كود العميل' : show === 'expenses' ? 'التاريخ' : 'كود المنتج'}</th>
                    <th scope="col" style={{border: '1px solid #00000024'}} className="px-5 py-2">{show === 'suppliers' ? 'اسم المورد' : show === 'clients' ? 'اسم العميل' : show === 'expenses' ? 'قيمة المصروف' : 'اسم المنتج'}</th>
                    <th scope="col" style={{border: '1px solid #00000024'}} className="px-5 py-2">{show === 'suppliers' || show === 'clients' ? 'رقم الهاتف' : show === 'expenses' ? 'سبب الصرف' : 'الوحدة'}</th>
                    <th scope="col" style={{border: '1px solid #00000024'}} className={`${show === 'suppliers' || show === 'expenses' ? 'hidden px-5 py-2 ' : 'px-5 py-2 '}`}>{show === 'clients' ? 'العنوان' : 'السعر'}</th>
                 </tr>
           </thead>
           <tbody>
                 {data?.map((e , i) => (
                 <tr className='border-b border-slate-300 even:bg-neutral-100' key={i}>
                    <td className="px-5 py-1" style={{border: '1px solid #00000024'}}>{`${show === 'expenses' ? e.date : e.code || e.id }`}</td>
                    <td className="px-5 py-1" style={{border: '1px solid #00000024'}}>{e.name || e.total}</td>
                    <td className="px-5 py-1" style={{border: '1px solid #00000024'}}>{e.unit || e.phone || e.reason}</td>
                    <td className={`${show === 'suppliers' || show === 'expenses' ? 'hidden px-5 py-1' : 'px-5 py-1'}`} style={{border: '1px solid #00000024'}}>{e.outcome || e.address}</td>
                </tr>
                 ))}
           </tbody>
    </table>
    </div>
  )
}

export default TablePrintDataProducts