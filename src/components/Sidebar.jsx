import { faAdd, faBoxesStacked, faChartArea, faChartBar, faChevronDown, faChevronUp, faCircleXmark, faCoins, faEdit, faFileAlt, faFileInvoice, faFileLines, faFilePowerpoint, faFilter, faFingerprint, faGears, faGripLinesVertical, faHome, faList, faListDots, faMoneyCheck, faPhoneVolume, faPrint, faRemove, faStar, faStore, faStoreAlt, faStoreSlash, faTrash, faTrashAlt, faUserAltSlash, faUserCheck, faUserGroup, faUserPlus, faUsers, faUsersBetweenLines, faUsersCog, faUsersLine, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link , useLocation } from 'react-router-dom'
import logoImg from '../assets/730d1b67.png'
import SignOut from './SignOut'

const Sidebar = ({logOut}) => {

    const [activeLink, setActiveLink] = useState('home');
    const [activeBranch, setActiveBranch] = useState('');
    const [sidebarLinks , setSidebarLinks] = useState([
        {
            title: 'الرئيسية',
            link: '/landingpage',
            icon: faHome,
            active: 'home'
        },
        {
            title: 'المخزن',
            link: '/homepage/store',
            icon: faStore,
            active: 'store'
        },
        {
            title: 'الاصناف',
            link: '/homepage/allproducts',
            active: 'items',
            icon: faBoxesStacked,
            branches : [
                {
                    title: 'قائمة الاصناف',
                    active: 'itemsList',
                    link: '/homepage/allproducts',
                    icon: faList
                },
                {
                    title: 'اضافة صنف جديد',
                    active: 'addItem',
                    link: '/homepage/allproducts/addproduct',
                    icon: faAdd
                },
                {
                    title: 'تعديل صنف',
                    active: 'editItem',
                    link: '/homepage/allproducts',
                    icon: faEdit
                },
                {
                    title: 'حذف صنف',
                    active: 'deleteItem',
                    link: '/homepage/allproducts',
                    icon: faTrashAlt
                },
            ]
        },
        {
            title: 'الموردين',
            link: '/homepage/allsuppliers',
            icon: faUsers,
            active: 'suppliers',
            branches : [
                {
                    title: 'قائمة الموردين',
                    active: 'suppliersList',
                    link: '/homepage/allsuppliers',
                    icon: faUsersBetweenLines
                },
                {
                    title: 'اضافة مورد جديد',
                    active: 'addSupplier',
                    link: '/homepage/allsuppliers/addSupplier',
                    icon: faUserPlus
                },
                {
                    title: 'نعديل مورد',
                    active: 'editSupplier',
                    link: '/homepage/allsuppliers',
                    icon: faUserCheck
                },
                {
                    title: 'حذف مورد',
                    active: 'deleteSupplier',
                    link: '/homepage/allsuppliers',
                    icon: faUserAltSlash
                },
            ]
        },
        {
            title: 'العملاء',
            link: '/homepage/allclients',
            icon: faUsersLine,
            active: 'clients',
            branches : [
                {
                    title: 'قائمة العملاء',
                    active: 'clinetsList',
                    link: '/homepage/allclients',
                    icon: faUsersBetweenLines
                },
                {
                    title: 'اضافة عميل جديد',
                    active: 'addClient',
                    link: '/homepage/allclients/addClient',
                    icon: faUserPlus
                },
                {
                    title: 'نعديل عميل',
                    active: 'editClient',
                    link: '/homepage/allclients',
                    icon: faUserCheck
                },
                {
                    title: 'حذف عميل',
                    active: 'deleteClient',
                    link: '/homepage/allclients',
                    icon: faUserAltSlash
                },
            ]
        },
        {
            title: 'فاتورة المشتريات',
            link: '/homepage/purchases',
            icon: faStar,
            active: 'purchases'
        },
        {
            title: 'فاتورة المبيعات',
            link: '/homepage/sales',
            icon: faChartArea,
            active: 'sales'
        },
        {
            title: 'بيانات المشتريات',
            link: '/homepage/purchasesinfo',
            icon: faFileAlt,
            active: 'purchasesInfo',
            branches : [
                {
                    title: 'عرض فواتير المشتريات',
                    active: 'purchasesList',
                    link: '/homepage/purchasesinfo/inwardbills',
                    icon: faFileLines
                },
                {
                    title: 'جرد المشتريات',
                    link: '/homepage/purchasesinfo/inventoryincome',
                    icon: faFilter,
                    active: 'purchasesInventory'
                },
            ]
        },
        {
            title: 'بيانات المبيعات',
            link: '/homepage/salesinfo',
            icon: faFileAlt,
            active: 'salesInfo',
            branches : [
                {
                    title: 'عرض فواتير المبيعات',
                    active: 'salesList',
                    link: '/homepage/salesinfo/outwardbills',
                    icon: faFileLines
                },
                {
                    title: 'جرد المبيعات',
                    link: '/homepage/salesinfo/inventoryoutcome',
                    icon: faFilter,
                    active: 'salesInventory'
                },
            ]
        },
        {
            title: 'طباعة الفواتير',
            link: '/homepage/printbills', 
            icon: faPrint,
            active: 'invoices',
            branches : [
                {
                    title: 'طباعة فواتير الموردين',
                    active: 'suppliersPrint',
                    link: '/homepage/printbills/supplierbills',
                    icon: faFileInvoice
                },
                {
                    title: 'طباعة فواتير العملاء',
                    active: 'clientsPrint',
                    link: '/homepage/printbills/clientbills',
                    icon: faFileInvoice
                },
                // {
                //     title: 'طباعة فواتير المرتجعات',
                //     active: 'returnsPrint',
                //     link: '/returnbills',
                //     icon: faFileInvoice
                // },
            ]
        },
        {
            title: 'كشوفات الحسابات',
            link: '/homepage/Accountstatements',
            icon: faMoneyCheck,
            active: 'bills',
            branches : [
                {
                    title: 'كشف حساب الموردين',
                    active: 'suppliersBills',
                    link: '/homepage/Accountstatements/supplierbalance',
                    icon: faCoins
                },
                {
                    title: 'كشف حساب العملاء',
                    active: 'clientsBills',
                    link: '/homepage/Accountstatements/clientbalance',
                    icon: faCoins
                },
            ]
        },
        // {
        //     title: 'المرتجعات',
        //     link: '/homepage/returns',
        //     icon: faCircleXmark,
        //     active: 'returns'
        // },
        {
            title: 'المصاريف',
            link: '/homepage/expensespage',
            icon: faWallet,
            active: 'expenses',
            branches : [
                {
                    title: 'قائمة المصاريف',
                    active: 'expensesList',
                    link: '/homepage/expensespage',
                    icon: faAdd
                },
                {
                    title: 'اضافة مصروف',
                    active: 'addexpense',
                    link: '/homepage/expensespage/addexpenses',
                    icon: faAdd
                },
                {
                    title: 'تعديل مصروف',
                    active: 'editexpense',
                    link: '/homepage/expensespage',
                    icon: faEdit
                },
                {
                    title: 'حذف مصروف',
                    active: 'deleteexpense',
                    link: '/homepage/expensespage',
                    icon: faEdit
                },
            ]
        },
        {
            title: 'التقارير',
            link: '/homepage/reports',
            icon: faChartBar,
            active: 'reports'
        },
        {
            title: 'اعدادات النظام',
            link: '',
            icon: faGears,
            active: 'settings'
        },
        {
            title: 'تواصل معنا',
            link: '',
            icon: faPhoneVolume,
            active: 'contact'
        },
    ])

    const location = useLocation()
    const [stop , setStop] = useState(false)

    const handleClick = (link) => {
        setStop(true) 
        setActiveLink(link);
        localStorage.removeItem('branch')
        if (link === activeLink) {
            setActiveLink(null);
          } else {
            setActiveLink(link);
          }
    };

    const [myObject, setMyObject] = useState();

    const handleClickBranch = (link) => {
        setStop(true)
        localStorage.setItem('branch' , link)
        // setActiveBranch(activeBranchData);
        // console.log(localStorage.getItem('branch'))
    }; 
    
    const pattern = /^\/homepage\/storepage\/allproducts\/editproduct\/\d+$/;

    useEffect(() => {

        const parts = location.pathname.split('/'); // Split the URL by "/"
        const lastPart = parts[parts.length - 1]; // Get the last part of the URL
        // Check if the last part is a number
        const isNumber = /^\d+$/.test(lastPart);      

        let checkLocation = sidebarLinks?.find(e => e.link === location.pathname)
        const isMatch = pattern.test(location.pathname);
    
        if (isMatch) {
            const pathParts = location.pathname.slice(1).split('/');
            checkLocation = sidebarLinks?.find(e => e.link === `/${pathParts.slice(0, -2).join('/')}`);
            const checkBranchupdate = checkLocation.branches.find(branch => branch.active.includes('edit'))
            if(checkBranchupdate){
                localStorage.setItem('branch' , checkBranchupdate.active)
            }
        }

        let checkLocationNested = sidebarLinks?.find(e => e.branches?.find(b => b.link === location.pathname))
        let checkTest = checkLocationNested?.branches.filter(e => e.link === location.pathname)
        if(!stop) {
            let checkLocationNestedLik = checkLocationNested?.branches?.filter(e => e.link === location.pathname)
              setActiveLink(checkLocation ? checkLocation?.active : checkLocationNested?.active)
              
            let checkLocalStorage = localStorage.getItem('branch') && sidebarLinks?.find(e => e.branches?.find(b => b.active === localStorage.getItem('branch')))
              checkLocalStorage && setActiveLink(checkLocalStorage?.active)
              
            }

            setActiveBranch(localStorage.getItem('branch'));
            

        const addPattern = [/^\/homepage\/\w+\/\w+\/add\w+$/i , /^\/homepage\/\w+\/add\w+$/i ]
        const isAddMatch = addPattern.filter(pat => pat.test(location.pathname))
         
        if(checkLocationNested === undefined && isAddMatch.length <= 0 && !isNumber  ){
             localStorage.removeItem('branch')
             setActiveBranch(null)
        }

    }, [location.pathname , localStorage.getItem('branch')])

  return (
    <div className='fixed px-6 top-0 bottom-0 right-0 w-1/5 bg-gradient-to-b from-main to-[rgb(51_159_247)] text-white shadow-3xl h-full'>
        <div className='p-7 flex justify-center rounded-full'>
            <img src={logoImg} alt='logo' className='w-40' />
        </div>
       <div>
        {sidebarLinks?.map(e => (
            <div className='border-b border-[#e5e7eb24] last-of-type:border-none' key={e.active}>
                <div className={`py-[5px] px-6 font-bold rounded-2xl cursor-pointer ${activeLink === e.active && 'bg-gradient-to-l from-[rgb(250_250_250)] to-[rgb(225_234_238)] transition-all'}`} onClick={() => handleClick(e.active)}>
                    <Link to={e.branches ? '' : e.link} className={`flex justify-between transition-all relative ${activeLink === e.active && 'text-main'}`}>
                        <div className={`flex justify-start items-center gap-3`}>
                            <FontAwesomeIcon icon={e.icon} />
                            <div>{e.title}</div>
                        </div>
                        {e.branches && 
                            <div>
                                <FontAwesomeIcon icon={activeLink === e.active ? faChevronUp : faChevronDown} />
                            </div>
                        } 
                    </Link>
                </div>
                {e.branches && <div className={`py-1 px-7 transition-all ${activeLink === e.active ? 'h-auto opacity-100 block' : 'h-0 opacity-0 hidden'}`}>
                    {e.branches?.map(b => (
                        <div className='border-b border-[#e5e7eb24] cursor-pointer font-bold last-of-type:border-none hover:bg-gradient-to-l hover:from-[rgb(250_250_250)] hover:to-[rgb(225_234_238)] hover:text-main hover:rounded-2xl' key={b.active} onClick={() => handleClickBranch(b.active)}>
                            <Link to={b.link}>
                                <div className={`flex justify-start text-sm items-center transition-all gap-3 rounded-2xl p-2 px-4 ${activeBranch === b.active && 'bg-gradient-to-l from-[rgb(250_250_250)] to-[rgb(225_234_238)] text-main'}`}>
                                    <FontAwesomeIcon icon={b.icon} />
                                    <div>{b.title}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                 </div>}
            </div>
        ))
        }
        <div className=''>
          <SignOut logOut={logOut} />
        </div>
       </div>
    </div>
  )
}

export default Sidebar