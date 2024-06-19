import React from 'react';

export function Card({
  title,
  children
}: {
  title: string,
  children: React.ReactNode
}): JSX.Element {
  return (
    <div className="flex flex-col items-center border p-6 rounded-xl bg-[#ededed]">
      <div className='mb-4' >{children}</div>
      <div className="text-center">{title}</div>
    </div>
  );
}
