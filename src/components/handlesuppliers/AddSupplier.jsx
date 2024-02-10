import { useEffect, useState } from 'react'
import { useStateValue } from '../../context/stateProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmationButton from '../ConfirmationButton';
import ModelBtns from '../ModelBtns';
import FormSuppliersModel from '../formmodels/FormSuppliersModel';

const AddSupplier = ({isAdded}) => {
 
  const {addSupplier ,suppliers} = useStateValue()
  const [supplierInfo , setSupplierInfo] = useState(
        {code: suppliers.length > 0 ? parseInt(suppliers[suppliers?.length - 1]?.code) + 1 : 1 ,name: '',phone: ''}
  )

 const [show ,setShow] = useState(false)
 const [nameExist ,setNameExist] = useState(false)
 const [checkPhone ,setCheckPhone] = useState(false)
 const navigate = useNavigate();
 const locatin = useLocation()
 const initial_url = locatin.pathname.split('/')


 function handleChange(event){
    if (event.target.name === 'phone') {
        if(!isNaN(event.target.value)){
              setSupplierInfo(prevData => {
                  return {
                      ...prevData,
                      [event.target.name] : event.target.value
                  }
              })
        }
     }else{
      setSupplierInfo(prevData => {
          return {
              ...prevData,
              code: suppliers.length > 0 ? parseInt(suppliers[suppliers?.length - 1]?.code) + 1 : 1,
              [event.target.name] : event.target.value
          }
      })
     }
 }

 useEffect(() => {

    const checkPrice = supplierInfo.phone && !supplierInfo.phone.startsWith('01') ? 
          setCheckPhone(true) : setCheckPhone(false)

    const checkName = supplierInfo.name && suppliers.find(e => e.name === supplierInfo.name) ? 
          setNameExist(true) : setNameExist(false)

 } , [supplierInfo , suppliers])

 const {code , name , phone} = supplierInfo

 const handleSubmit = (e) => {
    e.preventDefault()
    if(!checkPhone && !nameExist){
        addSupplier(code , name , phone)
        isAdded(true)
        navigate(`/${initial_url.slice(1 , -1).join('/')}`)
        localStorage.setItem('branch' , 'suppliersList')
    }
 }

 const cancelAdd = () => {
    isAdded(false)
    navigate(`/${initial_url.slice(1 , -1).join('/')}`)
    localStorage.setItem('branch' , 'suppliersList')
}

  return (
    <div className='mt-8'>
       <FormSuppliersModel 
           title="اضافة مورد جديد" 
           handleSubmit={handleSubmit} 
           handleChange={handleChange} 
           codeVal={supplierInfo.code}
           nameVal={supplierInfo.name}
           phoneVal={supplierInfo.phone}
           checkPhone={checkPhone}
           nameExist={nameExist}
       />
       <ModelBtns handlecancel={() => setShow(true)} form='my-form' title="تسجيل" cancelTitle='الغاء' btnStyle={'w-60 py-3 text-lg'} margin={'mt-10'} />
       {show && <ConfirmationButton title='هل تريد الغاء التسجيل؟' confirm={cancelAdd} cancel={() => setShow(false)} />}
    </div>
  )
}

export default AddSupplier