import React, { useEffect, useState } from 'react';
import { callFlagsId } from "@utils/flagsmithClient";

const BtnLink = ({ href, text, className, variant }) => {
    const [featureEnabled, setFeatureEnabled] = useState(false);

    useEffect(() => {
        const handleSendMessage = async () => {
            try {
                const enabled = await callFlagsId('92334', 'href_skoovify');
                setFeatureEnabled(enabled);
            } catch (error) {
                console.error('Error fetching feature status:', error);
            }
        };

        handleSendMessage();
    }, []);

    const getThemeStyle = () => variant === "primary" ? 
        "bg-primary border-transparent relative after:bg-[#172554] hover:border-[#172554]" : "text-primary";

    const getTextColor = () => variant === "primary" ? "text-white" : "text-primary";

    return (
      <div>
        {featureEnabled &&
            <a href={href} target="_blank" className={`px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 
                                after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554]
                                ${getThemeStyle(variant)} hover:after:opacity-100 hover:after:scale-[2.5] ${className}`}>
                <span className={`relative ${getTextColor(variant)} z-10`}>
                    {text}
                </span>
            </a>
        }
    </div>
  );
};

export default BtnLink;