<template>
  <div
    class="card inline-block mr-4 mb-4"
    :class="{ disabled: isDisabled }"
    :style="{
      height: `${
        (windowHeight - 16 * Math.sqrt(cardsContext.length)) /
        Math.sqrt(cardsContext.length)
      }px`,
      width: `${
        (((windowHeight - 16 * Math.sqrt(cardsContext.length)) /
          Math.sqrt(cardsContext.length)) *
          3) /
        4
      }px`,
    }"
  >
    <div
      class="card__inner w-full h-full relative cursor-pointer"
      :class="{ 'is-flipped': isFlipped }"
      @click="onToggleFlipCard()"
    >
      <div
        class="card__face card__face--front absolute w-full h-full overflow-hidden rounded-2xl md:p-3 p-1.5"
      >
        <div
          class="card__content w-full h-full"
          :style="{
            backgroundSize: `${
              (((windowHeight - 16 * Math.sqrt(cardsContext.length)) /
                Math.sqrt(cardsContext.length)) *
                3) /
              4 /
              3
            }px ${
              (((windowHeight - 16 * Math.sqrt(cardsContext.length)) /
                Math.sqrt(cardsContext.length)) *
                3) /
              4 /
              3
            }px`,
            perspective: `${
              (((windowHeight - 16 * Math.sqrt(cardsContext.length)) /
                Math.sqrt(cardsContext.length)) *
                3) /
              4 /
              2
            }px`,
          }"
        ></div>
      </div>
      <div
        class="card__face card__face--back absolute w-full h-full overflow-hidden rounded-2xl md:p-3 p-1.5"
      >
        <div
          class="card__content w-full h-full bg-contain bg-no-repeat bg-center"
          :style="{ backgroundImage: `url(${require('@/assets/' + imgBackFaceUrl)})` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    card: {
      type: [String, Number, Array, Object],
    },
    imgBackFaceUrl: {
      type: String,
      required: true,
    },
    cardsContext: {
      type: Array,
      default: function () {
        return [];
      },
    },
    windowHeight: {
      type: Number,
      default: function () {
        return 992;
      },
    },
    rules: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  setup(props, context) {
    const isFlipped = ref(false);
    const isDisabled = ref(false);
    function onToggleFlipCard() {
      if (isDisabled.value || props.rules.length == 2) return;

      if (props.rules.length == 2) {
        isFlipped.value = true;
      } else {
        isFlipped.value = !isFlipped.value;
      }

      if (isFlipped.value) {
        const card = ref(props.card).value;
        context.emit("onFlip", { card, isFlipped });
      } else {
        const card = ref({}).value;
        context.emit("onFlip", { card, isFlipped });
      }
    }

    function onFlipBackCard() {
      isFlipped.value = false;
    }

    function onEnabledDisabledMode() {
      isDisabled.value = true;
    }

    return {
      isFlipped,
      isDisabled,
      onToggleFlipCard,
      onFlipBackCard,
      onEnabledDisabledMode,
    };
  },
};
</script>

<style lang="css" scoped>
.card__inner {
  transition: transform 1s;
  transform-style: preserve-3d;
}

.card__inner.is-flipped {
  transform: rotateY(-180deg);
}
.card__face {
  backface-visibility: hidden;
  box-shadow: 0 3px 10px 3px rgb(0, 0, 0, 0.2);
}

.card__face--front .card__content {
  background: url("../assets/images/icon_back.png") no-repeat center center;
  background-size: 60px 60px;
}
.card__face--back {
  background-color: var(--light);
  transform: rotateY(180deg);
}

.card.disabled .card__inner {
  cursor: default;
}
</style>
