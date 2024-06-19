"use client"
import { usePathname ,useRouter} from "next/navigation"
import React from "react";

export function SideBar({ href, title, icon }: { href: string, title: string, icon: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const selected = pathname === href;
    return (
        <div
            className={`flex space-x-2 ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer p-2 `}
            onClick={() => {
                router.push(href);
            }}
        >

            <div >
                {icon}

            </div>

            <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
                {title}
            </div>
        </div>
    );
}
