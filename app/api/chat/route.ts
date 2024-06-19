import axios from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function GET(request) {

	const getApiLimit = await fetch("http://localhost:3000/api/api-limit/getApiLimit", {
		method: "GET",
		headers: headers(),

	});
	const allCredit = await getApiLimit.json();
	const apiCredit = allCredit.credit;


	const freeTrial = apiCredit.chatCredit;
	if (!freeTrial) {

		return NextResponse.json({ msg: "Free trial has expired." }, { status: 403 });
	}





	try {


		const url = new URL(request.url, "http://localhost:3000");
		const prompt = url.searchParams.get('prompt');
		if (!prompt) {
			return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
		}


		const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY || "");
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

		const result = await model.generateContent(prompt);

		const candidates = result.response.candidates;

		let text = candidates[0].content.parts[0].text;
		// return NextResponse.json({msg:text})


		const data = {
			page: "chatCredit"
		}

		await fetch("http://localhost:3000/api/api-limit/decreaseCredit", {
			method: "POST",
			headers: headers(),
			body: JSON.stringify(data)
		});



		return NextResponse.json({ msg: text });
	} catch (error) {
		console.error("Error generating content:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
