import React, { useState } from 'react'
import FormExpenses from '../formmodels/FormExpenses'
import ModelBtns from '../ModelBtns'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useStateValue } from '../../context/stateProvider';

const EditExpenses = ({isEdited,expense}) => {


  const {editExpenses ,expenses} = useStateValue()
    
  const [newArr , setNewArr] = useState(
    {code: expense?.code,date: expense?.date,total: expense?.total,reason: expense?.reason}
 )

    const navigate = useNavigate();
    const locatin = useLocation()
    const initial_url = locatin.pathname.split('/')
    const param = useParams()

    const  {code , date , total , reason} = newArr

    const editedExpenses = newArr

    function handleChange(event){
        if (event.target.name === 'total') {
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

    const handleSubmit = (e) => {
        e.preventDefault()
        editExpenses(expense.code , editedExpenses)
        isEdited(true)
        navigate(`/${initial_url.slice(1 , -2).join('/')}`)
        localStorage.setItem('branch' , 'expensesList')
    }

    const cancelEdit = () => {
        isEdited(false)
        setNewArr({code: '' ,date:'' , total: '',reason: ''})
        navigate(`/${initial_url.slice(1 , -2).join('/')}`)
         localStorage.setItem('branch' , 'expensesList')
    }

  return (
    <div className='mt-8'>
        <FormExpenses
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        totalVal={newArr.total}
        dateVal={newArr.date}
        reasonVal={newArr.reason}
        />
        <ModelBtns handlecancel={cancelEdit} form='my-form' title="تسجيل" cancelTitle='الغاء' btnStyle={'w-60 py-3 text-lg'} margin={'mt-10'} />
    </div>
  )
}

export default EditExpenses