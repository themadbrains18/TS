import { redirect } from "next/navigation"; // Redirect function for server-side navigation
import Form from "./components/form"; // Forgot Password form component
import { getServerSession } from "next-auth"; // Function to get the session from next-auth
import { authOptions } from "@/libs/auth"; // Authentication options for next-auth configuration

const Page = async () => {
    // Fetch session to check if the user is logged in
    const session = await getServerSession(authOptions);

    // If user is logged in, redirect to the home page
    if (session) {
      redirect('/'); // Redirects to home if a session is found
      return null; // Prevents rendering the form when redirecting
    }
  
    // Render the Forgot Password form if no session is found (user is not logged in)
    return (
        <>
            <Form /> {/* Display the Forgot Password form */}
        </>
    );
};

export default Page;
