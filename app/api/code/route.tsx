import { headers } from "next/headers";
import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function GET(request: Request) {
  try {
    const url = new URL(request.url, "https://genieai-kjs1.onrender.com");
    const prompt = url.searchParams.get('prompt');

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }




		const getApiLimit = await fetch("https://genieai-kjs1.onrender.com/api/api-limit/getApiLimit", {
			method: "GET",
			headers: headers(),

		});
		const allCredit = await getApiLimit.json();
		const apiCredit = allCredit.credit;


		const freeTrial=apiCredit.CodeCredit;

		if (!freeTrial) {

			return  NextResponse.json({msg:"Free trial has expired."}, { status: 403 });
		}


    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const instructionMessage = {
      role: "system",
      content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations"
    };

    const fullPrompt = `${instructionMessage.content}\n\n${prompt}`;
    const result = await model.generateContent(fullPrompt);

    const candidates = result.response.candidates;
    let text = candidates[0].content.parts[0].text;
		const data={
			page:"CodeCredit"
					}

					await fetch("https://genieai-kjs1.onrender.com/api/api-limit/decreaseCredit", {
						method: "POST",
						headers: headers(),
						body:JSON.stringify(data)
					});

    return NextResponse.json({ msg: text });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
