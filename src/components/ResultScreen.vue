<template>
  <div
    class="screen w-full h-screen absolute top-0 left-0 z-[2] bg-dark text-light flex justify-center items-center flex-col"
  >
    <h1 class="md:text-7xl text-5xl">✨ Congratulations ✨</h1>
    <h3 class="text-4xl mt-6">{{ Math.round(totalTimer / 1000) }} seconds</h3>
    <button
      class="font-sans bg-transparent shadow-none border border-light text-light m-4 px-4 py-5 rounded-lg cursor-pointer text-xl"
      @click="onStartAgain"
    >
      Start Again
    </button>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    let totalTimer = ref(0);
    console.log(store.getters.startedAt);
    if (store.getters.startedAt == null) {
      router.push({ name: "Match", params: {} });
    } else {
      totalTimer = computed(() => new Date().getTime() - store.getters.startedAt);
    }
    function onStartAgain() {
      router.push({ name: "Match", params: {} });
    }

    return { totalTimer, onStartAgain };
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
