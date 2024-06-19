"use client"
import { imageAtom, imageLoading } from "@/context/atom";
import Loading from "@/ui/loading";
import { NextResponse } from "next/server";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export default function ImageInput() {
	const [prompt, setPrompt] = useState("");
	const [response, setResponse] = useState("");
	const imageMessage=useRecoilValue(imageAtom);
const [loading ,setImageLoading]=useRecoilState(imageLoading);
	const setImageAtomValue=useSetRecoilState(imageAtom);

	const handleSubmit = async (e) => {
	  e.preventDefault();
	  setImageLoading(true);
	  const res = await fetch(`/api/image?prompt=${encodeURIComponent(prompt)}`);
	  setPrompt("");

	  const data = await res.json();
	  setImageLoading(false);
	  if(!res.ok){
setImageAtomValue("1")
	  }else{

		  setImageAtomValue( data.replicate.items[0].image || data.error || "Unknown error occurred");
		}




	};

	return (<>
			<div className="flex-grow"></div>
			<div className="bg-white p-4 rounded-lg shadow-lg w-full flex items-center">

								<input
									type="text"
									className="flex-grow bg-gray-50 p-2 rounded-l-lg focus:outline-none w-full"
									placeholder="Type your message..."
									value={prompt}
									onChange={(e) => setPrompt(e.target.value)}
								/>
			{loading ? (
            <Loading/>
          ) : (


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
          )}

			</div>
		</>
		)
	}
