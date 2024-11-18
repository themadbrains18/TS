'use client';

import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * Define the type for the context value
 */
interface DownloadContextType {
  downloads: number | null;
  imageUrl: string | null;
  setDownloads: React.Dispatch<React.SetStateAction<number | null>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  fetchDailyDownloads: () => Promise<void>;
}

/**
 * Provide a default value for the context
 */

const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export const useDownload = (): DownloadContextType => {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error('useDownload must be used within a DownloadProvider');
  }
  return context;
};

interface DownloadProviderProps {
  children: ReactNode;
}

export const DownloadProvider: React.FC<DownloadProviderProps> = ({ children }) => {
  const [downloads, setDownloads] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { data: session } = useSession();

  /**
   * Fetch daily downloads and imageUrl from the API or session
   */
  const fetchDailyDownloads = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/free-download`, {
      headers: {
        Authorization: `Bearer ` + session?.token,
      },
    });
    const data = await response.json();

    setDownloads(data.downloads?.freeDownloads || null);
    setImageUrl(data.downloads?.profileImg || null);
  };

  useEffect(() => {
    if (session) {
      fetchDailyDownloads();
    }
  }, [session]);

  return (
    <DownloadContext.Provider value={{ downloads, imageUrl, setDownloads, setImageUrl, fetchDailyDownloads }}>
      {children}
    </DownloadContext.Provider>
  );
};
