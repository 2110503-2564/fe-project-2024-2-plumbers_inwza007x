import {useRouter} from "next/navigation";
import getVenue from "@/libs/getVenue";
import {VenueItem, VenueResponse} from "@/libs/interfaces";
import Image from "next/image";

/*
interface Venue {
    vid: string;
    name: string;
    image: string;
}

const venueList: Venue[] = [
    {vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg"},
    {vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg"},
    {vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg"},
];
*/

interface VenuePageProps {
    params: {
        vid: string;
    };
}

export default async function VenuePage({params}: VenuePageProps) {
    const {vid} = params;
    const venueData: VenueResponse = await getVenue(vid);
    const venue: VenueItem = venueData.data;
    // const [venue, setVenue] = useState<Venue | null>(null);
    // const router = useRouter();

    /*
    useEffect(() => {
        const foundVenue = venueList.find((v) => v.vid === vid) || null;
        setVenue(foundVenue);

        if (!foundVenue) {
            // router.push("/");
        }
    }, [vid]);
    */

    if (!venue) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-xl font-medium text-gray-600">Loading venue details...</div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-full md:w-1/3 rounded-lg overflow-hidden shadow-md">
                            <Image src={venue.picture} alt={venue.name} width={400} height={300} className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105" />
                        </div>

                        <div className="w-full md:w-2/3 space-y-4">
                            <h1 className="text-3xl font-bold text-gray-800">{venue.name}</h1>
                            <p className="text-gray-600">{venue.address}, {venue.district}, {venue.province}, {venue.postalcode}</p>
                            <p className="text-gray-600">Tel: {venue.tel}</p>
                            <p className="text-gray-600 font-semibold">Daily Rate: {venue.dailyrate.toLocaleString()}฿</p>
                        </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                        {/* <button onClick={() => router.back()} className="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 shadow-sm"> */}
                        <button className="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 shadow-sm">
                            Back to Venues
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
