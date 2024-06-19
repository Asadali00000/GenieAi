import { NextResponse } from "next/server";
import axios from "axios";
import { headers } from "next/headers";

// Handle GET requests to /api/generateImage
export async function GET(request) {
  try {
    // Extract text from the request query parameters
	const url = new URL(request.url, "http://localhost:3000");
    const text = url.searchParams.get('prompt');

    if (!text) {
      return NextResponse.json({ error: "Text prompt is required" }, { status: 400 });
    }
		const getApiLimit = await fetch("http://localhost:3000/api/api-limit/getApiLimit", {
			method: "GET",
			headers: headers(),

		});
		const allCredit = await getApiLimit.json();
		const apiCredit = allCredit.credit;


		const freeTrial=apiCredit.imageCredit;
		if (!freeTrial) {

			return  NextResponse.json({msg:"Free trial has expired."}, { status: 403 });
		}
// return NextResponse.json({});
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/image/generation",
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_IMAGE}`,
      },
      data: {
        providers: "replicate",
        text: text,
        resolution: "1024x1024",
      },
    };


    const response = await axios.request(options);
		const data={
			page:"imageCredit"
					}

					await fetch("http://localhost:3000/api/api-limit/decreaseCredit", {
						method: "POST",
						headers: headers(),
						body:JSON.stringify(data)
					});

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
