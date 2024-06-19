// components/SessionManager.tsx
'use client'; // Ensures this is a client component
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSession } from 'next-auth/react';
import { authUserAtom } from '@/context/atom';

const SessionManager: React.FC = () => {
  const setUserEmail = useSetRecoilState(authUserAtom);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      setUserEmail(session.user.email);
    } else if (status === 'unauthenticated') {
      setUserEmail(null);
    }
  }, [session, status, setUserEmail]);

  return null;
};

export default SessionManager;
