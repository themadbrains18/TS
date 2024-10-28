import { redirect } from "next/navigation";
import Form from "./components/form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";


const Page = async() => {
    const session = await getServerSession(authOptions);

    // If the user is logged in, redirect to the home page
    if (session) {
      redirect('/');
      return null; // Prevents rendering the login form while redirecting
    }
  
    return(
        <>
        <Form />
        </>
    )
};

export default Page;
