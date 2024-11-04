import { redirect } from "next/navigation";
import MainScreen from "./components/mainScreen"
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
    const session = await getServerSession(authOptions);

    // If the user is logged in, redirect to the home page
    if (!session) {
        redirect('/login');
        return null; // Prevents rendering the login form while redirecting
    }

    return (
        <>
            <MainScreen/>
        </>
    )
}

export default Page
