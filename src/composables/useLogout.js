import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";

const error = ref(null);
const auth = getAuth();
async function logout() {
    error.value = null;
    try {
        const reponse = await signOut(auth);
        return reponse;
    } catch (err) {
        error.value = err.message;
    }
}

export function useLogout() {
    return { error, logout };
}