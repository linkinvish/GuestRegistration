
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-4 mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default Section;
