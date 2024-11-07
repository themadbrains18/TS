import { redirect } from "next/navigation"; 
import Form from "./components/form"; 
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/libs/auth"; 

const Page = async () => {
    /**
     *  Fetch session to check if the user is logged in
     */
    const session = await getServerSession(authOptions);

    /**
     * If user is logged in, redirect to the home page
     */
    if (session) {
      redirect('/'); // Redirects to home if a session is found
      return null; // Prevents rendering the form when redirecting
    }
  
    /**
     * Render the Forgot Password form if no session is found (user is not logged in)
     */
    return (
        <>
            <Form />
        </>
    );
};

export default Page;
