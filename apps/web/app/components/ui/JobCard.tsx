import { Languages, MapPin } from 'lucide-react'

const jobCard = () => {
  return (
    <>
      <div className="shadow-brand-shadow w-[90%] rounded-lg bg-[#FCFCFD] p-[30px]">
        <div className="mb-[10px] flex justify-between">
          <h2 className="text-[12px]">Affirm</h2>
          <span>$65k até $110k*</span>
        </div>
        <h1 className="mb-[10px] font-bold">
          Senior Manager GTM Strategy & Operations
        </h1>
        <div className="mb-[35px] flex flex-wrap gap-[15px]">
          <span className="mt-[5px] rounded-[20px] bg-[#F4F4F5] px-[15px] py-[2px]">
            Design
          </span>
          <span className="mt-[5px] rounded-[20px] bg-[#F4F4F5] px-[15px] py-[2px]">
            Marketing
          </span>
          <span className="mt-[5px] rounded-[20px] bg-[#F4F4F5] px-[15px] py-[2px]">
            Cloud
          </span>
        </div>
        <div className="flex gap-[25px] text-[15px]">
          <div className="flex items-center">
            <MapPin size={15} className="mr-[5px]" />
            <span>International</span>
          </div>
          <div className="flex items-center">
            <Languages size={15} className="mr-[5px]" />
            <span>English</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default jobCard
