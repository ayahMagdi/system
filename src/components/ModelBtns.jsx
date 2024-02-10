
const ModelBtns = ({handlecancel , title , cancelTitle ,btnStyle , margin ,handleRegistration ,form}) => {
  return (
    <div className={`flex justify-center gap-6 ${margin}`}>
        <button 
              className={`bg-main text-white rounded-3xl cursor-pointer ${btnStyle}`}
              form={form} type="submit"
              onClick={handleRegistration}
        >
           {title}
        </button>
        <button 
          className={`border-2 border-red-500 rounded-3xl cursor-pointer bg-white text-red-500  ${btnStyle}`}
          onClick={handlecancel}
        >
            {cancelTitle}
        </button>
   </div>
  )
}

export default ModelBtns