<template>
  <router-view />
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./configs/firebase";

export default {
  name: "App",
  setup() {
    initializeApp(firebaseConfig);
    const auth = getAuth();
    const store = useStore();
    const router = useRouter();
    onAuthStateChanged(auth, async () => {
      store.commit("setUser", auth.currentUser);
      if (
        router.currentRoute.value.name !== "Profile" &&
        router.currentRoute.value.name !== "SignIn" &&
        router.currentRoute.value.name !== "SignUp"
      ) {
        router.push({
          name: `${auth.currentUser !== null ? "Match" : "SignIn"}`,
          params: {},
        });
      }
      console.log("auth", auth.currentUser);
    });
  },
};
</script>
