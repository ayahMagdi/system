import React from 'react'
import ModelBtns from '../ModelBtns'
import FormReports from '../formmodels/FormReports'

const Reports = ({handlecancel ,handleChangeCodes ,handleChangeNames ,handleChangeActions,codeoptions,nameoptions,actionoptions,
    handleSubmit,codeval,nameval,actionval}) => {

    return (
        <div className='my-3'>
           <FormReports
                 handleChangeCodes={handleChangeCodes}
                 handleChangeNames={handleChangeNames}
                 handleChangeActions={handleChangeActions}
                 codeoptions={codeoptions}
                 nameoptions={nameoptions}
                 actionoptions={actionoptions}
                 handleSubmit={handleSubmit}
                 codeval={codeval}
                 nameval={nameval}
                 actionval={actionval}
            />
            <ModelBtns title='بحث' form='my-form' cancelTitle='تفريغ الحقول' handlecancel={handlecancel} btnStyle={'w-40 py-2'} margin={'mt-5'} />
        </div>
      )
}

export default Reports