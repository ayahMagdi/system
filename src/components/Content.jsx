import React from 'react'
import Category from './Category'
import { useStateValue } from '../context/stateProvider'

const Content = ({isSearched , filteredItems ,categorys}) => {

  return (
    <div className='bg-white grid grid-cols-5 gap-5 justify-between items-center mt-4 cursor-pointer'>
        {isSearched ? filteredItems?.map((e , i) => (
          <Category icon={e.icon} title={e.title} url={e.url} key={i} />
        ))
        : categorys?.map((e , i) => (
          <Category icon={e.icon} title={e.title} url={e.url} key={i} />
        ))}
    </div>
  )
}

export default Content