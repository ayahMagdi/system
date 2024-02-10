import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import { faEdit, faStore } from "@fortawesome/free-solid-svg-icons"
import Statistics from "../components/Statistics"
import { Data } from "../components/handlechart/Data"
import BarChart from "../components/handlechart/BarChart"
import axios from "axios";
import Cookies from "universal-cookie"
import SuccessMsg from "../components/SuccessMsg"
import ConfirmSignout from "../components/ConfirmSignout"

const Landing = () => {

  const [logOut , setLogOut] = useState(false)
  const [show , setShow] = useState(false)
  const cookie = new Cookies()

  const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
    
  const confirmLogOut = () => {setLogOut(() => true)}

  const cancelLogOut = () => {setLogOut(() => false)}
  
  useEffect(() => {

    const successLogin = cookie?.get('login') === true ? setShow(true) : setShow(false) 
    
    setTimeout(() => {
      // setShow(false);
      removeCookie('login');
      // localStorage.removeItem('success');
      setShow(false)
    }, 2000);

  }, [cookie]);

  return (
    <div>
      <div className="flex justify-start items-start w-full gap-10">
        {show && <SuccessMsg title='تم تسجيل الدخول بنجاح' />}
        <div className="w-1/5">
           <Sidebar logOut={confirmLogOut} />
        </div>
        <div className="w-4/5 pl-8">
          <div className="">
             <BarChart />
          </div>
           <Statistics />
        </div>
        {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
      </div>
    </div>
  )
}

export default Landing