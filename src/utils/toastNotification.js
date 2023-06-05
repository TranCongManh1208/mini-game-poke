
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const toast = useToast();

export function toastNotification(value) {
    toast.open(value);
}

