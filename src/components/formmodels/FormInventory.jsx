import Select from 'react-select'

const FormInventory = ({title,handleSubmit ,dateoptions ,startDateval,endDateval,totalVal,handleChangeStartDate ,handleChangeEndDate}) => {
  return (
    <div className='my-2'>
    <h2 className='text-center text-3xl font-bold text-main my-3'>{title}</h2>
        <form className='mt-5' onSubmit={handleSubmit} id='my-form'>
            <div className='grid grid-cols-3 gap-6 mb-4'>
                <div>
                    <label className='mb-2 block font-bold'>تاريخ البداية</label>
                    <Select
                        closeMenuOnSelect={true}
                        isClearable={true}
                        options={dateoptions}
                        name='startDate'
                        value={startDateval}
                        onChange={handleChangeStartDate}
                        placeholder='اختر تاريخ البداية'
                        styles={{
                            control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: 'rgb(107, 114 ,128)',
                            padding: '0.3rem',
                            borderRadius: '14px',
                            }),
                        }}
                />
                </div>
                <div>
                    <label className='mb-2 block font-bold'>تاريخ النهاية</label>
                    <Select
                        closeMenuOnSelect={true}
                        options={dateoptions}
                        isClearable={true}
                        name='endDate'
                        value={endDateval}
                        onChange={handleChangeEndDate}
                        placeholder='اختر تاريخ النهاية'
                        styles={{
                            control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: 'rgb(107, 114 ,128)',
                            padding: '0.3rem',
                            borderRadius: '14px',
                            }),
                        }}
                />
                </div> 
                <div>
                    <label className='mb-2 block font-bold'>اجمالي الدخل</label>
                    <input 
                       type='text'
                       disabled
                       value={totalVal}
                       className='border border-gray-500 p-2 rounded-xl w-full h-12'
                    />
                </div> 
            </div>
        </form>
    </div>
  )
}

export default FormInventory