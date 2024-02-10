import React from 'react'

const FormReduction = ({handleSubmit,codeText,codeval,nameval,nameText,dateval,handleChange,reductionval,checkTotal,checkValue}) => {
  return (
    <div className='mt-5'>
    <h2 className='text-center text-3xl font-bold text-main'>تنزيل الحساب</h2>
    <form className='mt-5' onSubmit={handleSubmit} id='my-form'>
        <div className={`grid grid-cols-2 gap-6`}>
            <div>
                <label className='mb-2 block font-bold'>{codeText}</label>
                <input
                    type='text'
                    className='w-full border p-3 rounded-lg border-gray-500 focus:outline-none'
                    name='code'
                    value={codeval}
                    disabled
                />
            </div>
            <div>
                <label className='mb-2 block font-bold'>{nameText}</label>
                <input
                    type='text'
                    className='w-full border p-3 rounded-lg border-gray-500 focus:outline-none'
                    name='name'
                    value={nameval}
                    disabled
                />
            </div> 
            <div>
                <label className='mb-2 block font-bold'>التاريخ</label>
                <input
                    type='text'
                    className='w-full border p-3 rounded-lg border-gray-500 focus:outline-none'
                    name='supplierCode'
                    onChange={handleChange}
                    value={dateval}
                />
            </div>
            <div>
                <label className='mb-2 block font-bold'>قيمة التنزيل</label>
                <input
                    type='text'
                    className={`w-full border p-3 rounded-lg focus:outline-none ${checkTotal || checkValue ? 'border-red-500' : 'border-gray-500'}`}
                    name='reduction'
                    placeholder='1000'
                    required
                    autoComplete='new-password'
                    value={reductionval}
                    onChange={handleChange}
                />
                {checkTotal && <p className="text-sm text-red-500 mt-2">لا يمكن ان تكون قيمة التنزيل اكبر من باقي الحساب</p>}
                {checkValue && <p className="text-sm text-red-500 mt-2">ادخل قيمة التنزيل</p>}
            </div>
        </div>  
    </form>
</div> 
  )
}

export default FormReduction