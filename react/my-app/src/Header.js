import React from 'react';
import logo from './logo.svg'

const Header = () => {
    return (
        <header className='bg-purple-950 text-white p-4'>
            <div className='container mx-auto'>
                <div className='flex'>
                    <div>
                        <a href='index'><img src={logo} alt="Logo" className='w-12' /></a>
                    </div>
                    <div className='ml-10'>
                        <ul className='flex'>
                            <li className='mr-10 text-lg'><a href='./home' target='_parent'>Home</a></li>
                            <li className='mr-10 text-lg'><a href='./home' target='_parent'>Home</a></li>
                            <li className='mr-10 text-lg'><a href='./home' target='_parent'>Home</a></li>
                            <li className='mr-10 text-lg'><a href='./home' target='_parent'>Home</a></li>
                            <li className='mr-10 text-lg'><a href='./home' target='_parent'>Home</a></li>
                        </ul>
                    </div>
                    <div className='ml-auto'>
                        <span className='flex'>
                            <svg className="w-8 h-8 text-white mr-5" fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>alt-battery-3</title> <path d="M0 20q0 2.496 1.76 4.256t4.256 1.76h17.984q2.496 0 4.256-1.76t1.76-4.256h1.984v-8h-1.984q0-2.464-1.76-4.224t-4.256-1.76h-17.984q-2.496 0-4.256 1.76t-1.76 4.224v8zM4 20v-8q0-0.832 0.576-1.408t1.44-0.576h17.984q0.832 0 1.408 0.576t0.608 1.408v8q0 0.832-0.608 1.44t-1.408 0.576h-17.984q-0.832 0-1.44-0.576t-0.576-1.44zM6.016 20h1.984v-8h-1.984v8zM10.016 20h1.984v-8h-1.984v8zM14.016 20h1.984v-8h-1.984v8z"></path> </g></svg>
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>alt-battery-3</title> <path d="M0 20q0 2.496 1.76 4.256t4.256 1.76h17.984q2.496 0 4.256-1.76t1.76-4.256h1.984v-8h-1.984q0-2.464-1.76-4.224t-4.256-1.76h-17.984q-2.496 0-4.256 1.76t-1.76 4.224v8zM4 20v-8q0-0.832 0.576-1.408t1.44-0.576h17.984q0.832 0 1.408 0.576t0.608 1.408v8q0 0.832-0.608 1.44t-1.408 0.576h-17.984q-0.832 0-1.44-0.576t-0.576-1.44zM6.016 20h1.984v-8h-1.984v8zM10.016 20h1.984v-8h-1.984v8zM14.016 20h1.984v-8h-1.984v8z"></path> </g></svg>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header