import { createContext , useContext, useState } from "react";
import { faBalanceScaleLeft, faBusinessTime, faCalculator, faClipboardCheck, faClipboardList, faEdit, faFileInvoice, faFileInvoiceDollar, faMoneyBill1Wave, faMoneyBillTrendUp, faMoneyBillWave, faMoneyBillWaveAlt, faMoneyBillWheat, faMoneyCheckAlt, faMoneyCheckDollar, faPeopleGroup, faSackDollar, faStore, faUsers } from '@fortawesome/free-solid-svg-icons'

export const StateContext = createContext(null)

export const StateProvider = (props) => {

    const [items , setItems] = useState([
        // {code: "1" , name: "شامبو" , unit: "قطع" ,income:"200" ,outcome: "5000"},
        // {code: "15" , name: "حمام كريم" , unit: "قطع" ,income:"200" ,outcome: "5000"},
        // {code: "3" , name: "تابلت" , unit: "قطع" ,income:"200" ,outcome: "500"},
        // {code: "4" , name: "ايفون" , unit: "قطع" ,income:"200" ,outcome: "5500"},
        // {code: "5" , name: "زيت" , unit: "قطع" ,income:"200" ,outcome: "9500"},
        // {code: "12" , name: "بلسم" , unit: "قطع" ,income:"200" ,outcome: "500"},
        // {code: "7" , name: "صن بلوك" , unit: "قطع" ,income:"200" ,outcome: "500"},
        // {code: "8" , name: "صبغة" , unit: "قطع" ,income:"200" ,outcome: "500"},
        // {code: "9" , name: "سيروم" , unit: "قطع" ,income:"200" ,outcome: "500"},
        // {code: "10" , name: "مرطب" , unit: "قطع" ,income:"200" ,outcome: "500"},
        // {code: "11" , name: "فاونديشن" , unit: "قطع" ,income:"200" ,outcome: "500"},
        // {code: "13" , name: "روج" , unit: "قطع" ,income:"200" ,outcome: "500"},
        // {code: "20" , name: "ماسكرا" , unit: "قطع" ,income:"200" ,outcome: "500"},
        // {code: "17" , name: "شادو" , unit: "قطع" ,income:"200" ,outcome: "500"},
    ])
    const [suppliers , setSuppliers] = useState([
        // {code: "1" , name: "هند مجدي" , phone:"01020202020"},
        // {code: "2" , name: "بسمة مجدي" , phone:"01020202020"},
        // {code: "3" , name: "هبة مجدي" , phone:"01020202020"},
        // {code: "4" , name: "رنا عبدالعزيز" , phone:"01020202020"},
        // {code: "5" , name: "ميار خالد" , phone:"01020202020"},
        // {code: "6" , name: "ايه مجدي" , phone:"01020202020"},
    ])
    const [clients , setClients] = useState([
        // {code: "1" , name: "هند مجدي" , phone:"01020202020" ,address: "مصر محافظة الشرقية"},
        // {code: "2" , name: "بسمة مجدي" , phone:"01020202020",address: "مصر محافظة الشرقية"},
        // {code: "3" , name: "هبة مجدي" , phone:"01020202020",address: "مصر محافظة الشرقية"},
        // {code: "4" , name: "ايه مجدي" , phone:"01020202020",address: "مصر محافظة الشرقية"},
        // {code: "5" , name: "رنا عبدالعزيز" , phone:"01020202020",address: "مصر محافظة الشرقية"},
        // {code: "6" , name: "اسراء فكري" , phone:"01020202020",address: "مصر محافظة الشرقية"},
    ])
    const [stores , setStores] = useState([
        // {code: "1" , name: "شامبو" , unit: "قطع" ,income:"200" ,outcome: "5000" ,avlqty:"60",soldqty: "11",store: "", total: ""},
        // {code: "15" , name: "حمام كريم" , unit: "قطع" ,income:"200" ,outcome: "5000" ,avlqty:"40",soldqty: "22",store: "", total: ""},
        // {code: "3" , name: "تابلت" , unit: "قطع" ,income:"500" ,outcome: "500" ,avlqty:"92",soldqty: "20",store: "", total: ""},
        // {code: "4" , name: "ايفون" , unit: "قطع" ,income:"4000" ,outcome: "5500" ,avlqty:"55",soldqty: "40",store: "", total: ""},
        // {code: "5" , name: "زيت" , unit: "قطع" ,income:"8000" ,outcome: "9500" ,avlqty:"78",soldqty: "60",store: "", total: ""},
        // {code: "12" , name: "بلسم" , unit: "قطع" ,income:"400" ,outcome: "500",avlqty:"60",soldqty: "0",store: "", total: ""},
        // {code: "7" , name: "صن بلوك" , unit: "قطع" ,income:"200" ,outcome: "500" ,avlqty:"79",soldqty: "50",store: "", total: ""},
        // {code: "9" , name: "سيروم" , unit: "قطع" ,income:"200" ,outcome: "500" ,avlqty:"90",soldqty: "40",store: "", total: ""},
        // {code: "10" , name: "مرطب" , unit: "قطع" ,income:"200" ,outcome: "500" ,avlqty:"300",soldqty: "200",store: "", total: ""},
        // {code: "11" , name: "فاونديشن" , unit: "قطع" ,income:"200" ,outcome: "500" ,avlqty:"240",soldqty: "100",store: "", total: ""},
        // {code: "13" , name: "روج" , unit: "قطع" ,income:"200" ,outcome: "500" ,avlqty:"100",soldqty: "20",store: "", total: ""},
        // {code: "13" , name: "جل صبار" , unit: "قطع" ,income:"200" ,outcome: "500" ,avlqty:"190",soldqty: "20",store: "", total: ""},
        // {code: "17" , name: "شادو" ,unit: "قطع" ,income:"200" ,outcome: "500" ,avlqty:"250",soldqty: "2",store: "", total: ""},
    ])
    const [sales , setSales] = useState([
        // {invoice: '1',date: '20/7/2020', supplierName: 'محمد', supplierCode: '12' ,itemCode: "11111110" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,total: '2000'},
        // {invoice: '1',date: '20/7/2020', supplierName: 'محمد', supplierCode: '12' ,itemCode: "11111111" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,total: '2000'},
        // {invoice: '1',date: '20/7/2020', supplierName: 'محمد', supplierCode: '12' ,itemCode: "11111112" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,total: '2000'},
        // {invoice: '1',date: '20/7/2020', supplierName: 'محمد', supplierCode: '12' ,itemCode: "11111113" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,total: '2000'},
        // {invoice: '1',date: '20/7/2020', supplierName: 'محمد', supplierCode: '12' ,itemCode: "11111114" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,total: '2000'},
        // {invoice: '1',date: '20/7/2020', supplierName: 'محمد', supplierCode: '12' ,itemCode: "11111115" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,total: '2000'},
        // {invoice: '1',date: '20/7/2020', supplierName: 'محمد', supplierCode: '12' ,itemCode: "11111116" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,total: '2000'},
        // {invoice: '1',date: '20/7/2020', supplierName: 'محمد', supplierCode: '12' ,itemCode: "11111117" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,total: '2000'},
    ])
    const [purchases , setPurchases] = useState([
        // {purchas: '1',date: '20/7/2020', supplierName: 'هند مجدي', supplierCode: '1' ,itemCode: "11111110" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,totalPur: '25000'},
        // {purchas: '1',date: '20/7/2020', supplierName: 'هند مجدي', supplierCode: '1' ,itemCode: "11111111" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,totalPur: '25000'},
        // {purchas: '1',date: '20/7/2020', supplierName: 'هند مجدي', supplierCode: '1' ,itemCode: "11111112" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,totalPur: '25000'},
        // {purchas: '1',date: '20/7/2020', supplierName: 'هند مجدي', supplierCode: '1' ,itemCode: "11111113" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,totalPur: '25000'},
        // {purchas: '1',date: '20/7/2020', supplierName: 'هند مجدي', supplierCode: '1' ,itemCode: "11111114" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,totalPur: '25000'},
        // {purchas: '1',date: '20/7/2020', supplierName: 'هند مجدي', supplierCode: '1' ,itemCode: "11111115" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,totalPur: '25000'},
        // {purchas: '1',date: '20/7/2020', supplierName: 'هند مجدي', supplierCode: '1' ,itemCode: "11111116" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,totalPur: '25000'},
        // {purchas: '1',date: '20/7/2020', supplierName: 'هند مجدي', supplierCode: '1' ,itemCode: "11111117" , itemName: "لابتوب" ,unit:"قطعه" , qty: "50",price: "500" ,totalPur: '25000'},
    ])
    const [inwardBills , setInwardBills] = useState([
        // {invoice: '1' , date: '4/20/2023' , supplierCode: 1 , supplierName: 'هند' ,itemCode: '1' , itemName: 'شامبو', unit: 'قطع' ,price: '200' ,qty: 20 ,total: 2000,totalbill: 6000,discount: '30',totalwd: 2000,reduction: 100,remaining: 3000},
        // {invoice: '1' , date: '4/20/2023' , supplierCode: 1 , supplierName: 'هند' ,itemCode: '12' , itemName: 'بلسم', unit: 'قطع' ,price: '200' ,qty: 20 ,total: 2000,totalbill: 6000,discount: '30',totalwd: 2000,reduction: 100,remaining: 3000},
        // {invoice: '1' , date: '4/20/2023' , supplierCode: 1 , supplierName: 'هند' ,itemCode: '15' , itemName: 'حمام كريم', unit: 'قطع' ,price: '200' ,qty: 20 ,total: 2000,totalbill: 6000,discount: '30',totalwd: 2000,reduction: 100,remaining: 3000},
        // {invoice: '2' , date: '4/20/2023' , supplierCode: 5 , supplierName: 'بسمه' ,itemCode: '5' , itemName: 'زيت', unit: 'قطع' ,price: '200' ,qty: 20 ,total: 2000,totalbill: 6000,discount: '30',totalwd: 2000,reduction: 100,remaining: 3000},
        // {invoice: '2' , date: '4/20/2023' , supplierCode: 5 , supplierName: 'بسمه' ,itemCode: '9' , itemName: 'سيروم', unit: 'قطع' ,price: '200' ,qty: 20 ,total: 2000,totalbill: 6000,discount: '30',totalwd: 2000,reduction: 100,remaining: 3000},
        // {invoice: '3' , date: '4/26/2023' , supplierCode: 3 , supplierName: 'رنا' ,itemCode: '10' , itemName: 'مرطب', unit: 'قطع' ,price: '200' ,qty: 20 ,total: 2000,totalbill: 6000,discount: '30',totalwd: 2000,reduction: 100,remaining: 3000},
        // {invoice: '3' , date: '4/26/2023' , supplierCode: 3 , supplierName: 'رنا' ,itemCode: '7' , itemName: 'صن بلوك', unit: 'قطع' ,price: '200' ,qty: 20 ,total: 2000,totalbill: 6000,discount: '30',totalwd: 2000,reduction: 100,remaining: 3000},
        // {invoice: '3' , date: '4/26/2023' , supplierCode: 3 , supplierName: 'رنا' ,itemCode: '11' , itemName: 'فاونديشن', unit: 'قطع' ,price: '200' ,qty: 20 ,total: 2000,totalbill: 6000,discount: '30',totalwd: 2000,reduction: 100,remaining: 3000},
        // {invoice: '4' , date: '4/28/2023' , supplierCode: 5 , supplierName: 'ايه' ,itemCode: '8' , itemName: 'صبغة', unit: 'قطع' ,price: '200' ,qty: 20 ,total: 2000,totalbill: 6000,discount: '30',totalwd: 2000,reduction: 100,remaining: 3000},
        // {invoice: '4' , date: '4/28/2023' , supplierCode: 5 , supplierName: 'ايه' ,itemCode: '17' , itemName: 'شادو', unit: 'قطع' ,price: '200' ,qty: 20 ,total: 2000,totalbill: 6000,discount: '30',totalwd: 2000,reduction: 100,remaining: 3000},
        // {invoice: '4' , date: '4/28/2023' , supplierCode: 5 , supplierName: 'ايه' ,itemCode: '20' , itemName: 'ماسكرا', unit: 'قطع' ,price: '200' ,qty: 20 ,total: 2000,totalbill: 6000,discount: '30',totalwd: 2000,reduction: 100,remaining: 3000},
        // {invoice: '7' , date: '4/26/2023' , supplierCode: 3 , supplierName: 'رنا' ,itemCode: '7' , itemName: 'صن بلوك', unit: 'قطع' ,price: '200' ,qty: 20 ,total: 2000,totalbill: 6000,discount: '30',totalwd: 2000,reduction: 100,remaining: 3000},
    ])
    const [outwardBills, setOutwardBills] = useState([
        // { invoice: '1', date: '10/8/2023', supplierCode: '1', clientName: 'هند', itemCode: '1', itemName: 'شامبو', unit: 'قطع', price: 200, qty: 25, total: 2000, totalbill: 6000, discount: 30, totalwd: 2000, reduction: 100, remaining: 3000},
        // { invoice: '1', date: '10/8/2023', supplierCode: '1', clientName: 'هند', itemCode: '12', itemName: 'بلسم', unit: 'قطع', price: 200, qty: 20, total: 2000, totalbill: 6000, discount: 30, totalwd: 2000, reduction: 100, remaining: 3000},
        // { invoice: '1', date: '10/8/2023', supplierCode: '1', clientName: 'هند', itemCode: '15', itemName: 'حمام كريم', unit: 'قطع', price: 200, qty: 20, total: 2000, totalbill: 6000, discount: 30, totalwd: 2000, reduction: 100, remaining: 3000},
        // { invoice: '2', date: '10/16/2023', supplierCode: '5', clientName: 'بسمه', itemCode: '5', itemName: 'زيت', unit: 'قطع', price: 200, qty: 20, total: 2000, totalbill: 6000, discount: 30, totalwd: 2000, reduction: 100, remaining: 3000},
        // { invoice: '2', date: '10/16/2023', supplierCode: '5', clientName: 'بسمه', itemCode: '9', itemName: 'سيروم', unit: 'قطع', price: 200, qty: 20, total: 2000, totalbill: 6000, discount: 30, totalwd: 2000, reduction: 100, remaining: 3000},
        // { invoice: '3', date: '10/21/2023', supplierCode: '3', clientName: 'رنا', itemCode: '10', itemName: 'مرطب', unit: 'قطع', price: 200, qty: 20, total: 2000, totalbill: 6000, discount: 30, totalwd: 2000, reduction: 100, remaining: 3000},
        // { invoice: '3', date: '10/21/2023', supplierCode: '3', clientName: 'رنا', itemCode: '7', itemName: 'صن بلوك', unit: 'قطع', price: 200, qty: 20, total: 2000, totalbill: 6000, discount: 30, totalwd: 2000, reduction: 100, remaining: 3000},
        // { invoice: '3', date: '10/21/2023', supplierCode: '3', clientName: 'رنا', itemCode: '11', itemName: 'فاونديشن', unit: 'قطع', price: 200, qty: 20, total: 2000, totalbill: 6000, discount: 30, totalwd: 2000, reduction: 100, remaining: 3000},
    ])
    const [supplierBalance , setSupplierBalance] = useState([
        // {code: "1" , name: "هند مجدي" ,total: 3000,reduction: 1000,remaining: 2000},
        // {code: "2" , name: "بسمة مجدي" ,total: 2000,reduction: 100,remaining: 3000},
        // {code: "3" , name: "هبة مجدي" ,total: 2000,reduction: 100,remaining: 3000},
        // {code: "4" , name: "رنا عبدالعزيز" , total: 2000,reduction: 100,remaining: 3000},
        // {code: "5" , name: "ميار خالد" ,total: 2000,reduction: 100,remaining: 3000},
        // {code: "6" , name: "ايه مجدي" ,total: 2000,reduction: 100,remaining: 3000},
        // {code: '7' , name: 'رنا' ,total: 2000,reduction: 100,remaining: 3000},
        // {code: '8' , name: 'شيرين' ,total: 2000,reduction: 100,remaining: 3000},
        // {code: '9' , name: 'حسناء' ,total: 2000,reduction: 100,remaining: 3000},
        // {code: '10' ,name: 'ايه' ,total: 2000,reduction: 100,remaining: 3000},
    ])
    const [clientBalance , setClientBalance] = useState([
        // {code: "1" , name: "هند مجدي" ,total: 3000,reduction: 1000,remaining: 2000},
        // {code: "2" , name: "بسمة مجدي" ,total: 5000,reduction: 100,remaining: 3000},
        // {code: "3" , name: "هبة مجدي" ,total: 1000,reduction: 100,remaining: 3000},
        // {code: "4" , name: "رنا عبدالعزيز" , total: 4000,reduction: 100,remaining: 3000},
        // {code: "5" , name: "ميار خالد" ,total: 1000,reduction: 100,remaining: 3000},
        // {code: "6" , name: "ايه مجدي" ,total: 9000,reduction: 100,remaining: 3000},
        // {code: '7' , name: 'رنا' ,total: 2000,reduction: 100,remaining: 3000},
        // {code: '8' , name: 'شيرين' ,total: 2000,reduction: 100,remaining: 3000},
        // {code: '9' , name: 'حسناء' ,total: 2000,reduction: 100,remaining: 3000},
        // {code: '10' ,name: 'ايه' ,total: 2000,reduction: 100,remaining: 3000},
    ])
    const [totalReduction , setTotalReduction] = useState([])
    const [totalReductionClient , setTotalReductionClient] = useState([])
    const [expenses , setExpenses] = useState([
        // {code: 1,date: '5/10/2023' ,total: 500 , reason: 'blabla' },
        // {code: 2,date: '5/10/2023' ,total: 500 , reason: 'blabla' },
        // {code: 3,date: '5/10/2023' ,total: 500 , reason: 'blabla' },
        // {code: 4,date: '5/10/2023' ,total: 500 , reason: 'blabla' },
        // {code: 5,date: '5/10/2023' ,total: 500 , reason: 'blabla' },
        // {code: 6,date: '5/10/2023' ,total: 500 , reason: 'blabla' },
        // {code: 7,date: '5/10/2023' ,total: 500 , reason: 'blabla' },
        // {code: 8,date: '5/10/2023' ,total: 500 , reason: 'blabla' }
    ])
    const [returns , setReturns] = useState([])
    const [returnBills , setReturnBills] = useState([])

    const addItem = (code ,name, unit, income, outcome) => {
        setItems([{code,name,unit,income,outcome} , ...items])
    }
    const addInwardBills = (invoice ,date, supplierCode, supplierName, itemCode , itemName , unit ,price ,qty , total , totalbill ,discount,totalwd,reduction,remaining,type) => {
        setInwardBills((oldvalues) => [{invoice ,date, supplierCode, supplierName, itemCode , itemName , unit ,price ,qty , total , totalbill ,discount,totalwd,reduction,remaining , type}, ...oldvalues])
    }
    const addOutwardBills = (invoice ,date, supplierCode, clientName, itemCode , itemName , unit ,price ,qty , total , totalbill ,discount,totalwd,reduction,remaining,type) => {
        setOutwardBills((oldvalues) => [{invoice ,date, supplierCode, clientName, itemCode , itemName , unit ,price ,qty , total , totalbill ,discount,totalwd,reduction,remaining,type}, ...oldvalues])
    }
    const addReturnBills = (invoice ,date, supplierCode, supplierName, itemCode , itemName , unit ,price ,qty , total , totalbill ,discount,totalwd,reduction,remaining) => {
        setReturnBills((oldvalues) => [{invoice ,date, supplierCode, supplierName, itemCode , itemName , unit ,price ,qty , total , totalbill ,discount,totalwd,reduction,remaining}, ...oldvalues])
    }
    const addSupplier = (code, name , phone) => {
        setSuppliers([{code, name , phone} , ...suppliers])
    }
    const addExpenses = (code ,date, total , reason) => {
        setExpenses([{code ,date, total , reason} , ...expenses])
    }

    const addClient = (code, name , phone , address) => {
        setClients([{code, name , phone , address} , ...clients])
    }
    const addPurchases = (invoice ,date , supplierName , supplierCode ,itemCode,itemName ,unit ,qty ,price,total) => {
        setPurchases([{invoice ,date , supplierName , supplierCode ,itemCode,itemName,unit ,qty ,price,total} , ...purchases])
    }
    const addSales = (invoice ,date , supplierName , supplierCode ,itemCode,itemName ,unit ,qty ,price ,total) => {
        setSales([{invoice ,date , supplierName , supplierCode ,itemCode,itemName,unit ,qty ,price ,total} , ...sales])
    }
    const addReturns = (invoice ,date , supplierName , supplierCode ,itemCode,itemName ,unit ,qty ,price ,total) => {
        setReturns([{invoice ,date , supplierName , supplierCode ,itemCode,itemName,unit ,qty ,price ,total} , ...returns])
    }
    
    const deleteItem = (code) => {
        setItems(items.filter(e => e.code !== code))
    }
    const deleteSupplier = (code) => {
        setSuppliers(suppliers.filter(e => e.code !== code))
    }
    const deleteClient = (code) => {
        setClients(clients.filter(e => e.code !== code))
    }
    const deleteExpenses = (code) => {
        setExpenses(expenses.filter(e => e.code !== code))
    }
    const deletePurchases = (code) => {
        setPurchases(purchases.filter(e => e.itemCode !== code))
    }
    const deleteSales = (code) => {
        setSales(sales.filter(e => e.itemCode !== code))
    }
    const deleteReturns = (code) => {
        setReturns(returns.filter(e => e.itemCode !== code))
    }

    const editItem = (code,editedItems) => {
        setItems(items.map(e => e.code === code ? editedItems : e))
    }
    const editSupplier = (code,editedSuppliers) => {
        setSuppliers(suppliers.map(e => e.code === code ? editedSuppliers : e))
    }
    const editClient = (code,editedClients) => {
        setClients(clients.map(e => e.code === code ? editedClients : e))
    }
    const editExpenses = (code,editedExpenses) => {
        setExpenses(expenses.map(e => e.code === code ? editedExpenses : e))
    }
    const editPurchases = (code,editedPurchases) => {
        setPurchases(purchases.map(e => e.itemCode === code ? editedPurchases : e))
    }
    const editSales = (code,editedSales) => {
        setSales(sales.map(e => e.itemCode === code ? editedSales : e))
    }
    const editReturn = (code,editedReturn) => {
        setReturns(returns.map(e => e.itemCode === code ? editedReturn : e))
    }
    const addToStore = (code , name , unit ,income ,outcome,avlqty,soldqty,store, total) => {
         setStores((oldvalues) => [{code , name , unit ,income ,outcome,avlqty,soldqty,store, total} , ...oldvalues])
    }
    const editStoresInfo = (code,editedItems) => {
        setStores(stores.map(e => e.code === code ? editedItems : e))
    }
    const editStores = (arr , getStore) => {
        setStores((oldvalues) => oldvalues.map(e => e.code === arr.itemCode ? 
            { 
                ...e, 
                avlqty: parseInt(e.avlqty) + parseInt(arr.qty),
                store: (parseInt(e.avlqty) + parseInt(arr.qty)) - parseInt(e.soldqty),
                total: ((parseInt(e.avlqty) + parseInt(arr.qty)) - parseInt(e.soldqty)) * parseInt(e.income)
            } 
            : e
        ))
    };
    const addSupplierBalance = (code,name,total,reduction,remaining) => {
        setSupplierBalance([{code,name,total,reduction,remaining} , ...supplierBalance])
    }
    const editSupplierBalance = (arr , calcTotal , editReduction ,newArr) => {
       if(!editReduction){
         setSupplierBalance((oldvalues) => oldvalues.map(e => e.code === arr ?
            {   
              ...e, 
              total: parseInt(e.total) + parseInt(calcTotal.totalwd),
              reduction: parseInt(e.reduction) + parseInt(calcTotal.reduction), 
              remaining: parseInt(e.remaining) + parseInt(calcTotal.remaining), 
            } 
            : e))
       }
       if(editReduction){
         setSupplierBalance((oldvalues) => oldvalues.map(e => e.code === arr ?
            {   
              ...e, 
              reduction: parseInt(e.reduction) + parseInt(newArr), 
              remaining: parseInt(e.total) - (parseInt(e.reduction) + parseInt(newArr)), 
            } 
            : e))
       }
    };
    const addClientBalance = (code,name,total,reduction,remaining) => {
        setClientBalance([{code,name,total,reduction,remaining} , ...clientBalance])
    }
    const editClientBalance = (arr , calcTotal , editReduction ,newArr) => {
        if(!editReduction){
          setClientBalance((oldvalues) => oldvalues.map(e => e.code === arr ?
             {   
               ...e, 
               total: parseInt(e.total) + parseInt(calcTotal.totalwd),
               reduction: parseInt(e.reduction) + parseInt(calcTotal.reduction), 
               remaining: parseInt(e.remaining) + parseInt(calcTotal.remaining), 
             } 
             : e))
        }
        if(editReduction){
          setClientBalance((oldvalues) => oldvalues.map(e => e.code === arr ?
             {   
               ...e, 
               reduction: parseInt(e.reduction) + parseInt(newArr), 
               remaining: parseInt(e.total) - (parseInt(e.reduction) + parseInt(newArr)), 
             } 
             : e))
        }
     };

    const deleteFromStore = (arr , getStore) => {
        setStores((oldvalues) => oldvalues.map(e => e.code === arr.itemCode ? 
            {
                ...e , 
                soldqty: parseInt(e.soldqty) + parseInt(arr.qty),
                store: parseInt(getStore.avlqty) - (parseInt(e.soldqty) + parseInt(arr.qty)),
                total: (parseInt(getStore.avlqty) - (parseInt(e.soldqty) + parseInt(arr.qty))) * parseInt(e.income)
            } 
            : e))
    }

    const addTotalReduction = (code,name,date,reduction) => {
        setTotalReduction((oldvalues) => [{code,name,date,reduction} , ...oldvalues])
    }
    const addTotalReductionClient = (code,name,date,reduction) => {
        setTotalReductionClient((oldvalues) => [{code,name,date,reduction} , ...oldvalues])
    }

    return (
        <StateContext.Provider value={
            {items,addItem,deleteItem,returns,deleteReturns,editExpenses,deleteExpenses,returnBills,addReturnBills,editReturn,setReturns,addReturns,totalReduction,expenses,addExpenses,addTotalReduction,editStoresInfo,totalReductionClient,addTotalReductionClient,editItem,supplierBalance,addSupplierBalance,editSupplierBalance,addClientBalance,editClientBalance,clientBalance, suppliers,outwardBills,addOutwardBills,addSupplier , deleteSupplier,setSales ,editSupplier ,clients , addClient , deleteClient , editClient ,purchases,setPurchases,addPurchases,deletePurchases,editPurchases,sales,stores ,addToStore,editStores,deleteFromStore ,addSales,deleteSales,editSales ,inwardBills ,addInwardBills ,setStores}
         }>
            {props.children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext)