import { useEffect, useState } from "react"
import Content from "../components/Content"
import Navbar from "../components/Navbar"
import SuccessMsg from "../components/SuccessMsg"
import { useStateValue } from "../context/stateProvider"
import axios from "axios"
import Sidebar from "../components/Sidebar"
import Search from "../components/Search"
import ConfirmSignout from "../components/ConfirmSignout"
import { faBalanceScaleLeft, faEdit, faFileArchive, faMoneyCheckAlt, faPeopleGroup, faPrint, faSackDollar, faStore, faUsers } from "@fortawesome/free-solid-svg-icons"

const Homepage = ({searchItem , search}) => {


  const [logOut , setLogOut] = useState(false)

  const categorys = [
    {title: 'الاصناف' , icon: faEdit , url: '/homepage/allproducts' , branch: 'itemsList'},
    {title: 'المخزن' , icon: faStore , url: '/homepage/store'},
    {title: 'الموردين' , icon: faUsers , url: '/homepage/allsuppliers' , branch: 'suppliersList'},
    {title: 'العملاء' , icon: faPeopleGroup , url: '/homepage/allclients' , branch: 'clinetsList'},
    {title: 'المشتريات' , icon: faSackDollar , url: '/homepage/purchases'},
    {title: 'المبيعات' , icon: faBalanceScaleLeft , url: '/homepage/sales'},
    {title: 'بيانات المشتريات' , icon: faBalanceScaleLeft , url: '/homepage/purchasesinfo'},
    {title: 'بيانات المبيعات' , icon: faBalanceScaleLeft , url: '/homepage/salesinfo'},
    {title: 'طباعة الفواتير' , icon: faPrint , url: '/homepage/printbills'},
    {title: 'كشوفات الحسابات' , icon: faMoneyCheckAlt , url: '/homepage/Accountstatements'},
    {title: 'المصاريف' , icon: faMoneyCheckAlt , url: '/homepage/expensespage' , branch: 'expensesList'},
    {title: 'التقارير' , icon: faFileArchive , url: '/homepage/reports'}
  ]

  const handleSearch = categorys.filter(category => 
    search && category.title.includes(search)
  )

  const confirmLogOut = () => {setLogOut(() => true)}

  const cancelLogOut = () => {setLogOut(() => false)}

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
           <Content 
              categorys={search?.length > 0 && handleSearch?.length === 0 ? [] : categorys} 
              isSearched={handleSearch?.length && search?.length} 
              filteredItems={handleSearch}
           />
        </div>
        {logOut && <ConfirmSignout handleCancel={cancelLogOut} />}
      </div>
    </div>
    
  )
}

export default Homepage