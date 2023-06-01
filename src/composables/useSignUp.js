import { ref } from "vue";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { projectAuth } from "@/configs/firebase";
import { authErrorCode } from "@/utils/authErrorCode";

const auth = projectAuth();
const error = ref(null);
const isPending = ref(false);

async function signup(email, password, fullname) {
    error.value = null;
    isPending.value = true;
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        if (!response) throw new Error("Could not create new user");
        await updateProfile(response.user, { displayName: fullname });
        console.log("ress", response);
        return response;
    } catch (err) {
        error.value = authErrorCode[err.code];
    } finally {
        isPending.value = false;
    }
}

export function useSignUp() {
    return { error, isPending, signup };
}