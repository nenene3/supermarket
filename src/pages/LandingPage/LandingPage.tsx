import NavBar from '@/components/NavBar'
import React from 'react'
import { Outlet } from 'react-router'

type Props = {}

const index = (props: Props) => {
  return (
    <div className=''>
        <NavBar/>
        <div className='container mx-auto mt-2'>

        <Outlet/>
        </div>
    </div>
  )
}

export default index