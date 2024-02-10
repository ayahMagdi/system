import { useEffect, useState , useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faEye, faPrint } from "@fortawesome/free-solid-svg-icons"
import { useStateValue } from "../../context/stateProvider"
import { useReactToPrint } from 'react-to-print';
import PrintInvoice from "../handleinvoices/PrintInvoice";

const TableSupplierbills = ({allbills,filteredItems , isSearched , bills ,title ,name,checkInvoice}) => {

    const [noItems ,setNoItems] = useState(false)
    const [show ,setShow] = useState(false)
    const [showPrint ,setShowPrint] = useState(false)
    const [bill ,setBill] = useState(null)
    const [billPrint ,setBillPrint] = useState(null)
   //  const {inwardBills} = useStateValue()

    const printableRef = useRef();
    const handlePrintt = useReactToPrint({
      content: () => printableRef.current,
    });

    useEffect(() => {

        const checkItems = filteredItems?.length > 0 ? setNoItems(false) : setNoItems(true)
    
     }, [filteredItems])

     const handleShow = (e) => {
          setBill(allbills.filter(inward => parseInt(inward.invoice) === parseInt(e)))
          setShow(true)
      }
     const handlePrint = (e) => {
          setBillPrint(allbills.filter(inward => parseInt(inward.invoice) === parseInt(e)))
          setShowPrint(true)
      }


  return (
      <div className={`my-5 mx-auto w-full border shadow overflow-y-auto`}>
        <table className="table-auto w-full text-center border" style={{borderCollapse: 'collapse'}}>
         <thead className="sticky top-0 bg-main text-white border-b">
               <tr className='border-b border-slate-300'>
                  <th scope="col" style={{border: '1px solid #00000024'}} className="px-6 py-3">رقم الفاتورة</th>
                  <th scope="col" style={{border: '1px solid #00000024'}} className="px-6 py-3">التاريخ</th>
                  <th scope="col" style={{border: '1px solid #00000024'}} className="px-6 py-3">{name}</th>
                  <th scope="col" style={{border: '1px solid #00000024'}} className="px-6 py-3">اجمالي الفاتورة</th>
                  <th scope="col" style={{border: '1px solid #00000024'}} className="px-6 py-3">تنزيل</th>
                  <th scope="col" style={{border: '1px solid #00000024'}} className="px-6 py-3">باقي الحساب</th>
                  <th scope="col" style={{border: '1px solid #00000024'}} className="px-6 py-3">عرض</th>
                  <th scope="col" style={{border: '1px solid #00000024'}} className="px-6 py-3">طباعة</th>
               </tr>
         </thead>
         <tbody className={noItems ? 'hidden' : 'visible' }>
               {isSearched ? filteredItems?.map((e , i) => (
               <tr className='border-b border-slate-300 even:bg-tablerow' key={i}>
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.invoice}</td>
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.date}</td>
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.supplierName || e.clientName}</td>
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.totalwd}</td>
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.reduction}</td>
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.remaining}</td>
                  <td className="px-6 py-3 cursor-pointer" style={{border: '1px solid #00000024'}} onClick={() => handleShow(e.invoice)}>
                     <FontAwesomeIcon icon={faEye} />
                  </td>
                  <td className="px-6 py-3 cursor-pointer" style={{border: '1px solid #00000024'}} onClick={() => handlePrint(e.invoice)}>
                     <FontAwesomeIcon icon={faPrint} />
                  </td>
               </tr>
               ))
               : bills?.map((e , i) => (
                  <tr className='border-b border-slate-300 even:bg-tablerow' key={i}>
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.invoice}</td>
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.date}</td>
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.supplierName || e.clientName}</td>
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.totalwd}</td>
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.reduction}</td>
                  <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.remaining}</td>
                  <td className="px-6 py-3 cursor-pointer" style={{border: '1px solid #00000024'}} onClick={() => handleShow(e.invoice)}>
                     <FontAwesomeIcon icon={faEye} />
                  </td>
                  <td className="px-6 py-3 cursor-pointer" style={{border: '1px solid #00000024'}} onClick={() => handlePrint(e.invoice)}>
                     <FontAwesomeIcon icon={faPrint} />
                  </td>
               </tr>
               ))}
         </tbody>
        </table>
        {show && <div className='bg-popup fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20'>
        <div className='bg-white p-24 rounded-lg w-7/12 relative'>
             <div onClick={() => setShow(false)} className="border-2 rounded-full flex justify-center items-center h-7 w-7 cursor-pointer border-white bg-main text-white absolute -top-3 -right-3">
               <FontAwesomeIcon icon={faClose} />
             </div>
            <table className="table-auto w-full text-center border" style={{borderCollapse: 'collapse'}}>
               <thead className="sticky top-0 bg-main text-white border-b">
                     <tr className='border-b border-slate-300'>
                        <th scope="col" style={{border: '1px solid #00000024'}} className="px-6 py-3">كود المنتج</th>
                        <th scope="col" style={{border: '1px solid #00000024'}} className="px-6 py-3">اسم المنتج</th>
                        <th scope="col" style={{border: '1px solid #00000024'}} className="px-6 py-3">الكمية</th>
                        <th scope="col" style={{border: '1px solid #00000024'}} className="px-6 py-3">السعر</th>
                        <th scope="col" style={{border: '1px solid #00000024'}} className="px-6 py-3">الاجمالي</th>
                     </tr>
               </thead>
               <tbody>
                     {bill?.map((e , i) => (
                        <tr className='border-b border-slate-300 even:bg-tablerow' key={i}>
                        <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.itemCode}</td>
                        <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.itemName}</td>
                        <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.qty}</td>
                        <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.price}</td>
                        <td className="px-6 py-3" style={{border: '1px solid #00000024'}}>{e.total}</td>
                     </tr>
                     ))}
               </tbody>
            </table>
        </div>
      </div>}
      {showPrint && <PrintInvoice 
         handleClose={() => setShowPrint(false)}
         printableRef={printableRef}
         handlePrintt={handlePrintt}
         billPrint={billPrint}
         invoice={billPrint[0]?.invoice}
         date={billPrint[0]?.date}
         name={billPrint[0]?.supplierName || billPrint[0]?.clientName}
         totalbill={billPrint[0]?.totalbill}
         discount={billPrint[0]?.discount}
         totalwd={billPrint[0]?.totalwd}
         reduction={billPrint[0]?.reduction}
         remaining={billPrint[0]?.remaining}
         show={checkInvoice}
      />}
      </div>
  )
}

export default TableSupplierbills