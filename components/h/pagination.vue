<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 1,
  },
  order: {
    type: String,
    default: "centered",
    validator(value) {
      return ["left", "centered", "right"].includes(value);
    },
  },
  perPage: {
    type: [Number, String],
    default: 15,
  },
  rangeAfter: {
    type: [Number, String],
    default: 5,
  },
  rangeBefore: {
    type: [Number, String],
    default: 3,
  },
  simple: {
    type: Boolean,
    default: false,
  },
  total: {
    type: [Number, String],
    default: 200,
  },
  ariaCurrentLabel: {
    type: String,
    default: "Current Page",
  },
  ariaNextLabel: {
    type: String,
    default: "Next Page",
  },
  ariaPageLabel: {
    type: String,
    default: "Page",
  },
  ariaPreviousLabel: {
    type: String,
    default: "Previous Page",
  },
  rootClass: {
    type: String,
    default: () => "",
  },
  listClass: {
    type: String,
    default: () => "",
  },
  linkClass: {
    type: String,
    default: () => "",
  },
  linkCurrentClass: {
    type: String,
    default: () => "",
  },
  linkDisabledClass: {
    type: String,
    default: () => "",
  },
  simpleInfoClass: {
    type: String,
    default: () => "",
  },
  ellipsisClass: {
    type: String,
    default: () => "",
  },
  mobileClass: {
    type: String,
    default: () => "",
  },
});

const set = defineEmits(["update:modelValue", "change"]);
const currentValue = ref(props.modelValue);

watch(
  () => currentValue.value,
  (newValue) => {
    set("update:modelValue", newValue);
  }
);
</script>

<template>
  <o-pagination
    v-model:current="currentValue"
    :total="props.total"
    :range-before="props.rangeBefore"
    :range-after="props.rangeAfter"
    :order="props.order"
    :simple="props.simple"
    :per-page="props.perPage"
    :aria-next-label="props.ariaNextLabel"
    :aria-previous-label="props.ariaPreviousLabel"
    :aria-page-label="props.ariaPageLabel"
    :aria-current-label="props.ariaCurrentLabel"
    @change="(current) => set('change', current)"
    
    :root-class="['pagination-root-class', rootClass]"
    :list-class="[
      'pagination-list-class',
      `${props.order === 'centered' && 'justify-center'} ${
        props.order === 'right' && 'justify-end'
      }`,
      props.listClass,
    ]"
    :link-class="['pagination-link-class', props.linkClass]"
    :link-current-class="[
      'pagination-link-current-class',
      props.linkCurrentClass,
    ]"
    :link-disabled-class="[
      'pagination-link-disabled-class',
      props.linkDisabledClass,
    ]"
    :prev-btn-class="[props.order === 'left' ? 'order-2' : '']"
    :next-btn-class="[
      ['left', 'centered'].includes(props.order) ? 'order-3' : '',
    ]"
    :simple-class="['pagination-simple-class', props.simpleClass]"
    :info-class="['pagination-info-class', props.simpleInfoClass]"
    :ellipsis-class="['pagination-ellipsis-class', props.ellipsisClass]"
    :mobile-class="['pagination-mobile-class', props.mobileClass]"
  >
    <template #default="{ page }">
      <slot :page="page">
        <o-pagination-button :page="page" :id="`page${page.number}`">
          {{ page.number }}
        </o-pagination-button>
      </slot>
    </template>

    <template #previous="{ page }">
      <slot name="previous" :page="page">
        <o-pagination-button :page="page">
          <div
            :class="[
              'flex items-center justify-center',
              page.number === 0 ? 'text-secondary-6' : 'text-primary-3',
            ]"
          >
            <ChevronLeftIcon class="w-5 h-5" />
            <p class="text-xs font-medium">prev</p>
          </div>
        </o-pagination-button>
      </slot>
    </template>

    <template #next="{ page }">
      <slot name="next" :page="page">
        <o-pagination-button :page="page">
          <div
            :class="[
              'flex items-center justify-center',
              page.number === Math.ceil(props.total / props.perPage) + 1
                ? 'text-secondary-6'
                : 'text-primary-3',
            ]"
          >
            <p class="text-xs font-medium">next</p>
            <ChevronRightIcon class="w-5 h-5" />
          </div>
        </o-pagination-button>
      </slot>
    </template>
  </o-pagination>
</template>
