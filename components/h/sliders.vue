<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: "Slider",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  min: {
    type: Number, 
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number, 
    default: 1
  },
  lazy: {
    type: Boolean,
    default: false
  },
  customFormatter: {
    type: Function,
    default: val => val.toString() 
  },
  showIndicator: {
    type: Boolean,
    default: false
  },
  rootClass: {
    type: String,
    default: () => ""
  },
  trackClass: {
    type: String,
    default: () => ""
  },
  fillClass: {
    type: String, 
    default: () => ""
  },
  thumbWrapperClass: {
    type: String,
    default: () => ""
  },
  thumbClass: {
    type: String,
    default: () => ""
  }
});

const set = defineEmits(["update:modelValue"]);
const inputValue = ref(props.modelValue);

watch(
  () => inputValue.value,
  (newValue) => {
    set("update:modelValue", newValue);
  }
);

const indicator = ref(props.showIndicator)
const dragStart = (value) => {
  indicator.value = true
}
const dragEnd = (value) => {
 indicator.value = false
}
</script>
<template>
  <o-field :label="label">
    <o-slider
      :root-class="['slider-root-class', props.rootClass]"
      :track-class="['slider-track-class', 'group', props.trackClass]"
      :fill-class="['slider-fill-class', ` ${props.disabled && 'bg-secondary-3 hover:bg-secondary-3 group-hover:bg-secondary-3'}`, props.fillClass]"
      :thumb-wrapper-class="['slider-thumb-wrapper-class', `${props.disabled && 'bg-secondary-3 hover:bg-secondary-3 group-hover:bg-secondary-3'}`, props.thumbWrapperClass]"
      :thumb-class="['slider-thumb-class', 'bg-transparnet', props.thumbClass]"
      
      v-model="inputValue"
      :disabled="disabled"
      :min="min"
      :max="max"
      :lazy="lazy"
      :custom-formatter="customFormatter"
      :tooltip="false"
      :step="step"

      @dragstart="dragStart"
      @dragend="dragEnd"
      >
       <template v-if="indicator" #default>
         <div class="bg-secondary h-3 hover:bg-primary group-hover:bg-primary">
            <p class="-mt-7 -mr-2.5 -ml-2.5 p-0.5 bg-secondary hover:bg-primary group-hover:bg-primary text-xs font-semibold  text-secondary-8 flex items-center justify-center rounded-full">{{props.customFormatter(inputValue)}}</p>
         </div>
       </template>
      </o-slider
    >
  </o-field>
</template>
