const ConfirmDelete = ({err ,handleChange ,checkDelete,cancelDelete}) => {
  return (
    <div className='bg-popup fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
        <div className='bg-white p-6 rounded-lg'>
            <h3 className='text-lg'>ادخل رمز الحذف ليتم حذفه</h3>
            <div className='pt-6 items-center'>
                <input 
                    type='text' 
                    name='code' 
                    autoComplete="off"
                    placeholder='رمز الحذف' 
                    className={`border border-main rounded-md p-3 focus:outline-none ${err && 'border-red-500'}`} 
                    onChange={handleChange}
                />
                {err && <h4 className='text-red-500 text-sm mt-2 text-right'>الرمز غلط</h4>}
                <div className='flex justify-center items-center mt-2 gap-4'>
                    <button 
                        className='bg-main rounded-md text-white py-3 px-6 w-2/4'
                        onClick={checkDelete}>
                        تأكيد
                    </button>
                    <button 
                        className='rounded-md text-red-500 border w-2/4 border-red-500 py-3 px-6'
                        onClick={cancelDelete}
                    >
                        الغاء
                    </button>
                </div>
            </div>
        </div>
   </div>
  )
}

export default ConfirmDelete