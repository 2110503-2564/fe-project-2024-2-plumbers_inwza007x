import {Suspense} from "react";
import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/VenueCatalog";
import LinearProgress from "@mui/material/LinearProgress";

export default async function VenuePage() {
    const venues = await getVenues();
    
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">เลือกสถานที่จัดงานของคุณ</h1>
            <Suspense fallback={<LinearProgress />}>
                <VenueCatalog venuesJson={venues} />
            </Suspense>
        </div>
    );
}