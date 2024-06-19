"use client"
import React, { useState ,useEffect} from 'react';
import MessageInput from './messageInput';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { messageAtom, whichCreditAtom } from '@/context/atom';
import ReactMarkdown from 'react-markdown'

const MessageSender = () => {
   const [message,setMessage]=useState("");
   const messageAtomValue=useRecoilValue(messageAtom);
   const setMessageAtomValue=useSetRecoilState(messageAtom);
	 const setWhichPage=useSetRecoilState(whichCreditAtom);
	 setWhichPage("Message")
    useEffect(()=>{
setMessage(messageAtomValue);



	},[messageAtomValue,setMessageAtomValue]);
  return (
    <div className="flex flex-col justify-between min-h-screen w-full bg-gray-100 p-4">
			<div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
Chat
		</div>

       <ReactMarkdown>{message}</ReactMarkdown>
		<MessageInput/>

    </div>
  );
};

export default MessageSender;
