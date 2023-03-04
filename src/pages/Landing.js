import React from 'react'
import { useAppContext } from '../context/appContext'


const Landing = () => {
    const { test} = useAppContext()

    test()
  return (
    <div>
        Landing Page      
    </div>
  )
}

export default Landing
