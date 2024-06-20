"use client"
import { messageAtom } from "@/context/atom";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function MessageInput() {
	const [prompt, setPrompt] = useState("");
	const setTone=useSetRecoilState(messageAtom);


	useEffect(()=>{
		setTone("");
	  },[])
	const handleSubmit = async (e:any) => {
	  e.preventDefault();
	  const res = await fetch(`/api/chat?prompt=${encodeURIComponent(prompt)}`);

	  const data = await res.json();
	  setTone( data.msg || data.error || "Unknown error occurred");




	};

	return (<>
			<div className="flex-grow"></div>
			<div className="bg-white p-4 rounded-lg shadow-lg w-full flex items-center">
				<input
					type="text"
					className="flex-grow bg-gray-50 p-2 rounded-l-lg focus:outline-none w-full"
					placeholder="Type your message..."
					value={prompt}
					onChange={(e:any) => setPrompt(e.target.value)}
				/>


				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-gray-500 cursor-pointer"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					onClick={handleSubmit}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
					/>
				</svg>
			</div>
		</>
		)
	}
