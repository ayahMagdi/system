import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import CryptoJS from 'crypto-js';

const Form = () => {

  const userRef = useRef()
  const navigate = useNavigate();
  const [formInfo , setFormInfo] = useState({username: '' , password: ''})
  const [success , setSuccess] = useState(false)

  const cookies = new Cookies();
  
  const yourEncryptionFunction = (value) => {
    const secretKey = 'your-secret-key';
    const encryptedValue = CryptoJS.AES.encrypt(value, secretKey).toString();
    return encryptedValue;
  };
  
    useEffect(() => {
      userRef.current.focus()
    } , [])

    const setCookie = (name, value, days) => {
      const expires = new Date();
      expires.setDate(expires.getDate() + days);
      const cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
      document.cookie = cookie;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      cookies.set("username" , yourEncryptionFunction(formInfo.username) , { path: '/'})
      setCookie('login', true, 1);
      setSuccess(true)
      navigate('/landingpage')
    }

    useEffect(() => {
      window.localStorage.setItem("username" , formInfo.username)
    },[success , formInfo.username])

    function handleChange(event){
      setFormInfo(prevData => {
          return {
              ...prevData, 
              [event.target.name] : event.target.value
          }
      })
    }

  return (
    <form onSubmit={handleSubmit} className='px-4 w-8/12'>
        <h2 className="text-main font-bold text-4xl mb-2">مرحبا بكم في المتجر الذكي</h2>
        <h3 className="text-gray-400 text-lg mb-6">سعداء برؤيتكم مرة اخري</h3>
        <div className="mb-4 relative">
            <div className="text-main font-lg absolute top-4 px-4">
            <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <input 
                name="username" 
                type="text"
                ref={userRef} 
                onChange={handleChange}
                placeholder="اسم المستخدم" 
                autoComplete='off'
                required
                onInvalid={F => F.target.setCustomValidity('يرجي ملء هذا الحقل')} 
                onInput={F => F.target.setCustomValidity('')} 
                className="bg-gray-200 w-full p-4 px-10 rounded-lg focus:outline-main" 
            />
        </div>
        <div className="mb-2 relative">
            <div className="text-main font-lg absolute top-4 px-4">
                <FontAwesomeIcon icon={faLock} />
            </div>
            <input 
                name="password" 
                type="password" 
                onChange={handleChange}
                required
                onInvalid={F => F.target.setCustomValidity('يرجي ملء هذا الحقل')} 
                onInput={F => F.target.setCustomValidity('')} 
                placeholder="كلمة المرور" 
                className="bg-gray-200 w-full p-4 pr-10 rounded-lg focus:outline-main" 
            />
        </div>
        <h3 className='text-gray-400 mb-6 text-right cursor-pointer'>هل نسيت كلمة المرور؟</h3>
        <button className="bg-main w-full p-4 rounded-lg text-white text-lg hover:bg-hover transition-all">
            تسجيل الدخول
        </button>
    </form>
  )
}

export default Form