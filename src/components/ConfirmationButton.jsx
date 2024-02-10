
const ConfirmationButton = ({confirm , cancel , title}) => {
  return (
    <div className='bg-popup fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50'>
        <div className='bg-white p-6 rounded-lg'>
            <h3 className='text-lg text-black'>{title}</h3>
            <div className='flex pt-6 justify-between items-center gap-2'>
              <button className='w-2/4 bg-succuss rounded-2xl p-2 text-white' onClick={confirm}>نعم</button>
              <button className='w-2/4 bg-danger rounded-2xl p-2 text-white' onClick={cancel}>لا</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationButton