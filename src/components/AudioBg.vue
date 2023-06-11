<template>
  <div
    class="absolute top-[100px] left-[40px] z-10 w-[60px] h-[60px] cursor-pointer"
    :ref="audio"
    @click="onSound"
  >
    <img
      v-if="isSound"
      class="w-full h-full"
      src="@/assets/audios/audio.png"
      alt="muted"
    />
    <img v-else class="w-full h-full" src="@/assets/audios/mute.png" alt="muted" />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const isSound = ref(false);
    const audio = new Audio(require("@/assets/audios/2.mp3"));

    function onSound() {
      isSound.value = !isSound.value;
      audio.loop = true;
      if (isSound.value) {
        audio.play();
        audio.mute = false;
      } else {
        audio.pause();
        audio.mute = true;
        audio.currentTime = 0;
      }
    }

    return { isSound, onSound };
  },
};
</script>
