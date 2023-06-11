<template>
  <div
    class="screen w-full h-screen absolute top-0 left-0 z-[2] bg-dark text-light flex justify-center items-center flex-col"
  >
    <div class="fireworks absolute w-full h-screen -z-10" v-if="isFirework">
      <div class="fireworks__inner">
        <div class="before"></div>
        <div class="after"></div>
      </div>
      <!-- <div class="circle-tunes"></div> -->
    </div>
    <h1 class="md:text-7xl text-lg">✨ Congratulations ✨</h1>
    <h3 class="text-5xl my-3">{{ store.state.timer }} seconds</h3>
    <button
      class="font-sans bg-transparent shadow-none border border-light text-light rounded-lg cursor-pointer mt-[.1rem] px-3 py-2 text-2xl"
      @click="onStartAgain(auth.currentUser.uid)"
    >
      Start Again
    </button>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/configs/firebase";
import { toISOString } from "@/utils/toISOString";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const auth = getAuth();
    const isFirework = ref(false);
    let totalTimer = ref(store.state.timer);

    const updateAchievements = async (uid) => {
      const querySnapshot = await getDoc(doc(db, "achievements", uid));
      if (querySnapshot.data().achievements.endTime == 0) {
        await updateDoc(doc(db, "achievements", querySnapshot.data().achievements.uid), {
          "achievements.endTime": new Date().getTime(),
        });
      }
      console.log("endTime", querySnapshot.data().achievements.endTime);
    };

    const handleAchievements = async (uid) => {
      const querySnapshot = await getDoc(doc(db, "achievements", uid));

      if (querySnapshot.data().achievements.complete) {
        const data = querySnapshot.data().achievements;
        const modes = querySnapshot.data().achievements.modes;

        totalTimer = computed(() => data.endTime - data.startTime);
        store.commit("setTimer", Math.round(totalTimer.value / 1000));
        // let newModes = modes.map((mode) =>
        //   mode.id === data.mid
        //     ? { ...mode, timer: 10, date: toISOString(new Date()) }
        //     : mode
        // );
        let newModes = [];
        modes.map((mode) => {
          if (mode.id == data.mid) {
            const newTimer =
              mode.timer <= 0 || totalTimer.value < mode.timer
                ? totalTimer.value
                : mode.timer;
            const newDate =
              mode.timer <= 0 || totalTimer.value < mode.timer
                ? toISOString(new Date())
                : mode.date;
            mode.timer <= 0 || totalTimer.value < mode.timer
              ? (isFirework.value = true)
              : (isFirework.value = false);
            newModes.push({ ...mode, timer: newTimer, date: newDate });
          } else {
            newModes.push(mode);
          }
        });
        await updateDoc(doc(db, "achievements", querySnapshot.data().achievements.uid), {
          "achievements.modes": newModes,
        });
        console.log(data, "totalTimer.value");
      } else {
        alert("You have not finished the game !!!");
        router.push({ name: "Match", params: {} });
      }
    };

    onAuthStateChanged(auth, async (_user) => {
      await updateAchievements(_user.uid);
      await handleAchievements(_user.uid);
    });

    async function onStartAgain(uid) {
      const querySnapshot = await getDoc(doc(db, "achievements", uid));
      await updateDoc(doc(db, "achievements", querySnapshot.data().achievements.uid), {
        "achievements.startTime": 0,
        "achievements.endTime": 0,
        "achievements.complete": false,
      });
      router.push({ name: "Match", params: {} });
    }

    return { store, totalTimer, isFirework, onStartAgain, auth };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/fireworks.scss";
</style>
<style scoped>
.screen button {
  transition: background 0.3s ease-in-out;
}
.screen button:hover {
  background-color: var(--light);
  color: var(--dark);
}
</style>
