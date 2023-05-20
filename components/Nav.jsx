"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, []);

    return (
        <nav className='flex-between w-full mb-16 mt-5'>
            <Link href='/' className='flex flex-center gap-2'>
                <Image
                    className='object-contain'
                    src='/assets/images/logo.svg'
                    width={30}
                    height={30}
                    alt='Prompt World Logo'
                />
                <p className='logo_text'>Prompt World</p>
            </Link>
            {/* Desktop Nav */}
            <div className='sm:flex hidden'>
                {
                    session?.user ? (
                        <div className='flex gap-3 md:gap-5'>
                            <Link href='/create-prompt' className='black_btn'>
                                Create Post
                            </Link>
                            <button
                                type="button"
                                onClick={signOut}
                                className='outline_btn'>
                                Logout
                            </button>
                            <Link href='/profile'>
                                <Image src={session?.user.image} width={37} height={37} alt='User Profile'
                                    className='rounded-full' />
                            </Link>
                        </div>
                    )
                        :
                        (
                            <>
                                {providers &&
                                    Object.values(providers).map((provider) => (
                                        <button
                                            onClick={() => signIn(provider.id)}
                                            key={provider.name}
                                            className='black_btn'
                                        >
                                            Sign In
                                        </button>
                                    ))}
                            </>
                        )
                }
            </div>
            {/* Mobile Nav */}
            <div className='sm:hidden flex relative'>
                {
                    session?.user ?
                        (
                            <div className='flex'>
                                <Image
                                    src={session?.user.image}
                                    width={37}
                                    height={37}
                                    alt='User Profile'
                                    className='rounded-full'
                                    onClick={() => { setToggleDropdown((prev) => !prev) }}
                                />
                                {toggleDropdown &&
                                    (
                                        <div className='dropdown'>
                                            <Link
                                                href="/profile"
                                                className='dropdown_link'
                                                onClick={() => { setToggleDropdown(false) }}
                                            >
                                                My Profile
                                            </Link>
                                            <Link
                                                href="/create-prompt"
                                                className='dropdown_link'
                                                onClick={() => { setToggleDropdown(false) }}
                                            >
                                                Create Prompt
                                            </Link>
                                            <button
                                                type='button'
                                                className='black_btn mt-5 w-full'
                                                onClick={() => {
                                                    signOut();
                                                    setToggleDropdown(false)
                                                }}>
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                            </div>
                        )
                        : (
                            <>
                                {providers &&
                                    Object.values(providers).map((provider) => (
                                        <button
                                            onClick={() => signIn(provider.id)}
                                            key={provider.name}
                                            className='black_btn'
                                        >
                                            Sign In
                                        </button>
                                    ))}
                            </>
                        )
                }
            </div>

        </nav>
    )
}

export default Nav