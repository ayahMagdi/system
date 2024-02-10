import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Category = ({icon ,title , url , handelBranch}) => {

  return (
   <Link to={url}>
      <div className='flex justify-center items-center bg-main rounded-md text-white' onClick={handelBranch}>
        <div className='text-center py-9 px-6'>
            <FontAwesomeIcon icon={icon} className='text-lg' />
            <h3 className='text-lg pt-2'>{title}</h3>
        </div>
      </div>
   </Link>
  )
}

export default Category