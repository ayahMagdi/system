import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { useEffect, useState } from "react";
import AddPage from "./pages/AddPage";
import AllproductsPage from "./pages/AllproductsPage";
import EditPage from "./pages/EditPage";
import AllsuppliersPage from "./pages/AllsuppliersPage";
import AddSupplierPage from "./pages/AddSupplierPage";
import EditSupplierPage from "./pages/EditSupplierPage";
import AllClientsPage from "./pages/AllClientsPage";
import AddClientPage from "./pages/AddClientPage";
import EditClientPage from "./pages/EditClientPage";
import PurchasesPage from "./pages/PurchasesPage";
import StorePage from "./pages/StorePage";
import SalesPage from "./pages/SalesPage";
import InwardBills from "./pages/InwardBills";
import OutwardBills from "./pages/OutwardBills";
import SupplierBills from "./pages/SupplierBills";
import ClientBills from "./pages/ClientBills";
import InventoryIncome from "./pages/InventoryIncome";
import InventoryOutcome from "./pages/InventoryOutcome";
import SupplierBalance from "./pages/SupplierBalance";
import ClientBalance from "./pages/ClientBalance";
import SupplierReduction from "./pages/SupplierReduction";
import ClientReduction from "./pages/ClientReduction";
import Suppliers from "./pages/Suppliers";
import Clients from "./pages/Clients";
import Store from "./pages/Store";
import ExpensesPage from "./pages/ExpensesPage";
import Landing from "./pages/Landing";
import ReturnsPage from "./pages/ReturnsPage";
import ReturnBills from "./pages/ReturnBills";
import SalesInfo from "./pages/SalesInfo";
import PurchasesInfo from "./pages/PurchasesInfo";
import PrintbillsPage from "./pages/PrintbillsPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import Accountstatements from "./pages/Accountstatements";
import EditExpensesPage from "./pages/EditExpensesPage";
import AddExpensesPage from "./pages/AddExpensesPage";
import ReportsPage from "./pages/ReportsPage";

function App() {

  const [record , setRecord] = useState('')
  const [supplier , setSupplier] = useState('')
  const [client , setClient] = useState('')
  const [expense , setExpence] = useState('')
  const [search , setSearch] = useState('')
  const [addItemMsg , setAddItemMsg] = useState(false)
  const [editItemMsg , setEditItemMsg] = useState(false)
  const [addSupplierMsg , setAddSupplierMsg] = useState(false)
  const [editSupplierMsg , setEditSupplierMsg] = useState(false)
  const [addClientMsg , setAddClientMsg] = useState(false)
  const [editClientMsg , setEditClientMsg] = useState(false)
  const [addExpenseMsg , setAddExpenseMsg] = useState(false)
  const [editExpenseMsg , setEditExpenseMsg] = useState(false)
  const [recordReduction , setRecordReduction] = useState('')
  const [recordReductionClient , setRecordReductionClient] = useState('')

  const getRecord = (record) => {
    setRecord(record)
  }
  const getSupplier = (supplier) => {
    setSupplier(supplier)
  }
  const getClient = (client) => {
    setClient(client)
  }
  const getExpense = (expense) => {
    setExpence(expense)
  }
  const searchItem = (search) => {
    setSearch(search)
  }
  const isAddedItem = (added) => {
    setAddItemMsg(added)
  }
  const isAddedSupplier = (added) => {
    setAddSupplierMsg(added)
  }
  const isAddedClient = (added) => {
    setAddClientMsg(added)
  }
  const isAddedExpense = (added) => {
    setAddExpenseMsg(added)
  }
  const isEditedItem = (edited) => {
    setEditItemMsg(edited)
  }
  const isEditedSupplier = (edited) => {
    setEditSupplierMsg(edited)
  }
  const isEditedClient = (edited) => {
    setEditClientMsg(edited)
  }
  const isEditedExpense = (edited) => {
    setEditExpenseMsg(edited)
  }

  const getRecordReduction = (recordReduction) => {
    setRecordReduction(recordReduction)
  }
  const getRecordReductionClient = (recordReductionClient) => {
    setRecordReductionClient(recordReductionClient)
  }

  useEffect(() => {
    setTimeout(() => {
      addSupplierMsg && setAddSupplierMsg(false)
      editSupplierMsg && setEditSupplierMsg(false)
      addClientMsg && setAddClientMsg(false)
      addExpenseMsg && setAddExpenseMsg(false)
      editClientMsg && setEditClientMsg(false)
      addItemMsg && setAddItemMsg(false)
      editItemMsg && setEditItemMsg(false)
      editExpenseMsg && setEditExpenseMsg(false)
    } , 3000)
  })

  return (
    <div className="App">
      <Routes>
         <Route exact path="/login" element={<Login />} />
         <Route element={<ProtectedRoute />}>
          <Route path="/homepage" element={<Homepage searchItem={searchItem} search={search}  />} />
          <Route path="/landingpage" element={<Landing searchItem={searchItem} search={search}  />} />
          <Route path="/homepage/allproducts" element={<AllproductsPage getRecord={getRecord} searchItem={searchItem} search={search} addMsg={addItemMsg} editMsg={editItemMsg} />} />
          <Route path="/homepage/suppliers" element={<Suppliers getRecord={getRecord} searchItem={searchItem} search={search} addMsg={addItemMsg} editMsg={editItemMsg} />} />
          <Route path="/homepage/clients" element={<Clients getRecord={getRecord} searchItem={searchItem} search={search} addMsg={addItemMsg} editMsg={editItemMsg} />} />
          <Route path="/homepage/storepage" element={<Store getRecord={getRecord} searchItem={searchItem} search={search} addMsg={addItemMsg} editMsg={editItemMsg} />} />
          <Route path="/homepage/salesinfo" element={<SalesInfo getRecord={getRecord} searchItem={searchItem} search={search} addMsg={addItemMsg} editMsg={editItemMsg} />} />
          <Route path="/homepage/purchasesinfo" element={<PurchasesInfo getRecord={getRecord} searchItem={searchItem} search={search} addMsg={addItemMsg} editMsg={editItemMsg} />} />
          <Route path="/homepage/allsuppliers" element={<AllsuppliersPage getSupplier={getSupplier} searchItem={searchItem} search={search} addMsg={addSupplierMsg} editMsg={editSupplierMsg} />} />
          <Route path="/homepage/allclients" element={<AllClientsPage getClient={getClient} searchItem={searchItem} search={search} addMsg={addClientMsg} editMsg={editClientMsg} />} />
          <Route path="/homepage/allproducts/addproduct" element={<AddPage isAdded={isAddedItem} searchItem={searchItem} search={search}  />} />
          <Route path="/homepage/allsuppliers/addSupplier" element={<AddSupplierPage isAdded={isAddedSupplier} />} />
          <Route path="/homepage/allclients/addClient" element={<AddClientPage isAdded={isAddedClient} searchItem={searchItem} search={search} />} />
          <Route path="/homepage/allproducts/editproduct/:code" element={<EditPage record={record} isEdited={isEditedItem} />} />
          <Route path="/homepage/allsuppliers/editSupplier/:code" element={<EditSupplierPage supplier={supplier} isEdited={isEditedSupplier} />} />
          <Route path="/homepage/allclients/editClient/:code" element={<EditClientPage client={client} isEdited={isEditedClient} />} />
          <Route path="/homepage/purchases" element={<PurchasesPage />} />
          <Route path="/homepage/printbills" element={<PrintbillsPage searchItem={searchItem} search={search} />} />
          <Route path="/homepage/sales" element={<SalesPage />} />
          <Route path="/homepage/returns" element={<ReturnsPage />} />
          <Route path="/homepage/store" element={<StorePage searchItem={searchItem} search={search} />} />
          <Route path="/homepage/purchasesinfo/inwardbills" element={<InwardBills />} />
          <Route path="/homepage/salesinfo/outwardbills" element={<OutwardBills />} />
          <Route path="/homepage/printbills/supplierbills" element={<SupplierBills searchItem={searchItem} search={search} />} />
          <Route path="/homepage/printbills/clientbills" element={<ClientBills searchItem={searchItem} search={search} />} />
          <Route path="/returnbills" element={<ReturnBills searchItem={searchItem} search={search} />} />
          <Route path="/homepage/purchasesinfo/inventoryincome" element={<InventoryIncome />} />
          <Route path="/homepage/salesinfo/inventoryoutcome" element={<InventoryOutcome />} />
          <Route path="/homepage/Accountstatements/supplierbalance" element={<SupplierBalance searchItem={searchItem} search={search} getRecordReduction={getRecordReduction} />} />
          <Route path="/homepage/Accountstatements/clientbalance" element={<ClientBalance searchItem={searchItem} search={search} getRecordReduction={getRecordReductionClient} />} />
          <Route path="/homepage/Accountstatements" element={<Accountstatements searchItem={searchItem} search={search} getRecordReduction={getRecordReductionClient} />} />
          <Route path="/homepage/Accountstatements/supplierbalance/supplierreduction/:code" element={<SupplierReduction recordReduction={recordReduction} />} />
          <Route path="/homepage/Accountstatements/clientbalance/clientreduction/:code" element={<ClientReduction recordReduction={recordReductionClient} />} />
          <Route path="/homepage/expensespage" element={<ExpensesPage getRecord={getExpense} addMsg={addExpenseMsg} editMsg={editExpenseMsg} />} />
          <Route path="/homepage/expensespage/addexpenses" element={<AddExpensesPage isAdded={isAddedExpense} />} />
          <Route path="/homepage/expensespage/editexpenses/:code" element={<EditExpensesPage expense={expense} isEdited={isEditedExpense} />} />
          <Route path="/homepage/reports" element={<ReportsPage />} />
          <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;
