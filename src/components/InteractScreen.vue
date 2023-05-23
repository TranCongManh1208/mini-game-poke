<template>
  <div class="screen">
    <div
      class="screen__inner"
      :style="{
        width: `${
          ((((920 - 16 * 4) / Math.sqrt(cardsContext.length)) * 3) / 4 + 16) *
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
        :rules="this.rules"
        :card="{ index, value: card }"
        @onFlip="checkRule($event)"
      />
    </div>
  </div>
</template>

<script>
import cardFlip from "./CardFlip.vue";
export default {
  props: {
    cardsContext: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {
    cardFlip,
  },
  data() {
    return {
      rules: [],
      quantityItem: 0,
    };
  },
  methods: {
    checkRule(card) {
      if (this.rules.length === 2) return;

      this.rules.push(card);

      if (this.rules.length == 2 && this.rules[0].value === this.rules[1].value) {
        console.log("Right...");
        this.$refs[`card-${this.rules[0].index}`][0].onEnabledDisabledMode();
        this.$refs[`card-${this.rules[1].index}`][0].onEnabledDisabledMode();
        this.rules = [];
        this.quantityItem += 1;
        if (this.quantityItem * 2 === this.cardsContext.length) {
          setTimeout(() => {
            this.$emit("onFinish");
          }, 1000);
        }
      } else if (this.rules.length == 2 && this.rules[0].value !== this.rules[1].value) {
        console.log("Wrong...");
        setTimeout(() => {
          console.log(this.cardsContext);
          this.$refs[`card-${this.rules[0].index}`][0].onFlipBackCard();
          this.$refs[`card-${this.rules[1].index}`][0].onFlipBackCard();
          this.rules = [];
        }, 1000);
      } else return;
    },
  },
};
</script>

<style lang="css" scoped>
.screen {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--dark);
  color: var(--light);
}

.screen__inner {
  /* width: 424px; */
  display: flex;
  flex-wrap: wrap;
  margin: 2rem auto;
}
</style>
