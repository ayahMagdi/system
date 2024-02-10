import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex justify-center items-center flex-col w-screen h-screen'>
            <h2 className='uppercase font-bold text-xl mb-4'>الصفحة مش موجودة</h2>
            <Link to={'/landingpage'} className='uppercase transition-all font-bold border px-4 py-2 rounded-md bg-main text-white hover:bg-white hover:text-main hover:border-main'>الصفحة الرئيسية</Link>
    </div>
  )
}

export default NotFound