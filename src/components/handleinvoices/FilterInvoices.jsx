import ModelBtns from "../ModelBtns"
import FormFilter from "../formmodels/FormFilter"

const FilterInvoices = ({title,handlecancel,invoiceval,dateval,name,nameplaceholder,suppliername,itemname,getinvoices,handleChangeInvoices,handleChangeDates,handleChangeSuppliers,handleChangeItems,getdates,getsuppliers,getitems,handleSubmit}) => {

  return (
    <div className='mt-5 mb-1'>
        <h2 className='text-center text-3xl font-bold text-main'>{title}</h2>
        <div className='my-3'>
            <FormFilter 
               invoicesoptions={getinvoices}
               handleChangeInvoices={handleChangeInvoices}
               handleChangeDates={handleChangeDates}
               handleChangeSuppliers={handleChangeSuppliers}
               handleChangeItems={handleChangeItems}
               dateoptions={getdates}
               supplieroptions={getsuppliers}
               itemoptions={getitems}
               handleSubmit={handleSubmit}
               invoiceval={invoiceval}
               dateval={dateval}
               suppliername={suppliername}
               itemname={itemname}
               name={name} 
               nameplaceholder={nameplaceholder}
            />
            <ModelBtns title='بحث' form='my-form' cancelTitle='تفريغ الحقول' handlecancel={handlecancel} btnStyle={'w-40 py-2'} margin={'mt-5'} />
        </div>
    </div>
  )
}

export default FilterInvoices