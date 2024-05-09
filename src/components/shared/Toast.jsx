import React from 'react';

const Toast = ({ message, type }) => {
  let colorClass = type === 'warning' ? 'orange' : type === 'error' ? 'red' : 'green';
  let classNameType = "mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg".replace(/green/g, colorClass);
  
  return (
    <div className={classNameType}>
        <p className="text-lg font-semibold">{type}</p>
        <p>{message}</p>
    </div>
  );
};

export default Toast;