"use client"
import NavBar from "@/component/NavBar";
import { SideBar } from "@/component/SideBar";
import { authUserAtom } from "@/context/atom";
import Loading from "@/ui/loading";
import type { Metadata } from "next";
import Image from "next/image";
import { useRecoilValue } from "recoil";



export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {

	const session = useRecoilValue(authUserAtom);
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex">
				<div className="w-72 border-r border-slate-300 min-h-screen ">
					<header className="w-full pb-2 pt-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center text-2xl font-bold shadow-lg rounded-b-lg ">
						<div className="flex items-center justify-center space-x-2">
							<Image
								src="https://popai-file.s3.ap-southeast-1.amazonaws.com/dalle3/d0dafe9f-9a97-46ed-99ae-4efaba93b7d4/bb108c19-8ba6-4b36-8c38-899ab97a6dc6/tplImg513ae61c994a4f30bec08e1a45cf0028"
								alt="Descriptive Alt Text"
								className="rounded-lg shadow-lg"
								width={50}
								height={50}
							/>
							<span>GenieAi</span>
						</div>
					</header>
					<div className="w-72 border-r border-slate-300 min-h-screen pt-28 sticky top-0 bg-gray-900">
						<div className="space-y-4 p-4 text-white">
							<SideBar href={session ? "./dashboard" : "../login"} title={"Dashboard"} icon={<HomeIcon />} />
							<SideBar href={session ? "./conversationBot" : "../login"} title={"Conversation AI"} icon={<TransferIcon />} />
							<SideBar href={session ? "./musicAi" : "../login"} title={"Music AI"} icon={<TransactionsIcon />} />
							<SideBar href={session ? "./code" : "../login"} title={"Code AI"} icon={<P2PTransferIcon />} />
							<SideBar href={session ? "./imageAi" : "../login"} title={"Image AI"} icon={<P2PTransferIcon />} />
						</div>
					</div>
				</div>
				<div className="flex flex-col flex-1 ml-2 ">
					<div className="sticky top-0">

						<NavBar />
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}

function HomeIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
		</svg>
	);
}

function TransferIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
		</svg>
	);
}

function TransactionsIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
		</svg>
	);
}

function P2PTransferIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
		</svg>
	);
}
