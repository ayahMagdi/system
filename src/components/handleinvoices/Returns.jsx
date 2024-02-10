import { useEffect, useState } from 'react'
import FormInvoicesModel from '../formmodels/FormInvoicesModel'
import { useStateValue } from '../../context/stateProvider'
import { useNavigate } from 'react-router-dom'
import ModelBtns from '../ModelBtns'
import TableInvoices from '../tablemodels/TableInvoices'
import FormInvoiceModel from '../formmodels/FormInvoiceModel'
import ConfirmationButton from '../ConfirmationButton'

const Returns = () => {

    const [purchasErr , setPurchasErr] = useState(false)
    const [itemErr ,setItemErr] = useState(false)
     const [edit ,setEdit] = useState(false)
    const [existing ,setExisting] = useState(false)
    const [qtyZero ,setQtyZero] = useState(false)
    const [codeExist ,setCodeExist] = useState(false)
    const [qtyErr ,setQtyErr] = useState(false)
    const [emptyCode ,setEmptyCode] = useState(false)
    const [emptyPurchas ,setEmptyPurchas] = useState(false)
    const [record ,setRecord] = useState(null)
    const [targetCode ,setTargetCode] = useState(null)
    const [discountDisabled ,setDiscountDisabled] = useState(true)
    const [totalDisabled ,setTotalDisabled] = useState(false)
    const [reductionErr ,setReductionErr] = useState(false)
    const [show ,setShow] = useState(false)

    const {outwardBills , addReturns , returns ,setReturns ,deleteReturns ,editReturn ,addReturnBills ,stores,items ,addToStore ,editStores} = useStateValue()

    const currentDate = new Date().toLocaleDateString();
    const navigate = useNavigate();
  
    const [returnInfo , setReturnInfo] = useState(
      { 
        purchas: '' ,
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

    function handleChange(event){
        if (!isNaN(event.target.value)) {
            setReturnInfo(prevData => {
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
        setReturnInfo({
              purchas: e?.invoice,
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

    const filteredInvoices = returnInfo.purchas &&
     outwardBills?.filter(e => parseInt(e.invoice) === parseInt(returnInfo.purchas))

    const filteredStors = returnInfo.itemCode &&
     filteredInvoices?.filter(e => parseInt(e.itemCode) === parseInt(returnInfo.itemCode))

    const {purchas ,date , supplierName , supplierCode ,itemCode , itemName , unit , qty , price ,total} = returnInfo

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!edit){
          if(!itemErr && !codeExist && !qtyZero && !qtyErr){
            addReturns(purchas.toString() ,date , supplierName , supplierCode ,itemCode , itemName , unit , qty , price ,total)
            emptyForm()
            setExisting(true)
          }
        } else{
          if(!qtyZero){
            const editedReturn = returnInfo
            editReturn(record?.itemCode , editedReturn)
            setEdit(false)
            emptyForm()
          }
        }
      }
    
      const emptyForm = () => {
        setEdit(false)
        setItemErr(false)
        setCodeExist(false)
        setReturnInfo(prevData => {
            return {
                ...prevData, 
                itemCode: '',
                qty: ''
            }
         })
      }
      
      const emptyAllForms = () => {
        setEdit(false)
        setItemErr(false)
        setExisting(false)
        setCodeExist(false)
        setReturnInfo({
          purchas: '' ,
           date: '',
           supplierCode: '',
           supplierName: '',
           itemCode: '',
           itemName: '',
           unit: '' ,
           qty: '' ,
           price: '',
           total: ''})
        // setCalcPurchas({
        // totalbill: '',
        // totalwd: '',
        // remaining: '',
        // reduction: '',
        // discount: '',
        // items:''
        // })
        setReturns([])
      }
     
    const getTotal = returns?.reduce((acc , cur) => {
        return parseInt(acc) + (parseInt(cur.price) * parseInt(cur.qty))
    } , 0)

    const [calcPurchas , setCalcPurchas] = useState(
      {totalbill: getTotal ,discount: filteredInvoices[0]?.discount ,totalwd: '' ,reduction: '',remaining: '',items:''}
    ) 

    let avlQty = filteredInvoices?.length > 0 ? filteredInvoices?.find(store => parseInt(store.itemCode) === parseInt(filteredStors[0]?.itemCode)) : null

    useEffect(() => {
        const handleInvoiceErrs = filteredInvoices?.length === 0 && returnInfo?.purchas && !edit
                 ? setPurchasErr(true) : setPurchasErr(false)
        const handleItemErrs = filteredStors?.length === 0 && returnInfo?.itemCode && !edit 
                 ? setItemErr(true) : setItemErr(false)
        const handleCodeErrs = returnInfo.itemCode && returnInfo?.purchas && !edit && returns?.find(e => parseInt(e.itemCode) === parseInt(returnInfo.itemCode)) ? 
         setCodeExist(true) : setCodeExist(false)
        const handleQtyZero = returnInfo.qty && parseInt(returnInfo.qty) === 0 ? 
            setQtyZero(true) : setQtyZero(false)
        const checkQty = returnInfo.qty && parseInt(avlQty?.qty) < parseInt(returnInfo.qty) 
            ? setQtyErr(true) : setQtyErr(false)
   
       const handleReductionErr = calcPurchas.reduction && parseInt(calcPurchas.reduction) > parseInt(calcPurchas.totalwd) ?
           setReductionErr(true) : setReductionErr(false)
   
       const handleDisabledQty = !returnInfo.purchas || !returnInfo.itemCode || itemErr || codeExist ? setEmptyCode(true) : setEmptyCode(false)
       const handleDisabledCode = !returnInfo.purchas || purchasErr ? setEmptyPurchas(true) : setEmptyPurchas(false)
   
   
     } , [filteredInvoices , returnInfo ,filteredStors ,edit , returns ,itemErr ,avlQty ,purchasErr , calcPurchas])

     useEffect(() => {
        const timeoutId = setTimeout(() => {
           if(!edit){
            if(!existing && returnInfo?.purchas){
              setReturnInfo(prevData => {
                return {
                    ...prevData, 
                    itemName: filteredStors[0]?.itemName,
                    date: currentDate,
                    supplierName: filteredInvoices[0]?.supplierName,
                    supplierCode: filteredInvoices[0]?.supplierCode,
                    unit: filteredStors[0]?.unit,
                    price: filteredStors[0]?.price,
                    total: returnInfo.qty ? parseInt(returnInfo.qty) * returnInfo.price : ''
                }
             })
            }else{
              setReturnInfo(prevData => {
                return {
                    ...prevData, 
                    itemName: filteredStors[0]?.itemName,
                    date: currentDate,
                    supplierName: returns[0]?.supplierName,
                    supplierCode: returns[0]?.supplierCode,
                    invoice: returns[0]?.invoice,
                    unit: filteredStors[0]?.unit,
                    price: filteredStors[0]?.price,
                    total: returnInfo.qty ? parseInt(returnInfo.qty) * returnInfo.price : ''
                }
             })
            }
           }
           setCalcPurchas(prev => {
            return {
              ...prev,
              totalbill: getTotal,
              discount: getTotal && filteredInvoices[0]?.discount ,
              totalwd: getTotal - ((getTotal * calcPurchas.discount) / 100) || getTotal ,
              remaining: !reductionErr ? parseInt(calcPurchas.totalwd) === parseInt(calcPurchas.reduction) ? '0' : calcPurchas.totalwd - calcPurchas.reduction : '',
              items: returns.length,
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
        deleteReturns(e)
    }

    const handleRegistration = (e) => {
      e.preventDefault()
  
      if(!reductionErr){
          const handleStores = returns.map((pur) => {
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
        
          const handleReturn = returns.map((pur) => {
            addReturnBills(pur.invoice ,pur.date, pur.supplierCode, pur.supplierName, pur.itemCode , pur.itemName , pur.unit ,pur.price ,pur.qty , pur.total , totalbill ,discount || 0,totalwd,reduction || 0,remaining)
          })     
        
          // const handleSuppliers = .map((pur) => {
          //   let suppliercode = supplierBalance.find(supplier => pur.supplierCode === supplier.code)
          //   if(!suppliercode) {
          //     addSupplierBalance(pur.supplierCode,pur.supplierName,totalwd,reduction || 0,remaining)
          //   } 
          //   if(suppliercode){
          //     editSupplierBalance(pur.supplierCode,calcPurchas , false)
          //   }
          // })
        
        emptyAllForms()
        navigate('/returnbills')
      }
  
    }
  
    const handleCancel = (e) => {
      e.preventDefault()
      emptyAllForms()
      navigate('/homepage')
    }

  return (
    <div className='py-3 max-h-screen'>
         <div className='py-3 max-h-screen'>
         <FormInvoicesModel
            title='فاتورة المرتجعات' 
            returns= {true}
            purchasErr={purchasErr}
            handleSubmit={handleSubmit} 
            handleChange={handleChange}
            itemCodeVal={returnInfo.itemCode}
            itemNameVal={!edit ? !itemErr && !codeExist && returnInfo.purchas && returnInfo.itemCode ? returnInfo.itemName : '' : returnInfo.itemName}
            unitVal={!edit ? !itemErr && !codeExist && returnInfo.purchas && returnInfo.itemCode ? returnInfo.unit : '' : returnInfo.unit}
            qtyVal={returnInfo.qty}
            priceVal={!edit ? !itemErr && !codeExist && returnInfo.purchas && returnInfo.itemCode ? returnInfo.price : '' : returnInfo.price}
            purchasVal={!existing ? returnInfo.purchas : returns[0]?.invoice}
            dateVal={!edit ? !purchasErr && returnInfo.purchas ? returnInfo.date : '' : returnInfo.date}
            supplierCodeVal={!existing ? !purchasErr && returnInfo.purchas ? returnInfo.supplierCode : '' : returns[0]?.supplierCode}
            supplierNameVal={!edit ? !purchasErr && returnInfo.purchas ? returnInfo.supplierName : '' : returnInfo.supplierName} 
            totalVal={returnInfo.qty && !qtyErr && !qtyZero ? returnInfo.total : ''} 
            edit={edit}
            itemErr={itemErr}
            existingReturn={existing}
            nameText='اسم العميل'
            codeText='كود العميل'
            errorText='الكود غير صحيح'
            codeExist={codeExist}
            qtyZero={qtyZero}
            qtyErr={qtyErr}
            emptyCode={emptyCode}
            emptyPurchas={emptyPurchas}
        />
        <ModelBtns title={edit ? 'تعديل' : 'اضافة'} form='my-form' cancelTitle='تفريغ الحقول' handlecancel={emptyForm} btnStyle={'w-40 py-2'} margin={'mt-5'} />
       <TableInvoices
              purchases={returns} 
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
             reductionErr={reductionErr}
             totalDisabled={totalDisabled}
             discountDisabled={discountDisabled}
        />
       <ModelBtns title='تسجيل' cancelTitle='الغاء' handleRegistration={handleRegistration} btnStyle={'w-40 py-2'} margin={'mt-5'} handlecancel={() => setShow(true)} />
        {show && <ConfirmationButton title='هل تريد الغاء التسجيل؟' confirm={handleCancel} cancel={() => setShow(false)} />}
    </div>
    </div>
  )
}

export default Returns