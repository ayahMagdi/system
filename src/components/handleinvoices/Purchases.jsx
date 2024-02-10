import { useEffect, useState } from 'react'
import { useStateValue } from '../../context/stateProvider'
import ModelBtns from '../ModelBtns'
import FormInvoicesModel from '../formmodels/FormInvoicesModel'
import TableInvoices from '../tablemodels/TableInvoices'
import FormInvoiceModel from '../formmodels/FormInvoiceModel'
import { useNavigate } from 'react-router-dom';
import ConfirmationButton from '../ConfirmationButton'

const Purchases = () => {

  const {purchases , addPurchases , deletePurchases , suppliers ,supplierBalance,addSupplierBalance,editSupplierBalance, stores ,items ,inwardBills ,setPurchases,addToStore,editStores , editPurchases ,addInwardBills} = useStateValue()

  const currentDate = new Date().toLocaleDateString();
  const navigate = useNavigate();

  const [purchasesInfo , setPurchasesInfo] = useState(
    { 
      invoice: '' ,
      date: '',
      supplierCode: '',
      supplierName: '',
      itemCode: '',
      itemName: '',
      unit: '' ,
      qty: '' ,
      price: '',
      total:''
    }
  )
  
  const [targetCode ,setTargetCode] = useState(null)
  const [supplierErr ,setSupplierErr] = useState(false)
  const [codeExist ,setCodeExist] = useState(false)
  const [itemErr ,setItemErr] = useState(false)
  const [edit ,setEdit] = useState(false)
  const [existing ,setExisting] = useState(false)
  const [qtyZero ,setQtyZero] = useState(false)
  const [discountErr ,setDiscountErr] = useState(false)
  const [reductionErr ,setReductionErr] = useState(false)
  const [emptyCode ,setEmptyCode] = useState(false)
  const [totalDisabled ,setTotalDisabled] = useState(false)
  const [discountDisabled ,setDiscountDisabled] = useState(false)
  const [record ,setRecord] = useState(null)
  const [show ,setShow] = useState(false)
  const [emptyPurchas ,setEmptyPurchas] = useState(true)

  function handleChange(event){
    if (!isNaN(event.target.value)) {
        setPurchasesInfo(prevData => {
          return {
              ...prevData, 
              [event.target.name] : event.target.value,
          }
        })
      setCalcPurchas(prevData => {
        return {
          ...prevData,
          [event.target.name]: event.target.value
        }
     })
    }
  }

  const getCode = (code) => {
    setTargetCode(code)
  }
  const getRecord = (record) => {
    setRecord(record)
  }

  const handleEdit = (e) => {
    setEdit(true)
    setPurchasesInfo({
          invoice: e?.invoice,
          date: e?.date,
          supplierCode: e?.supplierCode,
          supplierName: e?.supplierName,
          itemCode: e?.itemCode,
          itemName: e?.itemName,
          unit: e?.unit,
          qty: e?.qty,
          price: e?.price,
          total: e.price * e.qty
    }
    )
  }
 
  const {invoice ,date , supplierName , supplierCode ,itemCode , itemName , unit , qty , price ,total} = purchasesInfo

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!edit){
      if(!itemErr && !supplierErr && !codeExist && !qtyZero){
        addPurchases(invoice.toString() ,date , supplierName , supplierCode ,itemCode , itemName , unit , qty , price ,total)
        emptyForm()
        setExisting(true)
      }
    }else{
      if(!qtyZero){
        const editedPurchases = purchasesInfo
        editPurchases(record?.itemCode , editedPurchases)
        setEdit(false)
        emptyForm()
      }
    }
  }

  const emptyForm = () => {
    setEdit(false)
    setItemErr(false)
    setSupplierErr(false)
    setCodeExist(false)
    setPurchasesInfo(prevData => {
      return {
          ...prevData, 
          itemCode: '',
          itemName: '',
          unit: '',
          price: '',
          qty: '',
          total: ''
      }
    })
  }
  
  const emptyAllForms = () => {
    setEdit(false)
    setItemErr(false)
    setSupplierErr(false)
    setExisting(false)
    setCodeExist(false)
    setPurchasesInfo({
      invoice: '' ,
       date: '',
       supplierCode: '',
       supplierName: '',
       itemCode: '',
       itemName: '',
       unit: '' ,
       qty: '' ,
       price: '',
       total: ''})
    setCalcPurchas({
    totalbill: '',
    totalwd: '',
    remaining: '',
    reduction: '',
    discount: '',
    items:''
    })
    setPurchases([])
  }

  const filteredSuppliers = purchasesInfo.supplierCode &&
    suppliers?.filter(e => e.code.toString() === purchasesInfo.supplierCode.toString())

  const filteredStors = purchasesInfo.itemCode &&
    items?.filter(e => parseInt(e.code) === parseInt(purchasesInfo.itemCode))

  const getTotal = purchases.reduce((acc , cur) => {
      return parseInt(acc) + (parseInt(cur.price) * parseInt(cur.qty))
  } , 0)

  const [calcPurchas , setCalcPurchas] = useState(
      {totalbill: getTotal ,discount: '',totalwd: '' ,reduction: '',remaining: '',items:''}
    ) 

  useEffect(() => {
     const handleSupplierErrs = filteredSuppliers?.length === 0 && purchasesInfo?.supplierCode && !edit
              ? setSupplierErr(true) : setSupplierErr(false)
     const handleItemErrs = filteredStors?.length === 0 && purchasesInfo?.itemCode && !edit 
              ? setItemErr(true) : setItemErr(false)
     const handleCodeErrs = purchasesInfo.itemCode && !edit && purchases?.find(e => parseInt(e.itemCode) === parseInt(purchasesInfo.itemCode)) ? 
      setCodeExist(true) : setCodeExist(false)
     const handleQtyZero = purchasesInfo.qty && parseInt(purchasesInfo.qty) === 0 ? 
         setQtyZero(true) : setQtyZero(false)
    
     const handleEmptyPur = purchasesInfo.supplierCode && !supplierErr  ? setEmptyPurchas(false) : setEmptyPurchas(true)

    const handleDiscountErr = calcPurchas.discount && parseInt(calcPurchas.discount) > 100 ?
         setDiscountErr(true) : setDiscountErr(false)
    const handleReductionErr = calcPurchas.reduction && parseInt(calcPurchas.reduction) > parseInt(calcPurchas.totalwd) ?
        setReductionErr(true) : setReductionErr(false)

    const handleDisabledQty = !purchasesInfo.itemCode || itemErr ? setEmptyCode(true) : setEmptyCode(false)

    const handleTotalDisabled = !calcPurchas.totalbill || parseInt(calcPurchas?.discount) === 100 ? setTotalDisabled(true) : setTotalDisabled(false)
    const handleDiscountDisabled = !calcPurchas.totalbill ? setDiscountDisabled(true) : setDiscountDisabled(false)

  } , [filteredSuppliers , purchasesInfo ,filteredStors ,edit , purchases , calcPurchas ,itemErr])


  useEffect(() => {
    const invoiceNum = Array.from(new Set(inwardBills.map((inward) => inward.invoice)))
    const timeoutId = setTimeout(() => {
      //  if(!edit){
        // if(!existing && purchasesInfo.supplierCode){
          setPurchasesInfo(prevData => {
            return {
                ...prevData, 
                itemName: filteredStors[0]?.name,
                date: currentDate,
                supplierName: filteredSuppliers[0]?.name,
                invoice: invoiceNum?.length + 1,
                unit: filteredStors[0]?.unit,
                price: filteredStors[0]?.income,
                total: purchasesInfo.qty ? parseInt(purchasesInfo.qty) * purchasesInfo.price : ''
            }
         })
        //  }else{
        //   setPurchasesInfo(prevData => {
        //     return {
        //         ...prevData, 
        //         itemName: filteredStors[0]?.name,
        //         date: currentDate,
        //         supplierName: purchases[0]?.supplierName,
        //         supplierCode: purchases[0]?.supplierCode,
        //         invoice: invoiceNum?.length + 1,
        //         unit: filteredStors[0]?.unit,
        //         price: filteredStors[0]?.income,
        //         total: purchasesInfo.qty ? parseInt(purchasesInfo.qty) * purchasesInfo.price : ''
        //     }
        //  })
        // }
      //  }
       setCalcPurchas(prev => {
        return {
          ...prev,
          totalbill: getTotal,
          totalwd: !discountErr ? getTotal - ((getTotal * calcPurchas.discount) / 100) : '' ,
          remaining: !discountErr && !reductionErr ? parseInt(calcPurchas.totalwd) === parseInt(calcPurchas.reduction) ? '0' : calcPurchas.totalwd - calcPurchas.reduction : '',
          items: purchases.length,
        }
       })
    }, 300); 

    return () => clearTimeout(timeoutId);
    
  },);

  const {totalbill , discount, totalwd , reduction , remaining} = calcPurchas

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      setCalcPurchas(prevData => {
        return {
          ...prevData,
          [event.target.name] : event.target.value.slice(0, -1),
        }
      })
      event.preventDefault();
    }
  };

  const handleDelete = (e) =>{
    deletePurchases(e)
  }

  const handleRegistration = (e) => {
    e.preventDefault()

    if(!discountErr && !reductionErr){
     const handleStores = purchases.map((pur) => {
        let storeCode = stores.find(store => pur.itemCode === store.code)
        if(!storeCode) {
          items.map(item => item.code === pur.itemCode && 
          addToStore(pur.itemCode,pur.itemName,pur.unit,pur.price,item.outcome,pur.qty,0,pur.qty,pur.total)
          )
        } 
        if(storeCode){
          editStores(pur)
        }
       }
     )
  
     const handleInward = purchases.map((pur) => {
      addInwardBills(pur.invoice ,pur.date, pur.supplierCode, pur.supplierName, pur.itemCode , pur.itemName , pur.unit ,pur.price ,pur.qty , pur.total , totalbill ,discount || 0,totalwd,reduction || 0,remaining , 'sales')
    })     
  
    const handleSuppliers = purchases.map((pur) => {
      let suppliercode = supplierBalance.find(supplier => pur.supplierCode === supplier.code)
      if(!suppliercode) {
        addSupplierBalance(pur.supplierCode,pur.supplierName,totalwd,reduction || 0,remaining)
      } 
      if(suppliercode){
        editSupplierBalance(pur.supplierCode,calcPurchas , false)
      }
    })
  
      emptyAllForms()
      localStorage.setItem('branch' , 'suppliersPrint')
      navigate('/homepage/printbills/supplierbills')
    }

  }

  const handleCancel = (e) => {
    e.preventDefault()
    emptyAllForms()
    navigate('/homepage')
  }

  return (
    <div className='py-3 max-h-screen'>
        <FormInvoicesModel 
            title='فاتورة المشتريات' 
            handleSubmit={handleSubmit} 
            handleChange={handleChange}
            returns= {false}
            itemCodeVal={purchasesInfo.itemCode}
            itemNameVal={!edit ? !itemErr && purchasesInfo.itemCode ? purchasesInfo.itemName : '' : purchasesInfo.itemName}
            unitVal={!edit ?!itemErr && purchasesInfo.itemCode ? purchasesInfo.unit : '' : purchasesInfo.unit}
            qtyVal={purchasesInfo.qty}
            priceVal={!edit ? !itemErr && purchasesInfo.itemCode ? purchasesInfo.price : '' : purchasesInfo.price}
            purchasVal={!edit ? !supplierErr && purchasesInfo.supplierCode ? purchasesInfo.invoice : '' : purchasesInfo.invoice}
            dateVal={!edit ? !supplierErr && purchasesInfo.supplierCode ? purchasesInfo.date : '' : purchasesInfo.date}
            supplierCodeVal={!existing ? purchasesInfo.supplierCode : purchases[0]?.supplierCode}
            supplierNameVal={!edit ? !supplierErr && purchasesInfo.supplierCode ? purchasesInfo.supplierName : '' : purchasesInfo.supplierName} 
            totalVal={purchasesInfo.qty ? purchasesInfo.total : ''} 
            edit={edit}
            supplierErr={supplierErr}
            itemErr={itemErr}
            existing={existing}
            nameText='اسم المورد'
            codeText='كود المورد'
            errorText='الكود غير صحيح'
            codeExist={codeExist}
            qtyZero={qtyZero}
            emptyCode={emptyCode}
            emptyPurchas={emptyPurchas}
        />
        <ModelBtns title={edit ? 'تعديل' : 'اضافة'} form='my-form' cancelTitle='تفريغ الحقول' handlecancel={emptyForm} btnStyle={'w-40 py-2'} margin={'mt-5'} />
        <TableInvoices 
              purchases={purchases} 
              getRecord={getRecord}
              deletCode={getCode} 
              handleDelete={() => handleDelete(targetCode)} 
              handleEdit={handleEdit}
        />
        <FormInvoiceModel 
             totalVal={calcPurchas.totalbill || ''}
             handleInputChange={handleKeyDown}
             handleChange={handleChange} 
             discountVal={calcPurchas.discount || ''} 
             totalwdVal={getTotal ? calcPurchas.totalwd : ''}
             reductionVal={calcPurchas.reduction || ''}
             remainingVal={getTotal ? calcPurchas.remaining : ''}
             itemsVal={calcPurchas.items || ''}
             discountErr={discountErr}
             reductionErr={reductionErr}
             totalDisabled={totalDisabled}
             discountDisabled={discountDisabled}
        />
        <ModelBtns title='تسجيل' cancelTitle='الغاء' handleRegistration={handleRegistration} btnStyle={'w-40 py-2'} margin={'mt-5'} handlecancel={() => setShow(true)} />
        {show && <ConfirmationButton title='هل تريد الغاء التسجيل؟' confirm={handleCancel} cancel={() => setShow(false)} />}
    </div>
  )
}

export default Purchases