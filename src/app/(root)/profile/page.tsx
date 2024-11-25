import { redirect } from "next/navigation";
import MainScreen from "./components/mainScreen";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
    // Get the user session
    const session = await getServerSession(authOptions);

    // If the user is not logged in, redirect to the login page
    if (!session) {
        redirect('/login');
        return null; // Prevents rendering the page while redirecting
    }

    // Fetch user data from the /get-user API endpoint
    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/get-user`, {
        headers: {
            Authorization: `Bearer ${session?.token}`,
            'ngrok-skip-browser-warning':'true'
        },
        cache: "no-store", // Ensures fresh data is fetched
    });

    // Parse the response as JSON
    const userData = await userResponse.json();

    // Pass userData as props to MainScreen component
    return (
        <>
            <MainScreen userData={userData} />
        </>
    );
}

export default Page;
