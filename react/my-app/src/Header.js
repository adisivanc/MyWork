import React from 'react'

const Header = () => {
    return (
        <div>
            <section className='bg-purple-950 text-white p-5'>
                <div className='container mx-auto'>
                    <ul className='flex'>
                        <li className='mr-10 text-lg'><a href='./home' target='_parent'>Home</a></li>
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default Header