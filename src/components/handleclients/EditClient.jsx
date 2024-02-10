import { useEffect, useState } from 'react'
import { useStateValue } from '../../context/stateProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmationButton from '../ConfirmationButton';
import ModelBtns from '../ModelBtns';
import FormClientsModel from '../formmodels/FormClientsModel';

const EditClient = ({client,isEdited}) => {

    const {editClient ,clients} = useStateValue()
    const [nameExist ,setNameExist] = useState(false)
    const [checkPhone ,setCheckPhone] = useState(false)
    const [show ,setShow] = useState(false)
    const [newArr ,setNewArr] = useState(
        {
            code: client.code,
            name: client.name,
            phone: client.phone,
            address: client.address,
        })
    const navigate = useNavigate();
    const locatin = useLocation()
    const initial_url = locatin.pathname.split('/')

    const  {code , name , phone , address} = newArr

    const editedClients = newArr

    function handleChange(event){
        if (event.target.name === 'phone') {
            if(!isNaN(event.target.value)){
                  setNewArr(prevData => {
                      return {
                          ...prevData,
                          [event.target.name] : event.target.value
                      }
                  })
            }
         }else{
          setNewArr(prevData => {
              return {
                  ...prevData,
                  [event.target.name] : event.target.value
              }
          })
         }
     }

     useEffect(() => {

        const checkPrice = newArr.phone && !newArr.phone.startsWith('01') ? 
              setCheckPhone(true) : setCheckPhone(false)
    
        const findSameName = clients.find(e => e.name === newArr.name && e.code !== newArr.code)
        
        const checkName = newArr.name && findSameName ? 
                    setNameExist(true) : setNameExist(false)
    
     } , [newArr , clients])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!checkPhone && !nameExist){
            editClient(client.code , editedClients)
            isEdited(true)
            navigate(`/${initial_url.slice(1 , -2).join('/')}`)
            localStorage.setItem('branch' , 'clinetsList')
        }
    }

    const cancelEdit = () => {
        isEdited(false)
        navigate(`/${initial_url.slice(1 , -2).join('/')}`)
        localStorage.setItem('branch' , 'clinetsList')
    }

  return (
    <div className='mt-8'>
    <FormClientsModel 
            title="تعديل العميل"
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            codeVal={newArr.code}
            nameVal={newArr.name}
            phoneVal={newArr.phone}
            addressVal={newArr.address}
            nameExist={nameExist}
            checkPhone={checkPhone}
    />
    <ModelBtns handlecancel={() => setShow(true)} form='my-form' title="تعديل" cancelTitle='الغاء' btnStyle={'w-60 py-3 text-lg'} margin={'mt-10'} />
    {show && <ConfirmationButton title='هل تريد الغاء التعديل؟' confirm={cancelEdit} cancel={() => setShow(false)} />}
    </div>
  )
}

export default EditClient