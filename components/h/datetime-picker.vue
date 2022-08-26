<script setup>
import { ClockIcon, XIcon } from "@heroicons/vue/outline";

const props = defineProps({
  modelValue: {
    type: Date,
    default: undefined,
  },
  locale: {
    type: [String, Array],
    default: "en-US",
    validator(value) {
      return Array.from(Array.isArray(value) ? value : [value]).every(each => 
       [
        "de-DE",
        "en-CA",
        "en-GB",
        "en-US",
        "es-ES",
        "es-MX",
        "fr-CA",
        "fr-FR",
        "it-IT",
        "ja-JP",
        "pt-BR",
        "ru-RU",
      ].includes(each))
    },
  },
  showWeekNumber: {
    type: Boolean,
    default: false
  },
  enableSeconds: {
    type: Boolean,
    default: true,
  },
  hourFormat: {
    type: String,
    default: "12",
    validator(value) {
      return ["12", "24"].includes(value);
    },
  },

  inline: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "11/05/1992, 00:00 am",
  },
  label: {
    type: String,
    default: "DateTime Picker",
  },
  errorMessage: {
    type: String,
    default: undefined
  },
  datetimeFormatter: {
    type: Function, 
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: undefined,
  },
  iconRight: {
    type: String, 
    default: undefined
  },
  maxDatetime: {
    type: Date, 
    default: undefined
  },
  minDatetime: {
    type: Date, 
    default: undefined
  }
});

const update = defineEmits(["update:modelValue"]);
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
    <o-datetimepicker
      v-model="inputValue"
      :placeholder="placeholder"
      :locale="locale"
      :icon="icon"
      :iconRight="iconRight"
      :datepicker="{ showWeekNumber }"
      :timepicker="{ enableSeconds, hourFormat }"
      :inline="inline"
      :validationMessage="errorMessage"
      :datetimeFormatter="datetimeFormatter"
      :disabled="disabled"
      :maxDatetime="maxDatetime"
      :minDatetime="minDatetime"

      class="flex bg-primary font-semibold text-green-500"
      datepickerWrapperClass="focus:outline-none hover:outline-none placeholder:text-sm placeholder:tracking-wider text-sm tracking-wider font-medium text-secondary placeholder:font-medium outline-none px-2 py-1.5 border-2 border-secondary-6 hover:border-primary focus:border-primary rounded-md bg-transparent"
      timepickerWrapperClass="bg-secondary-8 flex items-center p-4 rounded-md mt-0.5 drop-shadow-md text-secondary-6 font-bold tracking-wider"
    >
      <o-button
        label="Now"
        @click="set"
        class="hover:text-primary"
      />
      <o-button
        label="Clear"
        class="hover:text-red-500"
        @click="clear"
      />
    </o-datetimepicker>
  </o-field>
</template>
