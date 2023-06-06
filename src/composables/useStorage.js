import { ref } from "vue";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUser } from "./useUser";

const storage = getStorage();
const { getUser } = useUser();
const { user } = getUser();

const useStorage = (name) => {
    const error = ref(null)
    const filePath = ref(null);
    const url = ref(user.value.photoURL);

    async function uploadFile(file) {
        if (!file.name) return url.value = file;
        filePath.value = `${name}/${user.value.uid}/${file.name}`;
        const fileRef = storageRef(storage, filePath.value);
        // const fileRef = storageRef(filePath.value);
        try {
            const reponse = await uploadBytes(fileRef, file).then((snapshot) => snapshot)
            url.value = await getDownloadURL(reponse.ref).then((_url) => _url);
            return url.value;
        } catch (err) {
            error.value = err.massage;
        }
    }
    return { error, filePath, url, uploadFile }
}

export default useStorage;