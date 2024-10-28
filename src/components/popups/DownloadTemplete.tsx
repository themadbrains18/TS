"use client";

import React, { useState } from "react";
import Download from "./Download";
import SendLink from "./SendLink";
import Checkinbox from "./Checkinbox";
import { DownloadTemplatetype } from "@/types/type";

/**
 * DownloadTemplate component manages the state of three popups: Download, SendLink, and Checkinbox.
 * It handles the opening and closing of these popups and ensures that only one is visible at a time.
 *
 * @param {boolean} isFirstPopupOpen - Indicates if the first popup (Download) is open.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsFirstPopupOpen - State setter function to toggle the first popup.
 * @returns {JSX.Element} The rendered component containing the popups.
 */
const DownloadTemplate = ({ isFirstPopupOpen, setIsFirstPopupOpen,id,url }: DownloadTemplatetype) => {
    // State for managing the visibility of the second and third popups
    const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);
    const [isThirdPopupOpen, setIsThirdPopupOpen] = useState(false);

    /**
     * Toggles the state of the first popup (Download) to close it.
     */
    const closeFirstPopup = () => setIsFirstPopupOpen(!isFirstPopupOpen);

    /**
     * Toggles the state of the second popup (SendLink) to close it.
     */
    const closeSecondPopup = () => setIsSecondPopupOpen(!isSecondPopupOpen);

    /**
     * Toggles the state of the third popup (Checkinbox) to close it.
     */
    const closeThirdPopup = () => setIsThirdPopupOpen(!isThirdPopupOpen);

    /**
     * Opens the second popup (SendLink) and closes the first popup (Download).
     */
    const opensecoundpopup = () => {
        setIsSecondPopupOpen(true);
        setIsFirstPopupOpen(false);
    };

    /**
     * Opens the third popup (Checkinbox) and closes the first and second popups.
     */
    const openthirdpopup = () => {
        setIsThirdPopupOpen(true);
        setIsSecondPopupOpen(false);
        setIsFirstPopupOpen(false);
    };

    return (
        <div>
            <Download
                opensecoundpopup={opensecoundpopup}
                isPopupOpen={isFirstPopupOpen}
                closePopup={closeFirstPopup}
            />
            <SendLink
            id={id}
            url={url}
                openthirdpopup={openthirdpopup}
                isPopupOpen={isSecondPopupOpen}
                closePopup={closeSecondPopup}
            />
            <Checkinbox
                isPopupOpen={isThirdPopupOpen}
                closePopup={closeThirdPopup}
            />
        </div>
    );
};

export default DownloadTemplate;
