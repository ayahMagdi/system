import Select from 'react-select'

const FormReports = ({handleSubmit , codeoptions ,codeval ,handleChangeCodes ,nameoptions ,nameval ,handleChangeNames ,actionoptions ,actionval ,handleChangeActions}) => {
  return (
    <div className='mt-5'>
    <h2 className='text-center text-3xl font-bold text-main'>حركة الاصناف</h2>
    <form className='mt-5' onSubmit={handleSubmit} id='my-form'>
        <div className='grid grid-cols-3 gap-6 mb-4'>
            <div>
                <label className='mb-2 block font-bold'>كود الصنف</label>
                <Select
                    closeMenuOnSelect={true}
                    // isMulti
                    options={codeoptions}
                    isClearable
                    name='code'
                    value={codeval}
                    onChange={handleChangeCodes}
                    placeholder='اختر كود الصنف'
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
                <label className='mb-2 block font-bold'>اسم الصنف</label>
                <Select
                    closeMenuOnSelect={true}
                    isClearable
                    options={nameoptions}
                    name='name'
                    value={nameval}
                    onChange={handleChangeNames}
                    placeholder='اختر اسم الصنف'
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
                <label className='mb-2 block font-bold'>نوع الحركة</label>
                <Select
                    closeMenuOnSelect={true}
                    options={actionoptions}
                    name='itemname'
                    isClearable
                    value={actionval}
                    onChange={handleChangeActions}
                    placeholder='اختر نوع الحركة'
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
        </div>
    </form>
  </div> 
  )
}

export default FormReports