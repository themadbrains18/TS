import React, { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    overlayClass?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className, overlayClass }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75 ${overlayClass}`}
            onClick={handleOverlayClick}
        >
            <div
                ref={modalRef}
                className={`bg-white rounded-lg overflow-hidden shadow-xl max-w-fit w-full mx-4 px-5 py-4 md:px-[32px] md:py-4 ${className}`}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
