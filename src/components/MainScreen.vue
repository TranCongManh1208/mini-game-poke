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
    <h1 class="md:text-7xl text-4xl uppercase w-1/3">
      <img
        src="http://fc00.deviantart.net/fs70/i/2012/308/0/b/__hd___pokemon_logo___hd___by_peetzaahhh2010-d5k08gz.png"
        alt="Pancake"
      />
    </h1>
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
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { shuffled } from "../utils/array";
import { db } from "@/configs/firebase";
import achievementses from "@/utils/addDoc";
// import playMusic from "@/utils/audios";
// import audioMain from "@/assets/audios/2.mp3";

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
      const { achievements } = achievementses(uid, mid);
      await setDoc(doc(db, "achievements", uid), { achievements });
    };

    const getAchievements = async (uid, mid) => {
      const querySnapshot = await getDoc(doc(db, "achievements", uid));
      if (!querySnapshot.data()) {
        setAchievements(uid, mid);
      } else {
        await updateDoc(doc(db, "achievements", querySnapshot.data().achievements.uid), {
          "achievements.mid": mid,
          "achievements.startTime": new Date().getTime(),
          "achievements.endTime": 0,
          "achievements.complete": false,
        });
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
      getAchievements(auth.currentUser.uid, totalOfBlocks);
      router.push({ name: "Interact", params: {} });
    }

    onAuthStateChanged(auth, async () => {
      // audio.play();
      if (auth.currentUser !== null) currentUser.value = auth.currentUser;
    });
    // console.log(audioMain);
    // playMusic(audioMain);

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
