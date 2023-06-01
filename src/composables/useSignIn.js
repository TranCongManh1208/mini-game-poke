import { ref } from "vue";
import { projectAuth } from "@/configs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authErrorCode } from "@/utils/authErrorCode";

const error = ref(null);
const isPending = ref(false);
const auth = projectAuth();

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

export function useSignIn() {
    return { error, isPending, signin };
}