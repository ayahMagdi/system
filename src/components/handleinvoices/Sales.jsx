import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../context/stateProvider';
import FormInvoicesModel from '../formmodels/FormInvoicesModel';
import ModelBtns from '../ModelBtns';
import TableInvoices from '../tablemodels/TableInvoices';
import FormInvoiceModel from '../formmodels/FormInvoiceModel';
import { useNavigate } from 'react-router-dom';
import ConfirmationButton from '../ConfirmationButton';

const Sales = () => {

    const {sales , addSales , deleteSales , clients , stores,clientBalance,addClientBalance,editClientBalance,setSales,outwardBills,addOutwardBills , items, deleteFromStore ,editSales ,purchases} = useStateValue()

    const currentDate = new Date().toLocaleDateString();
  
    const [purchasesInfo , setPurchasesInfo] = useState(
      { 
        invoice: '' ,
        date: '',
        supplierName: '',
        supplierCode: '',
        itemCode: '',
        itemName: '',
        unit: '' ,
        qty: '' ,
        price: '',
        total: ''
      }
    )
    const navigate = useNavigate();
    const [targetCode ,setTargetCode] = useState()
    const [record ,setRecord] = useState()
    const [clientErr ,setClientErr] = useState(false)
    const [itemErr ,setItemErr] = useState(false)
    const [codeExist ,setCodeExist] = useState(false)
    const [edit ,setEdit] = useState(false)
    const [qtyErr ,setQtyErr] = useState(false)
    const [existing ,setExisting] = useState(false)
    const [qtyZero ,setQtyZero] = useState(false)
    const [discountErr ,setDiscountErr] = useState(false)
    const [reductionErr ,setReductionErr] = useState(false)
    const [emptyCode ,setEmptyCode] = useState(false)
    const [totalDisabled ,setTotalDisabled] = useState(false)
    const [discountDisabled ,setDiscountDisabled] = useState(false)
    const [show ,setShow] = useState(false)
    const [emptyPurchas ,setEmptyPurchas] = useState(true)
  
    function handleChange(event){
      if (!isNaN(event.target.value)) {
        setPurchasesInfo(prevData => {
          return {
              ...prevData, 
              [event.target.name] : event.target.value
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
  
    const getRecord = (record) => {
      setRecord(record)
    }
  
    const getCode = (code) => {
      setTargetCode(code)
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
   
    const {invoice ,date , supplierName , supplierCode ,itemCode , itemName , unit , qty , price,total} = purchasesInfo
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!edit){
          if(!qtyErr && !itemErr && !clientErr && !codeExist && !qtyZero){
            addSales(invoice.toString() ,date , supplierName , supplierCode ,itemCode , itemName , unit , qty , price ,total)
            emptyForm()
            setExisting(true)
          }
        }else{
          if(!qtyErr && !codeExist && !qtyZero){
            const editedSales = purchasesInfo
            editSales(record?.itemCode , editedSales)
            setEdit(false)
            emptyForm()
          }
        }
    }
 
   const getTotal = sales.reduce((acc , cur) => {
     return parseInt(acc) + (parseInt(cur.price) * parseInt(cur.qty))
   } , 0)

    const [calcPurchas , setCalcPurchas] = useState(
      {totalbill: getTotal ,discount: '',totalwd: '' ,reduction: '',remaining: '',items:''}
    )
  
    const emptyForm = () => {
      setEdit(false)
      setItemErr(false)
      setClientErr(false)
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
      setClientErr(false)
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
      setSales([])
    }

    let filteredClients = purchasesInfo.supplierCode &&
         clients?.filter(e => e.code.toString() === purchasesInfo.supplierCode.toString())
  
    let filteredStors = purchasesInfo.itemCode &&
      items?.filter(e => parseInt(e.code) === parseInt(purchasesInfo.itemCode))

    let avlQty = stores.find(store => parseInt(store.code) === parseInt(filteredStors[0]?.code))

    useEffect(() => {

       const handleSupplierErrs = filteredClients?.length === 0 && purchasesInfo.supplierCode && !edit
                ? setClientErr(true) : setClientErr(false)
       const handleItemErrs = filteredStors?.length === 0 && purchasesInfo.itemCode && !edit
                ? setItemErr(true) : setItemErr(false)
        const checkQty = purchasesInfo.qty && parseInt(avlQty?.store) < parseInt(purchasesInfo.qty) 
              ? setQtyErr(true) : setQtyErr(false)
        const handleCodeErrs = purchasesInfo.itemCode && !edit && sales?.find(e => parseInt(e.itemCode) === parseInt(purchasesInfo.itemCode)) ? 
          setCodeExist(true) : setCodeExist(false)
        const handleQtyZero = purchasesInfo.qty && parseInt(purchasesInfo.qty) === 0 ? 
           setQtyZero(true) : setQtyZero(false)
        const handleDiscountErr = calcPurchas.discount && parseInt(calcPurchas.discount) > 100 ?
           setDiscountErr(true) : setDiscountErr(false)
        const handleReductionErr = calcPurchas.reduction && parseInt(calcPurchas.reduction) > parseInt(calcPurchas.totalwd) ?
           setReductionErr(true) : setReductionErr(false)

       const handleEmptyPur = purchasesInfo.supplierCode && !clientErr  ? setEmptyPurchas(false) : setEmptyPurchas(true)
           
       const handleTotalDisabled = !calcPurchas.totalbill || parseInt(calcPurchas?.discount) === 100 ? setTotalDisabled(true) : setTotalDisabled(false)
       const handleDiscountDisabled = !calcPurchas.totalbill ? setDiscountDisabled(true) : setDiscountDisabled(false)

        const handleDisabledQty = !purchasesInfo.itemCode || itemErr ? setEmptyCode(true) : setEmptyCode(false)

      } , [filteredClients , purchasesInfo ,filteredStors ,edit , avlQty ,sales ,calcPurchas ,itemErr])
    
  useEffect(() => {
    const invoiceNum = Array.from(new Set(outwardBills.map((inward) => inward.invoice)))
    const timeoutId = setTimeout(() => {
      //  if(!edit){
        // if(!existing && purchasesInfo.supplierCode){
          setPurchasesInfo(prevData => {
            return {
                ...prevData, 
                itemName: filteredStors[0]?.name,
                date: currentDate,
                supplierName: filteredClients[0]?.name,
                invoice: invoiceNum?.length + 1,
                unit: filteredStors[0]?.unit,
                price: filteredStors[0]?.outcome,
                total: purchasesInfo.qty ? parseInt(purchasesInfo.qty) * purchasesInfo.price : ''
            }
         })
        // }else{
        //   setPurchasesInfo(prevData => {
        //     return {
        //         ...prevData, 
        //         itemName: filteredStors[0]?.name,
        //         date: currentDate,
        //         supplierName: sales[0]?.supplierName,
        //         supplierCode: sales[0]?.supplierCode,
        //         invoice: invoiceNum?.length + 1,
        //         unit: filteredStors[0]?.unit,
        //         price: filteredStors[0]?.outcome,
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
          remaining:  !discountErr && !reductionErr ? parseInt(calcPurchas.totalwd) === parseInt(calcPurchas.reduction) ? '0' : calcPurchas.totalwd - calcPurchas.reduction : '',
          items: sales.length,
        }
       })
    }, 300); 

    return () => clearTimeout(timeoutId);
    
  },);

  const {totalbill , discount, totalwd , reduction , remaining} = calcPurchas
  
    const handleDelete = (e) => {
      deleteSales(e)
    }
  
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

    const handleRegistration = (e) => {
      e.preventDefault()
    
      if(!discountErr && !reductionErr){
        const handleStores = sales.map((sale) => {
          let storeCode = stores.find(store => sale.itemCode === store.code)
          deleteFromStore(sale , storeCode)
       })

       const handleOutward = sales.map((pur) => {
        addOutwardBills(pur.invoice ,pur.date, pur.supplierCode, pur.supplierName, pur.itemCode , pur.itemName , pur.unit ,pur.price ,pur.qty , pur.total , totalbill ,discount || 0,totalwd,reduction || 0,remaining , 'pur')
      })   

      const handleSuppliers = sales.map((sale) => {
        let clientcode = clientBalance.find(supplier => sale.supplierCode === supplier.code)
        if(!clientcode) {
          addClientBalance(sale.supplierCode,sale.supplierName,totalwd,reduction || 0,remaining)
        } 
        if(clientcode){
          editClientBalance(sale.supplierCode,calcPurchas, false)
        }
      })
  
      emptyAllForms()
      localStorage.setItem('branch' , 'clientsPrint')
      navigate('/homepage/printbills/clientbills')
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
            title='فاتورة المبيعات' 
            handleSubmit={handleSubmit} 
            handleChange={handleChange}
            returns= {false}
            itemCodeVal={purchasesInfo.itemCode}
            itemNameVal={!edit ? !itemErr && purchasesInfo.itemCode ? purchasesInfo.itemName : '' : purchasesInfo.itemName}
            unitVal={!edit ?!itemErr && purchasesInfo.itemCode ? purchasesInfo.unit : '' : purchasesInfo.unit}
            qtyVal={purchasesInfo.qty}
            priceVal={!edit ? !itemErr && purchasesInfo.itemCode ? purchasesInfo.price : '' : purchasesInfo.price}
            purchasVal={!edit ? !clientErr && purchasesInfo.supplierCode ? purchasesInfo.invoice : '' : purchasesInfo.invoice}
            dateVal={!edit ? !clientErr && purchasesInfo.supplierCode ? purchasesInfo.date : '' : purchasesInfo.date}
            supplierCodeVal={purchasesInfo.supplierCode}
            supplierNameVal={!edit ? !clientErr && purchasesInfo.supplierCode ? purchasesInfo.supplierName : '' : purchasesInfo.supplierName} 
            totalVal= {purchasesInfo.qty ? purchasesInfo.total : ''} 
            edit={edit}
            supplierErr={clientErr}
            itemErr={itemErr}
            qtyErr={qtyErr}
            avlQty={avlQty?.store}
            existing={existing}
            nameText='اسم العميل'
            codeText='كود العميل'
            errorText='الكود غير صحيح'
            codeExist={codeExist}
            qtyZero={qtyZero}
            emptyCode={emptyCode}
            emptyPurchas={emptyPurchas}
        />
        <ModelBtns title={edit ? 'تعديل' : 'اضافة'} form='my-form' cancelTitle='تفريغ الحقول' handlecancel={emptyForm} btnStyle={'w-40 py-2'} margin={'mt-5'} />
        <TableInvoices
              purchases={sales} 
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

export default Sales