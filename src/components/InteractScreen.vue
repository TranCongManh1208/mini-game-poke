<template>
  <div class="screen w-full h-screen absolute top-0 left-0 bg-dark text-light">
    <div class="timer absolute right-10 top-10 flex flex-col justify-center">
      <!-- <span class="text-3xl">Time</span> -->
      <span class="text-5xl" :class="colorTimer ? 'text-red' : 'text-light'">{{
        timer
      }}</span>
    </div>
    <div
      class="timer absolute left-10 top-10 flex flex-col justify-center cursor-pointer"
      @click="backToHome"
    >
      <!-- <span class="text-3xl">Time</span> -->
      <span class="text-5xl">Back</span>
    </div>
    <div class="flex justify-center items-center md:h-auto h-full">
      <div
        class="screen__inner flex flex-wrap m-auto"
        :style="{
          width: `${
            ((((windowHeight - 16 * Math.sqrt(cardsContext.length)) /
              Math.sqrt(cardsContext.length)) *
              3) /
              4 +
              16) *
            Math.sqrt(cardsContext.length)
          }px`,
          height: `${
            ((((windowHeight - 16 * Math.sqrt(cardsContext.length)) /
              Math.sqrt(cardsContext.length)) *
              3) /
              4 +
              16) *
            Math.sqrt(cardsContext.length)
          }px`,
        }"
      >
        <card-flip
          v-for="(card, index) in cardsContext"
          :key="index"
          :ref="`card-${index}`"
          :imgBackFaceUrl="`images/${card}.png`"
          :cardsContext="cardsContext"
          :windowHeight="windowHeight"
          :rules="this.rules"
          :card="{ index, value: card }"
          @onFlip="checkRule($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/configs/firebase";
import cardFlip from "./CardFlip.vue";
import { shuffled } from "@/utils/array";
export default {
  components: {
    cardFlip,
  },
  computed: {
    ...mapGetters(["cardsContext", "windowHeight"]),
  },
  data() {
    return {
      rules: [],
      quantityItem: 0,
      timer: 0,
      colorTimer: false,
    };
  },
  methods: {
    backToHome() {
      this.$router.push({ name: "Match", params: {} });
    },
    async checkEmptyCard() {
      const auth = getAuth();
      const store = useStore();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      console.log("____-_user", this.cardsContext.length);
      onAuthStateChanged(auth, async (_user) => {
        await updateDoc(doc(db, "achievements", _user.uid), {
          "achievements.startTime": new Date().getTime(),
        });
        const querySnapshot = await getDoc(doc(db, "achievements", _user.uid));
        if (querySnapshot.data().achievements.mid !== 0) {
          const firstCard = Array.from(
            { length: querySnapshot.data().achievements.mid / 2 },
            (_, i) => i + 1
          );
          const secondCard = [...firstCard];
          const cards = [...firstCard, ...secondCard];
          store.commit("setCardsContext", shuffled(shuffled(shuffled(shuffled(cards)))));
          store.commit(
            "setWindowHeight",
            windowHeight >= windowWidth ? windowWidth : windowHeight
          );
          console.log(_user, "____user");
          setInterval(() => {
            this.timer += 1;
            querySnapshot.data().achievements.modes.map((mode) => {
              if (mode.id === querySnapshot.data().achievements.mid) {
                if (mode.timer !== 0 && this.timer > Math.round(mode.timer / 1000)) {
                  this.colorTimer = true;
                }
              }
            });
          }, 1000);
        } else {
          this.$router.push({ name: "Match", params: {} });
        }
      });
    },
    async checkRule(data) {
      const auth = getAuth();
      if (this.rules.length === 2) return;

      data.isFlipped.value ? this.rules.push(data.card) : (this.rules = []);

      if (this.rules.length == 2 && this.rules[0].value === this.rules[1].value) {
        console.log("Right...");
        this.$refs[`card-${this.rules[0].index}`][0].onEnabledDisabledMode();
        this.$refs[`card-${this.rules[1].index}`][0].onEnabledDisabledMode();
        this.rules = [];
        this.quantityItem += 1;
        if (this.quantityItem * 2 === this.cardsContext.length) {
          const querySnap = await getDoc(doc(db, "achievements", auth.currentUser.uid));
          await updateDoc(doc(db, "achievements", querySnap.data().achievements.uid), {
            "achievements.complete": true,
          });
          setTimeout(() => {
            this.$router.push({ name: "Result", params: {} });
          }, 800);
        }
      } else if (this.rules.length == 2 && this.rules[0].value !== this.rules[1].value) {
        console.log("Wrong...");
        setTimeout(() => {
          this.$refs[`card-${this.rules[0].index}`][0].onFlipBackCard();
          this.$refs[`card-${this.rules[1].index}`][0].onFlipBackCard();
          this.rules = [];
        }, 1000);
      } else return;
    },
  },
  created() {
    this.checkEmptyCard();
  },
};
</script>
