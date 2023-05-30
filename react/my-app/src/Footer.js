import React from 'react'

const Footer = () => {

    const year = new Date();

    return (
        <footer className='bg-zinc-900 text-white p-3 fixed bottom-0 w-full'>
            <div className='container mx-auto text-center text-sm'>
                Copyrights &copy; {year.getFullYear()}
            </div>
        </footer>
    )
}

export default Footer