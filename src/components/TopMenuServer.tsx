import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import TopMenuClient from "./TopMenuClient";

export default async function TopMenuServer() {
    const session = await getServerSession(authOptions);

    return <TopMenuClient session={session} />;
}
