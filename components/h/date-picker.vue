<script setup>
const props = defineProps({
  modelValue: {
    type: [Date, Array],
    default: undefined,
  },
  locale: {
    type: [String, Array],
    default: "en-US",
    validator(value) {
      return Array.from(Array.isArray(value) ? value : [value]).every((each) =>
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
        ].includes(each)
      );
    },
  },
  showWeekNumber: {
    type: Boolean,
    default: false,
  },
  weekNumberClickable: {
    type: Boolean,
    default: true,
  },
  dayNames: {
    type: Array,
    default: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  },
  monthNames: {
    type: Array,
    default: undefined,
  },
  multiple: {
    type: Boolean,
    default: false,
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
    default: "Date Picker",
  },
  maxDate: {
    type: Date,
    default: undefined,
  },
  minDate: {
    type: Date,
    default: undefined,
  },
  range: {
    type: Boolean,
    default: true,
  },
  yearsRange: {
    type: Array,
    default: undefined,
  },
  errorMessage: {
    type: String,
    default: undefined,
  },
  events: {
    type: Array,
    default: [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: undefined,
  },
  iconRight: {
    type: String,
    default: undefined,
  },
  iconRightClickable: {
    type: Boolean,
    default: true,
  },
  iconNext: {
    type: String,
    default: undefined,
  },
  iconPrev: {
    type: String,
    default: undefined,
  },
  dateCreator: {
    type: Function,
    default: undefined,
  },
  dateFormatter: {
    type: Function,
    default: undefined,
  },
  dateParser: {
    type: Function,
    default: undefined,
  },
  closeOnClick: {
    type: Boolean,
    default: true,
  },
  mobileModal: {
    type: Boolean,
    default: false,
  },
  mobileNative: {
    type: Boolean,
    default: true,
  },
  nearbySelectableMonthDays: {
    type: Boolean,
    default: false,
  },
  selectableDates: {
    type: Array,
    default: [],
  },
  unselectableDates: {
    type: Array,
    default: [],
  },
  rootClass: {
    type: String,
    default: () => "",
  },
  boxClass: {
    type: String,
    default: () => "",
  },
  tableClass: {
    type: String,
    default: () => "",
  },
  tableBodyClass: {
    type: String,
    default: () => "",
  },
  tableHeadClass: {
    type: String,
    default: () => "",
  },
  tableHeadCellClass: {
    type: String,
    default: () => "",
  },
  tableRowClass: {
    type: String,
    default: () => "",
  },
  tableCellClass: {
    type: String,
    default: () => "",
  },
  tableCellSelectableClass: {
    type: String,
    default: () => "",
  },
  tableCellUnselectableClass: {
    type: String,
    default: () => "",
  },
  tableCellTodayClass: {
    type: String,
    default: () => "",
  },
  tableCellWithinHoveredClass: {
    type: String,
    default: () => "",
  },
  headerClass: {
    type: String,
    default: () => "",
  },
  listsClass: {
    type: String,
    default: () => "",
  },
  headerButtonsClass: {
    type: String,
    default: () => "",
  },
  inputClass: {
    type: String,
    default: () => "",
  },
  selectClass: {
    type: String,
    default: () => "",
  },
  tableCellFirstHoveredClass: {
    type: String,
    default: () => "",
  },
  tableCellLastHoveredClass: {
    type: String,
    default: () => "",
  },
  tableCellFirstSelectedClass: {
    type: String,
    default: () => "",
  },
  tableCellLastSelectedClass: {
    type: String,
    default: () => "",
  },
  tableCellEventsClass: {
    type: String,
    default: () => "",
  },
  tableEventsIndicatorClass: {
    type: String,
    default: () => "",
  },

  firstDayOfWeek: Number,
  focusedDate: Date,
});

const update = defineEmits(["update:modelValue"]);
const inputValue = ref(props.modelValue);

watch(
  () => inputValue.value,
  (newValue) => {
    update("update:modelValue", newValue);
  }
);
</script>

<template>
  <o-field :label="label">
    <o-datepicker
      v-model="inputValue"
      :placeholder="placeholder"
      :locale="locale"
      :range="range"
      :years-range="yearsRange"
      :multiple="multiple"
      :show-week-number="showWeekNumber"
      :week-number-clickable="weekNumberClickable"
      :icon="icon"
      :icon-right="iconRight"
      :icon-right-clickable="iconRightClickable"
      :icon-next="iconNext"
      :icon-prev="iconPrev"
      :events="events"
      :min-date="minDate"
      :max-date="maxDate"
      :validation-message="errorMessage"
      :inline="inline"
      :disabled="disabled"
      :date-creator="dateCreator"
      :date-formatter="dateFormatter"
      :date-parser="dateParser"
      :closeOnClick="closeOnClick"
      :dayNames="dayNames"
      :mobileModal="mobileModal"
      :monthNames="monthNames"
      :firstDayOfWeek="firstDayOfWeek"
      :mobileNative="mobileNative"
      :nearbySelectableMonthDays="nearbySelectableMonthDays"
      :selectableDates="selectableDates"
      :unselectableDates="unselectableDates"

      :input-classes="{
        inputClass: [
          'date-picker-input-class',
          ` ${
            props.disabled &&
            'border-secondary-3 hover:border-secondary-3 focus:border-secondary-3 cursor-not-allowed'
          } ${
            props.errorMessage &&
            'border-red-500 hover:border-red-500 focus:border-red-500'
          }`,
          props.inputClass,
        ],
      }"
      :root-class="['date-picker-root-class', props.rootClass]"
      :box-class="['date-picker-box-class', props.boxClass]"
      :table-class="['date-picker-table-class', props.tableClass]"
      :table-body-class="props.tableBodyClass"
      :table-head-class="[
        'date-picker-table-header-class',
        props.tableHeadClass,
      ]"
      :table-head-cell-class="[
        'date-picker-table-header-cell-class',
        props.tableHeadCellClass,
      ]"
      :table-row-class="['date-picker-table-row-class', props.tableRowClass]"
      :table-cell-class="['date-picker-table-cell-class', props.tableCellClass]"
      :table-cell-selectable-class="[
        'date-picker-table-cell-selectable-class',
        props.tableCellSelectableClass,
      ]"
      :table-cell-unselectable-class="[
        'date-picker-table-cell-unselectable-class',
        props.tableCellUnselectableClass,
      ]"
      :table-cell-today-class="[
        'date-picker-table-cell-today-class',
        props.tableCellTodayClass,
      ]"
      :table-cell-within-hovered-class="[
        'date-picker-table-cell-withn-hovered-class',
        props.tableCellWithinHoveredClass,
      ]"
      :table-cell-firstHovered-class="[
        'date-picker-table-cell-first-hovered-class',
        props.tableCellFirstHoveredClass,
      ]"
      :table-cell-lastHovered-class="[
        'date-picker-table-cell-last-hovered-class',
        props.tableCellLastHoveredClass,
      ]"
      :table-cell-first-Selected-class="[
        'date-picker-table-cell-first-selected-class',
        props.tableCellFirstSelectedClass,
      ]"
      :table-cell-last-Selected-class="[
        'date-picker-table-cell-last-selected-class',
        props.tableCellLastSelectedClass,
      ]"

      :table-cell-events-class="['date-picker-table-cell-event-class', props.tableCellEventsClass]"
      :tableEventsClass="['date-picker-table-events-indicator-class', props.tableEventsIndicatorClass]"

      :header-class="['date-picker-header-class', props.headerClass]"
      :lists-class="[
        'date-picker-list-class',
        'bg-transparnet foucs:outline-none',
        props.listsClass,
      ]"
      :header-buttons-class="props.headerButtonsClass"
      :select-classes="{
        selectClass: ['bg-primary rounded-full', props.selectClass],
      }"
    >
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #trigger>
        <slot name="trigger"></slot>
      </template>
      <template #table>
        <slot name="table"></slot>
      </template>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </o-datepicker>
    <p class="text-red-500 text-xs font-medium">{{ errorMessage }}</p>
  </o-field>
</template>
