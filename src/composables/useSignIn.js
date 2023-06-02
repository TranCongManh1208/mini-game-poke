import { ref } from "vue";
import { projectAuth } from "@/configs/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { authErrorCode } from "@/utils/authErrorCode";

const error = ref(null);
const isPending = ref(false);
const auth = projectAuth();
const provider = new GoogleAuthProvider();

async function signin(email, password) {
    error.value = null;
    isPending.value = true;
    try {
        const reponse = await signInWithEmailAndPassword(auth, email, password);
        if (!reponse) throw new Error("wrong...");
        return reponse;
    } catch (err) {
        error.value = authErrorCode[err.code];
    } finally {
        isPending.value = false;
    }
}

function googleSignIn() {
    signInWithPopup(auth, provider).then(() => {
        console.log('success')
    }).catch(err => {
        error.value = authErrorCode[err.code];
    })
}

function facebookSignIn() {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log('success', user, accessToken)
    }).catch(err => {
        error.value = authErrorCode[err.code];
    })
}

export function useSignIn() {
    return { error, isPending, signin, googleSignIn, facebookSignIn };
}