import logoImg from '../assets/Web capture_11-8-2023_151533_.jpeg'
import Search from './Search'
import SignOut from './SignOut'

const Navbar = ({handleSearch , searchItem}) => {
  
  return (
      <nav className='bg-white py-6'>
            <div className='h-20'>
              <div className='shadow-[0px_0px_25px_0px_rgba(0,0,0,.1)] py-3 px-5 rounded-md w-full flex justify-between items-center'>
              <Search handleSearch={handleSearch} searchItem={searchItem} />
              <SignOut />
              </div>
            </div>
      </nav>
    // <nav className='bg-white py-6'>
    //    <div className='h-20 flex justify-between items-center gap-12'>
    //         <div>
    //             <img src={logoImg} alt='logo' className='h-20' />
    //         </div>
    //         <div className='shadow-[0px_0px_25px_0px_rgba(0,0,0,.1)] py-3 px-5 rounded-md w-11/12 flex justify-between items-center'>
    //         <Search handleSearch={handleSearch} searchItem={searchItem} />
    //         <SignOut />
    //         </div>
    //    </div>
    // </nav>
  )
}

export default Navbar