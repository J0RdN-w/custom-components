<script setup>
import {
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowsExpandIcon,
} from "@heroicons/vue/solid";

const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: undefined,
  },
  indicator: {
    type: Boolean,
    default: true,
  },
  arrow: {
    type: Boolean,
    default: true,
  },
  arrowHover: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  pauseHover: {
    type: Boolean,
    default: false,
  },
  hasDrag: {
    type: Boolean,
    default: true,
  },
  hasOverlay: {
    type: Boolean,
    default: true,
  },
  repeat: {
    type: Boolean,
    default: false,
  },
  itemsToShow: {
    type: Number,
    default: 1,
  },
  itemsToList: {
    type: Number,
    default: 1,
  },
  rootClass: {
    type: String,
    default: () => ""
  },
  overlayClass: {
    type: String,
    default: () => ""
  },
  sceneClass: {
    type: String,
    default: () => ""
  },
  itemsClass: {
    type: String,
    default: () => ""
  },
  itemsDraggingClass: {
    type: String,
    default: () => ""
  },
  arrowIconClass: {
    type: String,
    default: () => ""
  },
  indicatorsClass: {
    type: String,
    default: () => ""
  },
  indicatorItemClass: {
    type: String,
    default: () => ""
  },
  overlayIconClass: {
    type: String,
    default: () => ""
  },
  arrowIconPrevClass: {
    type: String,
    default: () => ""
  },
  arrowIconNextClass: {
    type: String,
    default: () => ""
  }
});

const set = defineEmits(['scroll'])
const overlay = ref(false);

const colors = computed(() => [
  "#4E65FF",
  "#09203F",
  "#444f60",
  "#009688",
  "#516395",
]);

</script>
<template>
  <o-carousel
    :arrow="arrow"
    :arrow-hover="arrowHover"
    :overlay="overlay"
    :has-drag="hasDrag"
    :autoplay="autoplay"
    :indicator="indicator"
    :repeat="repeat"
    :items-to-show="itemsToShow"
    :items-to-list="itemsToList"
    :pause-hover="pauseHover"
    @scroll="indx => $emit('scroll', indx)"

    :root-class="['c-root-class', props.rootClass]"
    :overlay-class="['c-overlay-class', props.overlayClass]"
    :scene-class="['c-scene-class', props.sceneClass]"
    :items-class="['c-items-class', props.itemsClass]"
    :items-dragging-class="props.itemsDraggingClass"
    :arrow-icon-class="props.arrowIconClass"
    :indicators-class="`min-w-full flex items-center ${props.indicatorsClass}`"
    :indicator-item-class="`flex items-center ${props.indicatorItemClass}`"
  >
    <slot> 
      <o-carousel-item
      v-for="(color, i) in colors"
      :key="i"
      itemClass="min-h-full pr-1"
      itemActiveClass=" min-h-full text-secondary-8"
    >
      <section class="ex-slide rounded" :style="`background-color: ${color}`">
        <h1 class="text-sm text-secondary-4 p-3 text-center font-semibold">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Necessitatibus quae architecto praesentium, excepturi doloribus dolor
          voluptatum nobis, tempora illo nulla iste atque perspiciatis amet
          pariatur enim et, unde suscipit tenetur.
        </h1>
      </section>
    </o-carousel-item>
    </slot>

    <template #arrow="{ hasPrev, prev, hasNext, next }">
      <!-- have arrow icon next and prev class in default -->
      <component
        v-if="props.hasOverlay"
        :is="overlay ? XCircleIcon : ArrowsExpandIcon"
        @click="overlay = !overlay"
        class="cursor-pointer absolute top-1 right-2 text-secondary-8 w-4 h-4"
        :class="props.overlayIconClass"
      />

      <slot
        v-if="props.arrow"
        name="arrow"
        :prev="prev"
        :hasPrev="hasPrev"
        :next="next"
        :hasNext="hasNext"
      >
        <ChevronLeftIcon
          v-show="hasPrev"
          @click="prev"
          class="w-6 h-6 text-secondary bg-secondary-8 bg-opacity-80 rounded-full absolute inset-y-0 my-auto left-3 drop-shadow-md cursor-pointer"
          :class="props.arrowIconPrevClass"
        />
        <ChevronRightIcon
          v-show="hasNext"
          @click="next"
          class="w-6 h-6 text-secondary bg-secondary-8 bg-opacity-80 rounded-full absolute inset-y-0 my-auto right-3 drop-shadow-md cursor-pointer"
          :class="props.arrowIconNextClass"
        />
      </slot>
    </template>

    <template #indicators="{ active, switchTo }">
      <slot v-if="props.indicator" name="indicators">
        <div class="min-w-full flex items-center justify-center gap-2 p-0.5">
          <div
            @click="switchTo(i)"
            v-for="(color, i) in colors"
            :key="i"
            class="w-2 h-2 cursor-pointer rounded-full ring-1 ring-secondary"
            :class="{ 'bg-secondary': active === i }"
          ></div>
        </div>
      </slot>
    </template>

    <template #overlay>
      <slot v-if="props.hasOverlay" name="overlay">
        <p class="text-secondary-8 py-2">You are in Overlay(Zen) Mode</p>
      </slot>
    </template>
  </o-carousel>
</template>
