<template>
  <div
    class="screen w-full h-screen absolute top-0 left-0 z-[2] bg-dark text-light flex justify-center items-center flex-col"
  >
    <h1 class="md:text-7xl text-5xl">✨ Congratulations ✨</h1>
    <h3 class="text-4xl mt-6">{{ store.state.timer }} seconds</h3>
    <button
      class="font-sans bg-transparent shadow-none border border-light text-light m-4 px-4 py-5 rounded-lg cursor-pointer text-xl"
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

    onAuthStateChanged(auth, async () => {
      await updateAchievements(auth.currentUser.uid);
      await handleAchievements(auth.currentUser.uid);
    });

    async function onStartAgain(uid) {
      const querySnap = await getDoc(doc(db, "achievements", uid));
      await updateDoc(doc(db, "achievements", querySnap.data().achievements.uid), {
        "achievements.startTime": 0,
        "achievements.endTime": 0,
        "achievements.complete": false,
      });
      router.push({ name: "Match", params: {} });
    }

    return { store, totalTimer, onStartAgain, auth };
  },
};
</script>

<style scoped>
.screen button {
  transition: background 0.3s ease-in-out;
}
.screen button:hover {
  background-color: var(--light);
  color: var(--dark);
}
</style>
