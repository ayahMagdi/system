import Sidebar from '../components/Sidebar'
import Returns from '../components/handleinvoices/Returns'

const ReturnsPage = () => {
  return (
    <div>
      <div className="flex justify-start items-start w-full gap-10">
          <div className="w-1/5">
            <Sidebar />
          </div>
          <div className="w-4/5 pl-8">
            <Returns />
          </div>
      </div>
    </div>
  )
}

export default ReturnsPage