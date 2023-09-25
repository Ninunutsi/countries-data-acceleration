import React from 'react'
import err from '../img/—Pngtree—error 404 page not found_6681621.png'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <div className='error-page'>
        <NavLink to='/' className='home'>Home</NavLink>
      <img src={err} alt="page not found"  className='err-img'/>
    </div>
  )
}

export default Error
