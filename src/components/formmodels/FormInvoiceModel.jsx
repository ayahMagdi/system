import React from 'react'

const FormInvoiceModel = ({handleSubmit , handleChange,discountDisabled ,handleInputChange,discountErr,totalDisabled,reductionErr , totalVal ,discountVal,totalwdVal , reductionVal , remainingVal , itemsVal}) => {
  return (
    <div>
        <form className='my-4' onSubmit={handleSubmit} id='my-form'>
            <div className='grid grid-cols-6 gap-6'>
                <div>
                    <label className='mb-2 block font-bold'>اجمالي الفاتورة</label>
                    <input
                        type='text'
                        className='w-full border p-2 rounded-lg border-gray-500 focus:outline-none focus:empty:border-main focus:invalid:border-red-500'
                        name='total'
                        disabled
                        onChange={handleChange}
                        placeholder='مثال (123456789)'
                        value={totalVal}
                    />
                </div>
                <div>
                    <label className='mb-2 block font-bold'>نسبة الخصم</label>
                    <input
                        type='text'
                        className={`w-full border p-2 rounded-lg focus:outline-none ${discountErr ? 'border-red-500 focus:empty:border-red-500' : 'border-gray-500 focus:empty:border-main'}`}
                        name='discount'
                        required
                        disabled={discountDisabled}
                        onKeyDown={handleInputChange}
                        onChange={handleChange}
                        onInvalid={F => F.target.setCustomValidity('يرجي ملء هذا الحقل')} 
                        onInput={F => F.target.setCustomValidity('')}
                        placeholder='مثال (35%)'
                        value={discountVal}
                    />
                    {discountErr && <p className='text-sm text-red-500 m-0'>ادخل نسبة خصم صحيحة</p>}
                </div> 
                <div>
                    <label className='mb-2 block font-bold'>الاجمالي بعد الخصم</label>
                    <input
                        type='text'
                        className='w-full border p-2 rounded-lg border-gray-500 focus:empty:border-main focus:outline-none focus:invalid:border-red-500'
                        name='totalwd'
                        disabled
                        placeholder='5000'
                        onChange={handleChange}
                        value={totalwdVal}
                    />
                </div>
                <div>
                    <label className='mb-2 block font-bold'>تنزيل</label>
                    <input
                        type='text'
                        className={`w-full border p-2 rounded-lg focus:outline-none ${reductionErr ? 'border-red-500 focus:empty:border-red-500' : 'border-gray-500 focus:empty:border-main'}`}
                        name='reduction'
                        required
                        disabled={totalDisabled}
                        autoComplete='off'
                        onInvalid={F => F.target.setCustomValidity('يرجي ملء هذا الحقل')} 
                        onInput={F => F.target.setCustomValidity('')}
                        placeholder='مثال (50)'
                        onKeyDown={handleInputChange}
                        onChange={handleChange}
                        value={reductionVal}
                    />
                    {reductionErr && <p className='text-sm text-red-500 m-0'>لا يمكن ان تكون قيمة التنزيل اكبر من باقي الحساب</p>}
                </div>
                <div>
                    <label className='mb-2 block font-bold'>باقي الحساب</label>
                    <input
                        type='text'
                        className='w-full border p-2 rounded-lg border-gray-500 focus:empty:border-main focus:outline-none focus:invalid:border-red-500'
                        name='remaining'
                        disabled
                        placeholder='2000'
                        onChange={handleChange}
                        value={remainingVal}
                    />
                </div>
                <div>
                    <label className='mb-2 block font-bold'>عدد الاصناف</label>
                    <input
                        type='text'
                        className='w-full border p-2 rounded-lg border-gray-500 focus:empty:border-main focus:outline-none focus:invalid:border-red-500'
                        name='items'
                        disabled
                        placeholder='5000'
                        onChange={handleChange}
                        value={itemsVal}
                    />
                </div>
            </div>  
        </form>
    </div>
  )
}

export default FormInvoiceModel