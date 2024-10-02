import { cn } from '@/libs/utils';
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
            className={cn`fixed inset-0 z-[9999] flex items-center justify-center bg-[#28204699] ${overlayClass}`}
            onClick={handleOverlayClick}
        >
            <div
                ref={modalRef}
                className={cn`bg-white overflow-hidden shadow-xl max-w-fit  w-full mx-4  ${className}`}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;