import React, { useState } from 'react'
import FormExpenses from '../formmodels/FormExpenses'
import ModelBtns from '../ModelBtns'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStateValue } from '../../context/stateProvider'

const AddExpenses = ({isAdded}) => {

  const {addExpenses,expenses} = useStateValue()

  const [expensesList , setExpensesList] = useState(
      {code: expenses.length > 0 ? parseInt(expenses[expenses?.length - 1]?.code) + 1 : 1,date: '' || new Date(),total: '',reason: ''}
   )

   const navigate = useNavigate();
   const locatin = useLocation()
   const initial_url = locatin.pathname.split('/')

  function handleChange(event){
      if (event.target.name === 'total') {
        if(!isNaN(event.target.value)){
          setExpensesList(prevData => {
              return {
                  ...prevData,
                  [event.target.name] : event.target.value
              }
          })
        }
     }else{
      setExpensesList(prevData => {
          return {
              ...prevData,
              code: expenses.length > 0 ? parseInt(expenses[expenses?.length - 1]?.code) + 1 : 1,
              [event.target.name] : event.target.value
          }
      })
     }
  }

  const {code ,date,total,reason} = expensesList

  const handleSubmit = (e) => {
          e.preventDefault()
           addExpenses(code ,new Date(date).toLocaleDateString(),total,reason)
           isAdded(true)
           navigate(`/${initial_url.slice(1 , -1).join('/')}`)
           localStorage.setItem('branch' , 'expensesList')
   }

   const cancelAdd = () => {
      setExpensesList({code: '' ,date:'' , total: '',reason: ''})
      navigate(`/${initial_url.slice(1 , -1).join('/')}`)
      localStorage.setItem('branch' , 'expensesList')
   }

  return (
    <div className='mt-8'>
        <FormExpenses
           handleChange={handleChange}
           handleSubmit={handleSubmit}
           totalVal={expensesList.total}
           dateVal={expensesList.date}
           reasonVal={expensesList.reason}
         />
         <ModelBtns handlecancel={cancelAdd} form='my-form' title="تسجيل" cancelTitle='الغاء' btnStyle={'w-60 py-3 text-lg'} margin={'mt-10'} />
    </div>
  )
}

export default AddExpenses