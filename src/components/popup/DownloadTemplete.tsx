"use client";

import React, { useState } from "react";
import Modal from "../ui/Modal";
import Download from "./Download";
import SendLink from "./SendLink";


interface DownloadTemplatetype {
    isFirstPopupOpen: boolean
    setIsFirstPopupOpen: any
}

const DownloadTemplate = ({ isFirstPopupOpen, setIsFirstPopupOpen }: DownloadTemplatetype) => {
    const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);
    const [isThirdPopupOpen, setIsThirdPopupOpen] = useState(false);



    const closeFirstPopup = () => setIsFirstPopupOpen(!isFirstPopupOpen);
    const closeSecondPopup = () => setIsSecondPopupOpen(!isSecondPopupOpen);
    const closeThirdPopup = () => setIsThirdPopupOpen(!isThirdPopupOpen);

    const opensecoundpopup = () => {
        setIsSecondPopupOpen(true)
        setIsFirstPopupOpen(false)
    }




    return (
        <div>
            <Download opensecoundpopup={opensecoundpopup} isPopupOpen={isFirstPopupOpen} closePopup={closeFirstPopup} />
            <SendLink isPopupOpen={isSecondPopupOpen} closePopup={closeSecondPopup} />
            <SendLink isPopupOpen={isThirdPopupOpen} closePopup={closeThirdPopup} />
        </div>
    );
};

export default DownloadTemplate;
