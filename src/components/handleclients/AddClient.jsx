import { useEffect, useState } from 'react'
import { useStateValue } from '../../context/stateProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmationButton from '../ConfirmationButton';
import ModelBtns from '../ModelBtns';
import FormClientsModel from '../formmodels/FormClientsModel';

const AddClient = ({isAdded}) => {


    const {addClient , clients} = useStateValue()
    const [clientInfo , setClientInfo] = useState(
        {code: clients.length > 0 ? parseInt(clients[clients.length - 1]?.code) + 1 : 1,name: '',phone: '' ,address: ''}
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
              setClientInfo(prevData => {
                  return {
                      ...prevData,
                      [event.target.name] : event.target.value
                  }
              })
        }
     }else{
      setClientInfo(prevData => {
          return {
              ...prevData,
              code:clients.length > 0 ? parseInt(clients[clients.length - 1]?.code) + 1 : 1,
              [event.target.name] : event.target.value
          }
      })
     }
 }

 useEffect(() => {

    const checkPrice = clientInfo.phone && !clientInfo.phone.startsWith('01') ? 
          setCheckPhone(true) : setCheckPhone(false)

    const checkName = clientInfo.name && clients.find(e => e.name === clientInfo.name) ? 
          setNameExist(true) : setNameExist(false)

 } , [clientInfo , clients])

 const {code , name , phone , address} = clientInfo

 const handleSubmit = (e) => {
    e.preventDefault()
    if(!checkPhone && !nameExist){
        addClient(code , name , phone ,address)
        isAdded(true)
        navigate(`/${initial_url.slice(1 , -1).join('/')}`)
        localStorage.setItem('branch' , 'clinetsList')
    }
 }

 const cancelAdd = () => {
    isAdded(false)
    navigate(`/${initial_url.slice(1 , -1).join('/')}`)
    localStorage.setItem('branch' , 'clinetsList')
}


  return (
    <div className='mt-8'>
       <FormClientsModel 
          title="اضافة عميل جديد" 
          handleSubmit={handleSubmit} 
          handleChange={handleChange} 
          codeVal={clientInfo.code}
          nameVal={clientInfo.name}
          phoneVal={clientInfo.phone}
          addressVal={clientInfo.address}
          checkPhone={checkPhone}
          nameExist={nameExist}
        />
       <ModelBtns handlecancel={() => setShow(true)} form='my-form' title="تسجيل" cancelTitle='الغاء' btnStyle={'w-60 py-3 text-lg'} margin={'mt-10'} />
       {show && <ConfirmationButton title='هل تريد الغاء التسجيل؟' confirm={cancelAdd} cancel={() => setShow(false)} />}
    </div>
  )
}

export default AddClient