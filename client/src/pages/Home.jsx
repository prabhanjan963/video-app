import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Wrapper from './Wrapper'
import axios from 'axios'
import Footer from '../components/Footer'

export default function Home({type}) {
  

    return (
    <>
        <Wrapper>
            <div className='flex md:w-full h-full fixed w-full'>
                <div className='w-screen bg-gray-800 md:flex
                 md:flex-wrap overflow-auto md:grid-cols-3 md:grid-rows-3 grid-cols-1 grid-rows-1 gap-10'>
                    <Card/>
                    <div className='w-full h-20'></div>
                </div>
            </div>
        </Wrapper>
        </>
    )
}
