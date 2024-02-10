const TablePrint = ({billPrint}) => {
  return (
     <div className={`mb-5 mx-auto w-full border shadow overflow-y-auto print:overflow-visible print:h-auto`}>
        <table className="table-auto w-full text-center" style={{borderCollapse: 'collapse'}}>
               <thead className="sticky top-0 bg-black text-white border-b">
                     <tr className='border-b border-slate-300'>
                        <th scope="col" style={{border: '1px solid #00000024'}} className="px-5 py-2">كود المنتج</th>
                        <th scope="col" style={{border: '1px solid #00000024'}} className="px-5 py-2">اسم المنتج</th>
                        <th scope="col" style={{border: '1px solid #00000024'}} className="px-5 py-2">الكمية</th>
                        <th scope="col" style={{border: '1px solid #00000024'}} className="px-5 py-2">الوحدة</th>
                        <th scope="col" style={{border: '1px solid #00000024'}} className="px-5 py-2">السعر</th>
                        <th scope="col" style={{border: '1px solid #00000024'}} className="px-5 py-2">الاجمالي</th>
                     </tr>
               </thead>
               <tbody>
                     {billPrint?.map((e , i) => (
                     <tr className='border-b border-slate-300 even:bg-neutral-100' key={i}>
                        <td className="px-5 py-1" style={{border: '1px solid #00000024'}}>{e.itemCode}</td>
                        <td className="px-5 py-1" style={{border: '1px solid #00000024'}}>{e.itemName}</td>
                        <td className="px-5 py-1" style={{border: '1px solid #00000024'}}>{e.qty}</td>
                        <td className="px-5 py-1" style={{border: '1px solid #00000024'}}>{e.unit}</td>
                        <td className="px-5 py-1" style={{border: '1px solid #00000024'}}>{e.price}</td>
                        <td className="px-5 py-1" style={{border: '1px solid #00000024'}}>{e.total}</td>
                     </tr>
                     ))}
               </tbody>
        </table>
      </div>
  )
}

export default TablePrint