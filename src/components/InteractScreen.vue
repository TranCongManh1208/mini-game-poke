<template>
  <div class="screen w-full h-screen absolute top-0 left-0 bg-dark text-light">
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
import { useRouter } from "vue-router";
import cardFlip from "./CardFlip.vue";
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
    };
  },
  methods: {
    checkEmptyCard() {
      const router = useRouter();
      if (this.cardsContext.length == 0) {
        router.push({ name: "Match", params: {} });
      }
    },
    checkRule(data) {
      if (this.rules.length === 2) return;

      data.isFlipped.value ? this.rules.push(data.card) : (this.rules = []);

      if (this.rules.length == 2 && this.rules[0].value === this.rules[1].value) {
        console.log("Right...");
        this.$refs[`card-${this.rules[0].index}`][0].onEnabledDisabledMode();
        this.$refs[`card-${this.rules[1].index}`][0].onEnabledDisabledMode();
        this.rules = [];
        this.quantityItem += 1;
        if (this.quantityItem * 2 === this.cardsContext.length) {
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
  created: function () {
    this.checkEmptyCard();
  },
};
</script>
