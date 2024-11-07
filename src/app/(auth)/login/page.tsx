// app/login/page.tsx

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';
import LoginForm from './components/loginForm';

const LoginPage = async () => {
  // Retrieve the current session using the NextAuth server-side session function
  const session = await getServerSession(authOptions);

  // If the user is logged in, redirect to the home page
  if (session) {
    redirect('/'); // Redirect to the home page if a session is found
    return null; // Prevents rendering the login form while redirecting
  }

  return (
    <>
      <LoginForm /> {/* Render the login form if the user is not logged in */}
    </>
  );
};

export default LoginPage;

