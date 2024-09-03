// components/ProtectedRoute.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@supabase/auth-helpers-react';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  // If session is not yet determined, don't render anything
  if (!session) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
