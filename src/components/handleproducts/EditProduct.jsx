import { useEffect, useState,useMemo } from 'react'
import { useStateValue } from '../../context/stateProvider';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ConfirmationButton from '../ConfirmationButton';
import ModelBtns from '../ModelBtns';
import FormItemsModel from '../formmodels/FormItemsModel';
import isEqual from 'lodash/isEqual';

const EditProduct = ({record , isEdited}) => {

    const {editItem , items ,editStoresInfo ,stores} = useStateValue()
    const options = [
        {value: 'قطع' , label: 'قطع'},
        {value: 'علبة' , label: 'علبه'},
        {value: 'كرتونه' , label: 'كرتونه'}
     ]
    const [show ,setShow] = useState(false)
    const [invalidPrice ,setInvalidPrice] = useState(false)
    const [nameExist ,setNameExist] = useState(false)
    const [codeExist ,setCodeExist] = useState(false)
    const [storeRecord , setStoreRecord] = useState({})
    const param = useParams()

  const uniqueDataInvoice = useMemo(() => {
      const unique = [];
  
    items.forEach(item => {
      let exists = false;
      
      
       if(isEqual(record.code, item.code)) {
          exists = true;
        }
  
      if(!exists) {
        unique.push(item);
      }
    });
  
    return unique;
   }, [items]);

    const getUnit = options.filter(e => e.value === record.unit)
    useEffect(()=> {
      const getStore = stores.filter(e => e.code === record.code && setStoreRecord(e))
    }, [])

    const [newArr ,setNewArr] = useState(
        {
            code: record.code,
            name: record.name,
            unit: getUnit[0]?.label,
            income: record.income,
            outcome: record.outcome,
            avlqty:storeRecord.avlqty,
            soldqty:storeRecord.soldqty,
            store:storeRecord.store,
            total:storeRecord.total
    })
    
    const navigate = useNavigate();
    const locatin = useLocation()
    const initial_url = locatin.pathname.split('/')

    const  {code , name , unit , income , outcome , avlqty , soldqty , store ,total} = newArr

    const editedItems = newArr

    function handleChange(event) {
        if (event.target.name === 'income' || event.target.name === 'outcome') {
          if (!isNaN(event.target.value)) {
            setNewArr(prevData => ({
              ...prevData,
              avlqty:storeRecord.avlqty,
              soldqty:storeRecord.soldqty,
              store:storeRecord.store,
              total:storeRecord.total,
              [event.target.name]: event.target.value
            }));
          }
        } else {
          setNewArr(prevData => ({
            ...prevData,
            avlqty:storeRecord.avlqty,
            soldqty:storeRecord.soldqty,
            store:storeRecord.store,
            total:storeRecord.total,
            [event.target.name]: event.target.value
          }));
        }
      }
    
    useEffect(() => {

        const checkPrice = newArr.outcome && parseInt(newArr.income) > parseInt(newArr.outcome) ? 
                 setInvalidPrice(true) : setInvalidPrice(false)

        const findSameName = uniqueDataInvoice.find(e => e.name === newArr.name && e.code !== newArr.code)
        
        const checkName = newArr.name && findSameName ? setNameExist(true) : setNameExist(false)

        const checkCode = newArr.code && uniqueDataInvoice.find(e => e.code === newArr.code) ?
              setCodeExist(true) : setCodeExist(false)
 
     } , [newArr , items,uniqueDataInvoice])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!invalidPrice && !nameExist && !codeExist){
            setInvalidPrice(false)
            editItem(record.code , editedItems)
            editStoresInfo(record.code,editedItems)
            isEdited(true)
            navigate(`/${initial_url.slice(1 , -2).join('/')}`)
            localStorage.setItem('branch' , 'itemsList')
        }
    }

    const cancelEdit = () => {
        isEdited(false)
        navigate(`/${initial_url.slice(1 , -2).join('/')}`)
        localStorage.setItem('branch' , 'itemsList')
    }

  return (
    <div className='mt-8'>
        <FormItemsModel 
                title="تعديل المنتج"
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                codeVal={newArr.code}
                barcodeVal={newArr.barcode}
                nameVal={newArr.name}
                defaultVal={getUnit[0]?.label}
                unitVal={newArr?.unit}
                incomeVal={newArr.income}
                outcomeVal={newArr.outcome}
                invalidPrice={invalidPrice}
                nameExist={nameExist}
                codeExist={codeExist}
                options={options}
                isDisabled={true}
                // handleSelectChange={handleSelectChange}
        />
        <ModelBtns handlecancel={() => setShow(true)} form='my-form' title="تعديل" cancelTitle='الغاء' btnStyle={'w-60 py-3 text-lg'} margin={'mt-10'} />
        {show && <ConfirmationButton title='هل تريد الغاء التعديل؟' confirm={cancelEdit} cancel={() => setShow(false)} />}
    </div>
  )
}

export default EditProduct