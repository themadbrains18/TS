"use client";

import React, { useState } from "react";
import Modal from "../ui/Modal";
import Download from "./Download";

const DownloadTemplate = () => {
    const [isFirstPopupOpen, setIsFirstPopupOpen] = useState(true);
    const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);
    const [isThirdPopupOpen, setIsThirdPopupOpen] = useState(false);

    const closeFirstPopup = () => setIsFirstPopupOpen(false);
    const closeSecondPopup = () => setIsSecondPopupOpen(false);
    const closeThirdPopup = () => setIsThirdPopupOpen(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Button to open the first popup */}
            <button
                onClick={() => setIsFirstPopupOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Open First Popup
            </button>

            {/* First Popup */}
            {/* <Modal isOpen={isFirstPopupOpen} onClose={closeFirstPopup}>
                <h2 className="text-xl font-bold mb-4">First Popup</h2>
                <p>Click the button to open the second popup.</p>
                <button
                    onClick={() => setIsSecondPopupOpen(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                    Open Second Popup
                </button>
            </Modal> */}
            <Download isPopupOpen={isFirstPopupOpen} closePopup={closeFirstPopup} />

            {/* Second Popup */}
            {/* <Modal isOpen={isSecondPopupOpen} onClose={closeSecondPopup}>
                <h2 className="text-xl font-bold mb-4">Second Popup</h2>
                <p>Click the button to open the third popup.</p>
                <button
                    onClick={() => setIsThirdPopupOpen(true)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                    Open Third Popup
                </button>
            </Modal> */}

            <Download isPopupOpen={isSecondPopupOpen} closePopup={closeSecondPopup} />

            {/* Third Popup */}
            <Modal isOpen={isThirdPopupOpen} onClose={closeThirdPopup}>
                <h2 className="text-xl font-bold mb-4">Third Popup</h2>
                <p>This is the third and final nested popup.</p>
            </Modal>
        </div>
    );
};

export default DownloadTemplate;
