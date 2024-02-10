import React from 'react'
import ConfirmationButton from './ConfirmationButton'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const ConfirmSignout = ({handleCancel}) => {

    const cookies = new Cookies();
    const navigate = useNavigate();
  
    const handleConfirm = () => {
      cookies.remove('username' , { path: '/'})
      localStorage.clear();
      navigate('/login')
    }

  return (
    <ConfirmationButton title='هل تريد تسجيل الخروج؟' confirm={handleConfirm} cancel={handleCancel} />
  )
}

export default ConfirmSignout