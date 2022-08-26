<script setup>
import {ClockIcon, XIcon } from "@heroicons/vue/outline";

const props = defineProps({
  modelValue: {
    type: Date,
    default: undefined
  },
  locale: {
    type: String,
    default: "en-US",
    validator(value) {
      return [
        "en-US",
        "de-DE",
        "en-CA",
        "en-GB",
        "es-ES",
        "es-MX",
        "fr-CA",
        "fr-FR",
        "it-IT",
        "ja-JP",
        "pt-BR",
        "ru-RU",
        "zn-CN",
      ].includes(value);
    },
  },
  hourFormat: {
    type: String,
    default: "12",
    validator(value) {
      return ["12", "24"].includes(value);
    },
  },
  timeFormatter: {
    type: Function,
    default: undefined
  },
  inline: {
    type: Boolean,
    default: false
  },
  minTime: {
    type: Date,
    default: undefined,
  },
  maxTime: {
    type: Date,
    default: undefined,
  },
  hoursGranularity: {
    type: Number,
    default: 1
  },
  minutesGranularity: {
    type: Number,
    default: 1
  },
  secondsGranularity: {
    type: Number,
    default: 1
  },
  defaultMinutes: {
    type: Number, 
    default: undefined
  },
  defaultSeconds: {
    type: Number,
    default: undefined
  },
  enableSeconds: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,  
    default: "00:00:00 am"
  },
  label: {
    type: String, 
    default: "Time Picker"
  },
  icon: {
    type: String,
    default: undefined
  },
  errorMessage: {
    type: String,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  resetOnMeridianChange: {
    type: Boolean,
    default: false
  },
  unselectableTimes: {
    type: Array, 
    default: undefined
  },
  rootClass: {
    type: String,
    default: () => ""
  },
  boxClass: {
    type: String, 
    default: () => ""
  },
  separatorClass: {
    type: String,
    default: () => ""
  },
  footerClass: {
    type: String,
    default: () => ""
  },
  nowButtonClass: {
    type: String, 
    default: () => ""
  },
  clearButtonClass: {
    type: String,
    default: () => ""
  },
  inputClass: {
    type: String,
    default: () => ""
  },
  selectClass: {
    type: String,
    default: () => ""
  }
});

const update = defineEmits(['update:modelValue'])
const inputValue = ref(props.modelValue)

const set = () => inputValue.value = new Date()

const clear = () => inputValue.value = null

watch(
  () => inputValue.value,
  (newValue) => {
    update("update:modelValue", newValue);
  }
);

</script>
<template>
  <o-field :label="label">
    <o-timepicker
    :root-class="['time-picker-root-class', props.rootClass]"
    :box-class="['time-picker-box-class', props.boxClass]"
    :separator-class="['time-picker-separator-class', props.separatorClass]"
    :footerClass="['time-picker-footer-class', props.footerClass]"
    :inputClasses="{inputClass: ['time-picker-input-class', ` ${props.disabled && 'border-secondary-3 hover:border-secondary-3 focus:border-secondary-3 cursor-not-allowed'} ${props.errorMessage && 'border-red-500 hover:border-red-500 focus:border-red-500'} ${props.inputClass}`]}"
    :selectClasses="{selectClass: ['time-picker-select-class', props.selectClass]}"

      v-model="inputValue"
      :placeholder="placeholder"
      :enable-seconds="enableSeconds"
      :hour-format="hourFormat"
      :locale="locale"
      :min-time="minTime"
      :max-time="maxTime"
      :incrementHours="hoursGranularity"
      :incrementMinutes="minutesGranularity" 
      :incrementSeconds="secondsGranularity"
      :icon="icon"
      :inline="inline"
      :validationMessage="errorMessage"
      :defaultMinutes="defaultMinutes"
      :defaultSeconds="defaultSeconds"
      :disabled="disabled"
      :resetOnMeridianChange="resetOnMeridianChange"
      :timeFormatter="timeFormatter"
      :unselectableTimes="unselectableTimes"
    >
     <o-button label="Now" @click="set" class="text-sm hover:text-primary" :class="props.nowButtonClass" />
      <o-button label="Clear" class="text-sm hover:text-red-500" :class="props.clearButtonClass" @click="clear" />
    </o-timepicker>
    <p class="text-red-500 text-xs font-medium">{{ errorMessage }}</p> 
  </o-field>
</template>
