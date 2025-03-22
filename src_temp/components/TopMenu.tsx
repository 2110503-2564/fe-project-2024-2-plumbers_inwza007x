import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import Image from "next/image";
import Link from "next/link";
import TopMenuItem from "./TopMenuItem";

export default async function TopMenu() {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex items-center justify-between bg-white pl-7 pr-7 p-4 shadow-lg border-b border-gray-300">
            <div className="flex items-center space-x-10">
                {session ? (
                    <Link href="/api/auth/signout?callbackUrl=/">
                        <div className="flex items-center text-xl text-red-500 hover:text-red-700 cursor-pointer">
                            Sign-Out of {session.user.name}
                        </div>
                    </Link>
                ) : (
                    <Link href="/api/auth/signin?callbackUrl=/">
                        <div className="flex items-center text-xl text-blue-500 hover:text-blue-700 cursor-pointer">
                            Sign-In
                        </div>
                    </Link>
                )}
                <TopMenuItem title="My Booking" href="/mybooking" />
            </div>
            <div className="flex items-center space-x-10">
                <TopMenuItem title="Booking" href="/booking" />
                <div className="rounded-full bg-white p-0.5 shadow-md hover:bg-gray-200 transition-colors duration-200">
                    <Image src="/img/logo.png" alt="Logo" width={60} height={60} className="rounded-full" />
                </div>
            </div>
        </div>
    );
}
