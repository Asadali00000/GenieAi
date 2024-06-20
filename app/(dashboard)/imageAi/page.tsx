"use client"
import React, { useState ,useEffect} from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { NextResponse } from 'next/server';
import ReactMarkdown from 'react-markdown'
import { imageAtom, whichCreditAtom } from '@/context/atom';
import ImageInput from './imageInput';
import Image from 'next/image';

const MessageSender = () => {

   const [message,setMessage]=useState("");
   const messageAtomValue=useRecoilValue(imageAtom);
   const setWhichPage=useSetRecoilState(whichCreditAtom);
   setWhichPage("Image")
    useEffect(()=>{
setMessage(messageAtomValue);



	},[messageAtomValue]);
  return (

    <div className="flex flex-col justify-between min-h-screen w-full bg-gray-100 p-4">
			<div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
 Image
		</div>

		{message.length>1 &&


			<Image
		src={`data:image/jpeg;base64,${message}`}
	alt="Example Image"
width={500}
height={300}

/>
}{ message=='1' && <div>Free Trial has expired</div>

}

		<ImageInput/>

    </div>
  );
};

export default MessageSender;
