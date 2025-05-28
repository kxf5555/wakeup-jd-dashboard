import React from 'react';
export function Table({children}:{children:React.ReactNode}){return <table className='min-w-full divide-y divide-gray-200'>{children}</table>}
export function TableHeader({children}:{children:React.ReactNode}){return <thead className='bg-gray-100'>{children}</thead>}
export function TableBody({children}:{children:React.ReactNode}){return <tbody className='divide-y divide-gray-200'>{children}</tbody>}
export function TableRow({children,className}:{children:React.ReactNode,className?:string}){return <tr className={className}>{children}</tr>}
export function TableHead({children}:{children:React.ReactNode}){return <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>{children}</th>}
export function TableCell({children}:{children:React.ReactNode}){return <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-700'>{children}</td>}