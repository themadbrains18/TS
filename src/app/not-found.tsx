import { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <iframe src="https://lottie.host/embed/47720c95-9dbe-4c9f-9e4b-b68bb0834e41/ttCfC3RVHd.json"></iframe>
      <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
      <p className="my-4 text-lg text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <Button variant='primary' className='py-2'>   Go back home</Button>
      </Link>
    </div>
  );
}