import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const MessageComponent = ({ message }) => {
  useEffect(() => {
    confetti();
  }, []);

  return (
    <div className="p-5 sm:p-6 lg:p-8 rounded-3xl border border-box-border bg-box-bg shadow-lg shadow-box-shadow relative overflow-hidden">
        <div className="mt-6 space-y-4 relative">
            <h2 className="text-lg md:text-xl font-semibold text-heading-2">
                {message.nameide}
            </h2>
            {
            message.shortcuts.map((shortcut, index) => (
                <p key={index} className={`md:text-lg text-heading-3`}>{shortcut.so} : {shortcut.shortcut}</p>
            ))
            }
            <p className={`md:text-lg text-heading-3`}>{message.note}</p>
        </div>
        <span className="absolute w-32 aspect-square -bottom-16 -right-16 bg-primary/10 rounded-full"></span>
    </div>
  );
};
export default MessageComponent;