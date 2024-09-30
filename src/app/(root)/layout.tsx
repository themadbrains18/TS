

// import Header from "@/components/Header";

import Footer from "@/components/header-footer/Footer";
import Header from "@/components/header-footer/Header";

export default function customerLayout({
    children
}:
    Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <>
            {/* <Header /> */}
            <Header />
            {children}
            <Footer />
        </>
    );
}
