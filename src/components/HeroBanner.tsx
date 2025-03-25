import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
    return (
        <div className="w-full bg-white text-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gradient-to-r from-blue-50 to-cyan-50">
                    <Image src="/img/KaruBackground.jpg" alt="Dental care background" fill className="opacity-10 object-cover" />
                </div>
            </div>

            <div className="container mx-auto py-16 px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-12 md:mb-0">
                        <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-6 border border-blue-100">
                            <p className="text-sm text-blue-600 flex items-center">
                                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                                New Patient Special: Free Consultation
                            </p>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                            Modern Dental Care
                            <br />
                            <span className="text-blue-600">For Your Family</span>
                        </h1>

                        <p className="text-gray-600 mb-8 max-w-lg">
                            Experience comfortable, state-of-the-art dental care in a relaxing environment.
                            Our expert team is dedicated to giving you the healthy, beautiful smile you deserve.
                        </p>

                        <Link href="/booking" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                            Book Appointment
                        </Link>
                    </div>

                    <div className="md:w-1/2">
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src="/img/KaruCover.jpg"
                                alt="Modern dental office"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-3xl font-bold text-gray-800">
                            42,000<span className="text-blue-500">+</span>
                        </h2>
                        <p className="text-gray-500 text-sm uppercase tracking-wide">HAPPY PATIENTS</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-3xl font-bold text-gray-800">
                            69<span className="text-blue-500">+</span>
                        </h2>
                        <p className="text-gray-500 text-sm uppercase tracking-wide">CERTIFIED DENTISTS</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-3xl font-bold text-gray-800">
                            2,200<span className="text-blue-500">+</span>
                        </h2>
                        <p className="text-gray-500 text-sm uppercase tracking-wide">YEARS OF EXCELLENCE</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
