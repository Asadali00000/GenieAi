"use client"
import { whichCreditAtom } from "@/context/atom";
import { Card } from "@/ui/card";
import Image from "next/image";
import { useSetRecoilState } from "recoil";




export default function Page() {
	const setWhichPage = useSetRecoilState(whichCreditAtom);
	setWhichPage("")

	return (



		<div className="w-auto">
			<div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
				Dashboard
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 ">

				<Card title="ChatBot">

					<div className="flex-col">
						<Image
							src="https://mspoweruser.com/wp-content/uploads/2023/12/Google-Gemini-AI-model.jpg" // Path to your image in the public directory
							alt="Description of the image"
							onClick={() => window.location.href = './conversationBot'}
							width={300} // Desired width of the image
							height={200} // Desired height of the image
						/>



					</div>
				</Card>


				<Card title="Music AI">

					<div className="flex-col">
						<Image
							src="https://mspoweruser.com/wp-content/uploads/2023/12/Google-Gemini-AI-model.jpg" // Path to your image in the public directory
							alt="Description of the image"
							onClick={() => window.location.href = './musicAi'}
							width={300} // Desired width of the image
							height={200} // Desired height of the image
						/>



					</div>
				</Card>
				<Card title="Code Generator">

					<div className="flex-col">
						<Image
							src="https://mspoweruser.com/wp-content/uploads/2023/12/Google-Gemini-AI-model.jpg" // Path to your image in the public directory
							alt="Description of the image"
							onClick={() => window.location.href = './Code'}
							width={300} // Desired width of the image
							height={200} // Desired height of the image
						/>



					</div>
				</Card>
				<Card title="Image Generator">

					<div className="flex-col">
						<Image
							src="https://mspoweruser.com/wp-content/uploads/2023/12/Google-Gemini-AI-model.jpg" // Path to your image in the public directory
							alt="Description of the image"
							onClick={() => window.location.href = './Code'}
							width={300}
							height={200}
						/>



					</div>
				</Card>
			</div>
		</div>
	)

}
