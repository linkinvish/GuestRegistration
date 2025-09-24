
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
        Kanha Inn Guest Registration
      </h1>
      <p className="mt-2 text-md text-slate-600">
        Please fill out the form below to complete the guest check-in process.
      </p>
    </header>
  );
};

export default Header;
