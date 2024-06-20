"use client";
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { codeAtom, messageAtom, whichCreditAtom } from '@/context/atom';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Import the 'vs' theme
import CodeInput from './CodeInput';



const CodeSender = () => {
	const messageAtomValue = useRecoilValue(messageAtom);
	const setWhichPage = useSetRecoilState(whichCreditAtom);

	setWhichPage("Code Credit")

	// useEffect(() => {
	// 	if (messageAtomValue) {
	// 		const codeWithoutBackticks = messageAtomValue.substring(2, messageAtomValue.length - 2);
	// 		setMessage(codeWithoutBackticks);
	// 	}

	// }, [messageAtomValue]);


	const handleCopy = () => {
		navigator.clipboard.writeText(messageAtomValue);
	};
	const codeString = messageAtomValue.substring(3, messageAtomValue.length - 3);
	return (
		<>
			<div className="flex flex-col justify-between min-h-screen w-full bg-gray-100 p-4">
				<div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
					Code Generator
				</div>
				<div className="relative">
					<SyntaxHighlighter language="javascript" style={vs}>

						{codeString}

					</SyntaxHighlighter>
					<button
						onClick={handleCopy}
						className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded"
					>
						Copy Code
					</button>
				</div>
				<CodeInput />
			</div>
		</>
	);
};

export default CodeSender;
