// Backend API Route
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Replicate from "replicate";

// Initialize Replicate with your API token
const replicate = new Replicate({ auth: "r8_FzlRf0uKPNnNFVksHytncqPqw5pTslN1uVGG5" });
export async function GET(request:Request) {

	try {
		const getApiLimit = await fetch("https://genieai-kjs1.onrender.com/api/api-limit/getApiLimit", {
			method: "GET",
			headers: headers(),

		});
		const allCredit = await getApiLimit.json();
		const apiCredit = allCredit.credit;


		const freeTrial=apiCredit.chatCredit;
		if (!freeTrial) {

			return  NextResponse.json({msg:"Free trial has expired."}, { status: 403 });
		}
		const url = new URL(request.url, "https://genieai-kjs1.onrender.com");
		const tone = url.searchParams.get('tone');
		const duration = url.searchParams.get('duration');



		const inputparams = {
			prompt: tone,
			model_version: "stereo-large",
			output_format: "mp3",
			duration: Number(duration),
			normalization_strategy: "peak"
		};

		const output = await replicate.run("meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb", { input: inputparams });
		const data = {
			page: "musicCredit"
		}

		await fetch("https://genieai-kjs1.onrender.com/api/api-limit/decreaseCredit", {
			method: "POST",
			headers: headers(),
			body: JSON.stringify(data)
		});
		return NextResponse.json({ output });
	} catch (error) {
		console.error("Error generating music:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
