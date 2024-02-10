import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Search from '../components/Search'
import Category from '../components/Category'
import Goback from '../components/Goback'
import ConfirmSignout from '../components/ConfirmSignout'

const Accountstatements = ({searchItem , search}) => {

      const categorys = [
          {title: 'كشف حساب الموردين' , icon: faMoneyBill1Wave , url: '/homepage/Accountstatements/supplierbalance' , branch: 'suppliersBills' },
          {title: 'كشف حساب العملاء' , icon: faMoneyBill1Wave , url: '/homepage/Accountstatements/clientbalance' ,  branch: 'clientsBills'},
      ]

      const [logOut , setLogOut] = useState(false)

      const confirmLogOut = () => {setLogOut(() => true)}
    
      const cancelLogOut = () => {setLogOut(() => false)}
  
      const handleSearch = categorys.filter(category => 
        search && category && category.title.includes(search)
      )

      const setBranch = (branch) => {
        localStorage.setItem('branch' , branch)
      }

  return (
    <div>
    <div className="flex justify-start items-start w-full gap-10">
        <div className="w-1/5">
          <Sidebar logOut={confirmLogOut} />
        </div>
        <div className="w-4/5 pl-8 mt-5">
        <Search
              handleSearch={() => handleSearch}  
              searchItem={searchItem}
              placeholder='ابحث بالاسم' 
        />
        <div className='bg-white grid grid-cols-5 gap-5 justify-between items-center mt-4 cursor-pointer'>
            {handleSearch.length && search.length ? handleSearch?.map((e , i) => (
                <Category icon={e.icon} title={e.title} url={e.url} key={i} handelBranch={() => setBranch(e.branch)} />
              ))
              :categorys?.map((e , i) => (
                <Category icon={e.icon} title={e.title} url={e.url} key={i} handelBranch={() => setBranch(e.branch)} />
              ))}
        </div>
        <Goback />
        </div>
        {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
    </div>
  </div>
  )
}

export default Accountstatements