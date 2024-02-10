import React, { useEffect, useState } from 'react'
import SuccessMsg from '../SuccessMsg'

const ConfirmationComponent = ({addMsg,editMsg,name,deletedMsg}) => {

  return (
    <div>
         {addMsg ? <SuccessMsg title={`تمت اضافة ${name}`} /> 
              : deletedMsg ? <SuccessMsg title={`تم حذف ${name}`} /> 
              : editMsg ? <SuccessMsg title={`تم تعديل ${name}`} /> 
              : ''
            }
    </div>
  )
}

export default ConfirmationComponent