

// import Header from "@/components/Header";

import Footer from "@/components/header-footer/Footer";
import Header from "@/components/header-footer/Header";
import { DownloadProvider } from "../contexts/DailyDownloadsContext";

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
            {children}
            <Footer />
         </DownloadProvider>
        </>
    );
}
