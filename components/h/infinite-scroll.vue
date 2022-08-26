<script setup>

const props = defineProps({
  modelValue: {
    type: [String, Number, null],
    required: true,
  },
  selectValue: {
    type: [String, Object, null],
    required: true,
  },
  data: {
    type: Array,
    required: true,
    default: [],
  },
  field: {
    type: String,
    required: true,
  },
  loading: {
      type: Boolean,
      required: true
  },
  id: {
    type: [String, Number],
    default: undefined,
  },
  idLabel: {
    type: String,
    default: "id",
  },
  errorMessage: {
    type: String,
    default: undefined,
  },
  inputType: {
    type: String,
    default: 'text'
  },
  checkInfiniteScroll: {
    type: Boolean,
    default: true,
  },
  debounceTyping: {
    type: Number,
    default: 0,
  },
  placeholder: {
    type: String,
    default: "placeholder",
  },
  label: {
    type: String,
    default: "Infinite Scroll",
  },
  leadingIcon: {
    type: String,
    default: undefined,
  },
  trailerIcon: {
    type: String,
    default: undefined,
  },
  trailerIconClickable: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  clearOnSelect: {
    type: Boolean,
    default: false,
  },
  keepFirst: {
    type: Boolean,
    default: true,
  },
  keepOpen: {
    type: Boolean,
    default: false,
  },
  openOnFocus: {
    type: Boolean,
    default: true,
  },
  selectOnClickOutside: {
    //Trigger the select event for the first pre-selected option when clicking outside and keep-first is enabled
    type: Boolean,
    default: false,
  },
  labelClass: {
    type: String,
    default: () => "",
  },
  rootClass: {
    type: String,
    default: () => "",
  },
  menuClass: {
    type: String,
    default: () => "",
  },
  itemClass: {
    type: String,
    default: () => "",
  },
  itemHoverClass: {
    type: String,
    default: () => "",
  },
  itemEmptyClass: {
    type: String,
    default: () => "",
  },
  itemGroupTitleClass: {
    type: String,
    default: () => "",
  },
  inputClass: {
    type: String,
    default: () => "",
  },
  itemHeaderClass: {
    type: String,
    default: () => "",
  },
  itemFooterClass: {
    type: String,
    default: () => "",
  },
});

const set = defineEmits([
  "update:modelValue",
  "update:selectValue",
  "update:id",
  "fetchMore"
]);

const data = toRef(props, "data");

const inputValue = ref(props.modelValue);

watch(
  () => inputValue.value,
  (newValue) => {
    set("update:modelValue", newValue);
  }
);

const clear = () => {
  inputValue.value = "";
  set("update:modelValue", undefined);
  set("update:selectValue", undefined);
  set("update:id", undefined);
};

</script>

<template>
  <section>
    <label
      for="o-field"
      :class="labelClass"
      class="text-sm font-semibold text-secondary-5"
      >{{ props.label }}</label
    >
    <o-field id="o-field" class="transition-all ease-in-out duration-300">
      <o-autocomplete
        :root-class="['a-root-class', props.rootClass]"
        :menu-class="['a-menu-class', 'absolute top-0, left-0 right-0 bg-bg-opacity-95 max-h-[16rem] overflow-y-scroll', props.menuClass]"
        :item-class="['a-item-class', props.itemClass]"
        :item-group-title-class="['a-item-group-title-class', props.itemGroupTitleClass]"
        :item-empty-class="['a-item-empty-class', props.itemEmptyClass]" 
        :item-hover-class="['a-item-hover-class', props.itemHoverClass]" 
        :input-classes="{inputClass:['a-input-class', 'min-w-[24rem]', errorMessage && 'ring-red-500 hover:ring-red-500 focus:ring-red-500', props.inputClass]}"
        :item-footer-class="['a-item-footer-class', props.itemFooterClass]"
        :item-header-class="['a-item-header-class', props.itemHeaderClass]"

        v-model="inputValue"
        :data="data"
        :field="field"
        :loading="loading"
        :type="inputType"
        :check-infinite-scroll="checkInfiniteScroll"
        :debounceTyping="debounceTyping"
        :validationMessage="errorMessage"
        :placeholder="placeholder"
        :keep-first="keepFirst"
        :keep-open="keepOpen"
        :open-on-focus="openOnFocus"
        :select-on-click-outside="selectOnClickOutside"
        :clearable="clearable"
        :clearOnSelect="clearOnSelect"
        :icon="leadingIcon"
        :iconRight="trailerIcon"
        :iconRightClickable="trailerIconClickable"

        @select="
          (option) => {
            $emit('update:selectValue', option);
            option
              ? $emit('update:id', option[props.idLabel])
              : $emit('update:id', undefined);
          }
        "
        @infinite-scroll="$emit('fetchMore')"
      >
         <template v-slot="props"> 
              <!-- you can customize and style each item using this slot -->
              <slot :option="props.option">  
                 {{ field ? props.option[field] : props.option }}
              </slot>
          </template>

        <template #empty>
          <slot name="empty"> No results found </slot>
        </template>
        <template #header>
          <slot name="header" />
        </template>
        <template #footer>
          <slot name="footer" />
        </template>

      </o-autocomplete>

      <p class="text-red-500 text-xs font-medium">{{ errorMessage }}</p>
    </o-field>
  </section>
</template>
