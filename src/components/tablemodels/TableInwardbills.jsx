
const TableInwardbills = ({invoicesList,code,name,height}) => {
    
  return (
    <div className={`mb-6 mx-auto w-full border shadow overflow-y-auto`}>
        <table className="table-auto w-full text-center" style={{borderCollapse: 'collapse'}}>
            <thead className="sticky top-0 bg-main text-white border-b">
                <tr className='border-b border-slate-300'>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>رقم الفاتورة</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>التاريخ</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>{code}</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>{name}</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>كود المنتج</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>اسم المنتج</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>الوحدة</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>الكمية</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>السعر</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>الاجمالي</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>اجمالي الفاتورة</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>نسبة الخصم</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>الاجمالي بعد الخصم</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>تنزيل</th>
                    <th scope="col" className="px-1 py-4 text-sm font-bold" style={{border: '1px solid #00000024'}}>باقي الحساب</th>
                </tr>
            </thead>
            <tbody>
            {invoicesList?.map((e, rowIndex) => (
                    <tr className='border-b border-slate-300' key={rowIndex}>
                        {e.invoice.rowSpan ? (
                            <td rowSpan={e.invoice.rowSpan} className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.invoice.title}</td>
                        ) : ''}
                        {e.invoice.rowSpan ? (
                            <td rowSpan={e.invoice.rowSpan} className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.date}</td>
                        ) : ''}
                        {e.invoice.rowSpan ? (
                            <td rowSpan={e.invoice.rowSpan} className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.supplierCode}</td>
                        ) : ''}
                        {e.invoice.rowSpan ? (
                            <td rowSpan={e.invoice.rowSpan} className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.supplierName || e.clientName}</td>
                        ) : ''}
                        <td className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.itemCode}</td>
                        <td className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.itemName}</td>
                        <td className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.unit}</td>
                        <td className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.qty}</td>
                        <td className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.price}</td>
                        <td className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.total}</td>
                        {e.invoice.rowSpan ? (
                            <td rowSpan={e.invoice.rowSpan} className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.totalbill}</td>
                        ) : ''}
                        {e.invoice.rowSpan ? (
                            <td rowSpan={e.invoice.rowSpan} className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.discount || 0}</td>
                        ) : ''}
                        {e.invoice.rowSpan ? (
                            <td rowSpan={e.invoice.rowSpan} className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.totalwd}</td>
                        ) : ''}
                        {e.invoice.rowSpan ? (
                            <td rowSpan={e.invoice.rowSpan} className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.reduction || 0}</td>
                        ) : ''}
                        {e.invoice.rowSpan ? (
                            <td rowSpan={e.invoice.rowSpan} className="p-2 text-sm" style={{border: '1px solid #00000024'}}>{e.remaining}</td>
                        ) : ''}
                    </tr>
                    )
                )}
            </tbody>
        </table> 
    </div>
  )
}

export default TableInwardbills