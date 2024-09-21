import React from 'react'

const Footer = () => {
  return (
    // <div className='bg-gradient-to-r from-indigo-500 h-40'>Footer</div>
    <footer className=' bg-blue-600 h-30 mt-2 text-white'>
  <div className='flex p-5 justify-around items-center '>
    <div className='text-center'>
        <h1 className='text-3xl'>Welcome to Work Flow</h1>
    </div>
    <div className='text-center'>
       
        <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Moj</li>
        </ul>
    </div>
  </div>
    </footer>
  )
}

export default Footer