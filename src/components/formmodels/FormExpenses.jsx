import React from 'react'

const FormExpenses = ({handleSubmit ,handleChange ,dateVal ,totalVal ,reasonVal}) => {
  return (
    <div className='mt-8'>
        <h2 className='text-center text-3xl font-bold text-main'>اصافة المصاريف</h2>
        <form className='mt-10' onSubmit={handleSubmit} id='my-form'>
         <div className='grid grid-cols-2 gap-6'>
           <div>
                <div className='mb-5'>
                    <label className='mb-4 block font-bold'>التاريخ</label>
                    <input
                        type='date'
                        className='w-full border px-4 h-14 rounded-2xl shadow-sm focus:outline-none border-gray-500'
                        name='date'
                        onChange={handleChange}
                        placeholder='20/10/2020'
                        value={dateVal}
                    />
                </div>
                <div>
                    <label className='mb-4 block font-bold'>قيمة المصروف</label>
                    <input
                        type='text'
                        className='w-full border px-4 h-14 rounded-2xl shadow-sm focus:outline-none border-gray-500'
                        name='total'
                        required
                        onChange={handleChange}
                        onInvalid={F => F.target.setCustomValidity('يرجي ملء هذا الحقل')} 
                        onInput={F => F.target.setCustomValidity('')}
                        placeholder='مثال (500)'
                        value={totalVal}
                        autoComplete='new-password'
                        maxLength='6'
                    />
                </div>
           </div>
           <div>
               <div>
                    <label className='mb-4 block font-bold'>سبب الصرف</label>
                    <textarea
                        className='w-full resize-none border p-4 h-44 rounded-2xl shadow-sm focus:outline-none border-gray-500'
                        name='reason'
                        onChange={handleChange}
                        placeholder='فاتورة الكهربا'
                        value={reasonVal}
                        autoComplete='new-password'
                    />
                </div>
           </div>
         </div> 
       </form>
   </div>
  )
}

export default FormExpenses