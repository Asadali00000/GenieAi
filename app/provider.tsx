"use client"

import { RecoilRoot } from "recoil"
import { SessionProvider } from "next-auth/react"
import ClientOnly from "@/component/sessionHandlerWrapper"
import SessionManager from "@/component/SessionManager"

export const Provider=({children}:{children:React.ReactNode})=>{
    return <RecoilRoot>

<SessionProvider>
	<ClientOnly>
		<SessionManager/>
	</ClientOnly>

        {children}
</SessionProvider>
    </RecoilRoot>
}
