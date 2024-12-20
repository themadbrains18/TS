import PrevFooter from "./components/PrevFooter";
import PrevHeader from "./components/PrevHeader";

/**
 * preview Component
 * 
 * This component is a wrapper that renders its children. It is typically used to 
 * wrap other components or elements that are part of the login functionality.
 * 
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components or elements to be rendered inside this wrapper.
 * @returns {JSX.Element} The rendered children components or elements.
 */
export default function preview({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <PrevHeader />
        <div className="bg-bgcolor" >
            {children}
        </div>
        <PrevFooter />
    </>;
}
