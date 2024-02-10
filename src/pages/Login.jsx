import logoImg from '../assets/Frame 48095522.png'
import Form from '../components/Form'

const Login = () => {

  return (
    <div className='flex justify-between h-screen overflow-hidden'>
        <div className="flex justify-center items-center text-center w-7/12">
            <Form />
        </div>
        <div className='hidden lg:flex justify-start items-center relative w-5/12'>
            <img src={logoImg} alt='logo' className='w-full' />
        </div>
    </div>
  )
}

export default Login