<template>
  <div class="flex items-center justify-end me-5 relative z-10">
    <div class="profile top-3 right-3 cursor-pointer">
      <div class="profile__name flex justify-end items-center">
        <img
          v-if="currentUser !== null"
          class="w-12 h-12 rounded-t-full"
          :src="currentUser.photoURL"
          :alt="currentUser.displayName"
        />
        <img
          v-else
          class="w-12 h-12 rounded-t-full"
          src="../assets/images/10.png"
          :alt="currentUser.displayName"
        />
        <span class="text-light text-3xl ms-3">{{ currentUser.displayName }}</span>
      </div>
      <div class="profile__nav absolute w-[200px] right-0">
        <ul>
          <li class="text-light text-2xl text-right">
            <router-link :to="{ name: 'Profile', params: {} }" class="decoration-clone"
              >View Profile</router-link
            >
          </li>
          <li class="text-light text-2xl text-right">
            <router-link :to="{ name: 'Logout', params: {} }" class="decoration-clone"
              >Logout</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div
    class="screen w-full h-screen absolute top-0 left-0 flex justify-center items-center flex-col z-[2] bg-dark text-light"
  >
    <h1 class="md:text-7xl text-4xl uppercase">POKE MEMORIES</h1>
    <h3 class="text-4xl">Select mode to start game</h3>
    <div class="modes grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      <button
        class="w-full h-full p-8 flex flex-col justify-center items-center rounded-2xl cursor-pointer bg-transparent shadow-none text-light border border-light"
        @click="onStart(16)"
      >
        <span class="first:text-3xl last:block last:text-xl last:mt-2">4x4</span>
        <span class="first:text-3xl last:block last:text-xl last:mt-2">Easy</span>
      </button>
      <button
        class="w-full h-full p-8 flex flex-col justify-center items-center rounded-2xl cursor-pointer bg-transparent shadow-none text-light border border-light"
        @click="onStart(36)"
      >
        <span class="first:text-3xl last:block last:text-xl last:mt-2">6x6</span>
        <span class="first:text-3xl last:block last:text-xl last:mt-2">Normal</span>
      </button>
      <button
        class="w-full h-full p-8 flex flex-col justify-center items-center rounded-2xl cursor-pointer bg-transparent shadow-none text-light border border-light"
        @click="onStart(64)"
      >
        <span class="first:text-3xl last:block last:text-xl last:mt-2">8x8</span>
        <span class="first:text-3xl last:block last:text-xl last:mt-2">Hard</span>
      </button>
      <button
        class="w-full h-full p-8 flex flex-col justify-center items-center rounded-2xl cursor-pointer bg-transparent shadow-none text-light border border-light"
        @click="onStart(100)"
      >
        <span class="first:text-3xl last:block last:text-xl last:mt-2">10x10</span>
        <span class="first:text-3xl last:block last:text-xl last:mt-2">Super Hard</span>
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { shuffled } from "../utils/array";
import { db } from "@/configs/firebase";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const auth = getAuth();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const cardsContext = ref([]);
    const startedAt = ref(null);
    let currentUser = ref("");

    const setAchievements = async (uid, mid) => {
      try {
        const docRef = await addDoc(collection(db, "achievements"), {
          uid: uid,
          mid: mid,
          modes: [
            {
              id: 16,
              mode: "4x4",
              timer: 0,
              date: "20/10/2020",
            },
            {
              id: 36,
              mode: "6x6",
              timer: 0,
              date: "20/10/2020",
            },
            {
              id: 64,
              mode: "8x8",
              timer: 0,
              date: "20/10/2020",
            },
            {
              id: 100,
              mode: "10x10",
              timer: 0,
              date: "20/10/2020",
            },
          ],
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    function onStart(totalOfBlocks) {
      const firstCard = Array.from({ length: totalOfBlocks / 2 }, (_, i) => i + 1);
      const secondCard = [...firstCard];
      const cards = [...firstCard, ...secondCard];
      cardsContext.value = shuffled(shuffled(shuffled(shuffled(cards))));
      startedAt.value = new Date().getTime();

      store.commit("setTotalOfBlocks", totalOfBlocks);
      store.commit("setCardsContext", cardsContext.value);
      store.commit("setStartedAt", startedAt.value);
      store.commit(
        "setWindowHeight",
        windowHeight >= windowWidth ? windowWidth : windowHeight
      );
      setAchievements(auth.currentUser.uid, totalOfBlocks);
      console.log("currentUser", auth.currentUser);
      router.push({ name: "Interact", params: {} });
    }

    onAuthStateChanged(auth, async () => {
      if (auth.currentUser !== null) currentUser.value = auth.currentUser;
    });

    return { currentUser, onStart };
  },
};
</script>

<style lang="css" scoped>
.modes button {
  font: var(--font);
  transition: background 0.3s ease-in-out;
}
.modes button:hover {
  background-color: var(--light);
  color: var(--dark);
}
.profile {
  width: max-content;
  left: calc(100% - 240px);
}
.profile__nav {
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s;
}

.profile:hover .profile__nav {
  opacity: 1;
  visibility: visible;
}
</style>
