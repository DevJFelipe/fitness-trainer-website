const ServiceItem = ({ text }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 bg-[#ff6600]"></div>
      <span className="text-white text-xl">{text}</span>
    </div>
  )
}

export default ServiceItem 