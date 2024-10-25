// app/login/page.tsx

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';
import Form from './components/form';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  // If the user is logged in, redirect to the home page
  if (session) {
    redirect('/');
    return null; // Prevents rendering the login form while redirecting
  }

  return (
    <>
      <Form />
    </>
  );
};

export default LoginPage;
