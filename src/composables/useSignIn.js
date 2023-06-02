import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { authErrorCode } from "@/utils/authErrorCode";

const error = ref(null);
const isPending = ref(false);
const auth = getAuth();
const providerGG = new GoogleAuthProvider();
const providerFB = new FacebookAuthProvider();

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

async function googleSignIn() {
    try {
        await signInWithPopup(auth, providerGG).then(() => {
            console.log('success')
        })
    } catch (err) {
        error.value = authErrorCode[err.code];
    }
}

async function facebookSignIn() {
    try {
        await signInWithRedirect(auth, providerFB);
        await getRedirectResult(auth)
            .then((result) => {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                console.log('credential', token, user);
                // ...
            })
        // await signInWithPopup(auth, providerFB).then((result) => {
        //     const user = result.user;
        //     console.log('success', user, accessToken)
        //     const credential = FacebookAuthProvider.credentialFromResult(result);
        //     const accessToken = credential.accessToken;
        // })
    } catch (err) {
        error.value = authErrorCode[err.code];
    }
}

export function useSignIn() {
    return { error, isPending, signin, googleSignIn, facebookSignIn };
}