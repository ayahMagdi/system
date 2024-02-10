import React from 'react'

const GlobalTableHead = ({black,data}) => {
  return (
    <thead className={`${black === 'black' ? 'bg-black' : 'bg-main'} sticky top-0 text-white border-b`}>
        <tr className='border-b border-slate-300'>
            {data?.map(e => (
                <th scope="col" style={{border: '1px solid #00000024'}} className={`${black === 'black' ? 'px-5 py-2' : 'px-6 py-3'}`}>{e}</th>
            ))}
        </tr>
    </thead>
  )
}

export default GlobalTableHead