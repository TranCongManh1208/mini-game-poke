<template>
  <audio-bg />
  <router-view />
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./configs/firebase";
import AudioBg from "./components/AudioBg.vue";

export default {
  name: "App",
  components: {
    AudioBg,
  },
  setup() {
    initializeApp(firebaseConfig);
    const auth = getAuth();
    const store = useStore();
    const router = useRouter();
    onAuthStateChanged(auth, async (_user) => {
      store.commit("setUser", _user);
      if (auth.currentUser === null) {
        router.push({
          name: "SignIn",
          params: {},
        });
      }
    });
  },
};
</script>
