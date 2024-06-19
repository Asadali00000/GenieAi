"use client"


import { authUserAtom, creditAtom, messageAtom, whichCreditAtom } from '@/context/atom';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const NavBar: React.FC = () => {

	const whichPage = useRecoilValue(whichCreditAtom);
const [message,setMessage]=useRecoilState(messageAtom);
	const credit = useRecoilValue(creditAtom);
	const setCredit = useSetRecoilState(creditAtom);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/api-limit/getApiLimit');
				const data = await response.json();
			     const apiCredit= data.credit;


				  if(whichPage=='Message'){
					  setCredit(apiCredit.chatCredit);

					}else if(whichPage=='Code Credit'){
						setCredit(apiCredit.CodeCredit);

					}else if(whichPage=='Image'){
						setCredit(apiCredit.imageCredit);

					}else{
						setCredit(apiCredit.musicCredit);

					}

			} catch (error) {
				// console.log(error)
				console.error('Error fetching API limit count:', error);
			}
		};

		fetchData();
	}, [whichPage, setCredit,setMessage, message]);



	return (
		<nav className="sticky top-0  flex justify-between items-center p-4 bg-white text-black shadow-md z-50">
			<div className="text-lg font-bold">My App</div>
			<div className="text-lg"> {whichPage ? `Remaining ${whichPage}: ${credit}` : ""} </div>
		</nav>
	);
};

export default NavBar;
