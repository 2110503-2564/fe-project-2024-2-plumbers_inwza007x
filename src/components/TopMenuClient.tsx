"use client";
import { useState } from "react";
import Link from "next/link";

export default function TopMenuClient({ session }: { session: any }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="bg-white text-black shadow-md relative z-50">
            <div className="flex justify-between items-center px-8 py-4">
                <div className="flex items-center space-x-8">
                    <h1 className="text-2xl font-bold text-blue-500">DentalCare</h1>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="hover:text-blue-500">Home</Link>
                        <Link href="/dentists" className="hover:text-blue-500">Find Dentists</Link>
                        <Link href="/mybooking" className="hover:text-blue-500">My Booking</Link>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {session ? 
                        <Link href="/api/auth/signout" className="text-red-500">
                            Sign Out ({session.user?.name})
                        </Link>
                     : 
                        <Link href="/api/auth/signin" className="hover:text-blue-500">
                            Sign-In
                        </Link>
                    }

                    <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="md:hidden text-blue-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden fixed top-[72px] left-0 w-full bg-white shadow-md z-50">
                    <div className="flex flex-col items-center py-4 space-y-4">
                        <Link href="/" className="hover:text-blue-500">Home</Link>
                        <Link href="/dentists" className="hover:text-blue-500">Find Dentists</Link>
                        <Link href="/mybooking" className="hover:text-blue-500">My Booking</Link>

                        {session ? (
                            <Link href="/api/auth/signout" className="text-cyan-600 text-sm">
                                Sign Out ({session.user?.name})
                            </Link>
                        ) : (
                            <Link href="/api/auth/signin" className="text-cyan-600 text-sm">
                                Sign In
                            </Link>
                        )}

                        <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
