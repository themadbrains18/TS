

// import Header from "@/components/Header";

import Footer from "@/components/header-footer/Footer";
import Header from "@/components/header-footer/Header";
import { DownloadProvider } from "../contexts/DailyDownloadsContext";

// import { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: 'Acme Dashboard',
//     description: 'The official Next.js Course Dashboard, built with App Router.',
// };

export default function customerLayout({
    children
}:
    Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <>
            <DownloadProvider>
                <Header />
                <div className=" lg:pt-[130px] pt-[68px]" >
                    {children}
                </div>
                <Footer />
            </DownloadProvider>
        </>
    );
}
