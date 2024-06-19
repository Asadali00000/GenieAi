import {atom} from 'recoil'

export const messageAtom=atom({
 key:'messageAtom',
default:""
});
export const codeAtom=atom({
 key:'codeAtom',
default:""
});
export const imageAtom=atom({
 key:'imageAtom',
default:""
});
export const imageLoading=atom({
 key:'imageLoading',
default:false
});
export const whichCreditAtom=atom({
 key:'whichCreditAtom',
default:""
});

export const creditAtom=atom<Number | null>({
 key:'creditAtom',
default:0
});
export const authUserAtom=atom<string | null>({
 key:'authUserAtom',
default:null
});

