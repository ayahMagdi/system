const FormClientsModel = ({handleSubmit ,title ,handleChange,checkPhone ,codeVal,nameExist ,nameVal ,phoneVal ,addressVal}) => {
  return (
    <div>
        <div className='mt-8'>
        <h2 className='text-center text-3xl font-bold text-main'>{title}</h2>
        <form className='mt-10' onSubmit={handleSubmit} id='my-form'>
            <div className='grid grid-cols-2 gap-6'>
                <div>
                    <label className='mb-4 block'>كود العميل</label>
                    <input
                        type='text'
                        className='w-full border px-4 h-14 rounded-2xl shadow-md focus:outline-none border-gray-200'
                        name='code'
                        disabled
                        onChange={handleChange}
                        placeholder='مثال (123456789112288)'
                        value={codeVal}
                    />
                </div>
                <div>
                    <label className='mb-4 block'>اسم العميل</label>
                    <input
                        type='text'
                        className={`w-full border px-4 h-14 rounded-2xl shadow-md focus:outline-none border-gray-200 ${nameExist && 'border-red-500'}`}
                        name='name'
                        required
                        autoComplete='new-password'
                        minLength='3'
                        maxLength='20'
                        onInvalid={F => F.target.setCustomValidity('يرجي ملء هذا الحقل')} 
                        onInput={F => F.target.setCustomValidity('')}
                        onChange={handleChange}
                        placeholder='مثال (اسم المنتج)'
                        value={nameVal}
                    />
                    {nameExist && <p className='text-red-500 mt-3'>هذا العميل موجود بالفعل</p>}
                </div> 
                <div>
                    <label className='mb-4 block'>رقم الهاتف</label>
                      <input
                        type='text'
                        minLength="11" 
                        maxLength="11"
                        pattern="^01\d{9}$"
                        className={`w-full border px-4 h-14 rounded-2xl shadow-md focus:outline-none border-gray-200 ${checkPhone && 'border-red-500'}`}
                        name='phone'
                        autoComplete='new-password'
                        placeholder='01123456789'
                        onChange={handleChange}
                        value={phoneVal}
                      />
                      {checkPhone && <p className='text-red-500 mt-3'> رقم الهاتف يبدأ ب (01) </p>}
                </div>
                <div>
                    <label className='mb-4 block'>العنوان</label>
                    <input
                        type='text'
                        className='w-full border px-4 h-14 rounded-2xl shadow-md focus:outline-none border-gray-200'
                        name='address'
                        minLength='3'
                        maxLength='30'
                        autoComplete='new-password'
                        onInvalid={F => F.target.setCustomValidity('يرجي ملء هذا الحقل')} 
                        onInput={F => F.target.setCustomValidity('')}
                        placeholder='مصر محافظة الشرقية'
                        onChange={handleChange}
                        value={addressVal}
                    />
                </div>
            </div>   
        </form>
        </div> 
    </div>
  )
}

export default FormClientsModel