import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faSquarePlus } from '@fortawesome/free-solid-svg-icons'

const Buttons = ({urlAdd, title , branch , mr ,handlePrint}) => {

    const handleAdd = () => {
        localStorage.setItem('branch' , branch)
    }
    
  return (
    <div className={`flex justify-start gap-4 ${mr}`}>
        <Link to={`/homepage/${urlAdd}`} onClick={handleAdd}>
            <div className={`bg-main text-white rounded-md text-center py-4 cursor-pointer w-32 text-sm font-bold`}>
                <FontAwesomeIcon icon={faSquarePlus} />
                <h3 className='mt-1'>{`اضافة ${title} جديد`}</h3>
            </div>
        </Link>
        <div onClick={handlePrint}>
            <div className={`bg-white border-2 rounded-md text-center py-4 cursor-pointer w-32 text-sm font-bold border-main text-main`}>
                <FontAwesomeIcon icon={faPrint} className='text-sm' />
                <h3 className='mt-1'>طباعة</h3>
            </div>
        </div>
    </div>
  )
}

export default Buttons