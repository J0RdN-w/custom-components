<script setup>
import { PuzzleIcon } from "@heroicons/vue/solid";
const props = defineProps({
  activeTab: {
    type: [Number, String],
    default: 0,
  },
  destroyOnHide: {
    type: Boolean,
    default: false,
  },
  rootClass: {
    type: String,
    default: () => ""
  },
  navTabsClass: {
    type: String,
    default: () => ""
  },
  tabItemWrapperClass: {
    type: String,
    default: () => ""
  },
  contentClass: {
    type: String,
    default: () => ""
  }
});

const update = defineEmits(["update:activeTab"]);
const activeTab = ref(props.activeTab);

watch(
  () => activeTab.value,
  (newValue) => {
    update("update:activeTab", newValue);
  }
);

const inp = (value) => {
  console.log(value);
};
</script>

<template>
  <o-tabs
    v-model="activeTab"
    :destroyOnHide="destroyOnHide"

    :root-class="['t-root-class', props.rootClass]"
    :nav-tabs-class="['t-nav-tab-class', props.navTabsClass]"
    :tab-item-wrapper-class="['t-tab-item-wrapper-class', props.tabItemWrapperClass]"
    :content-class="['t-content-class', props.contentClass]"
  >
  <slot>
    <o-tab-item
      v-for="(item, index) in [0, 1, 2]"
      :key="`tab-${index}`"
      :value="index"
      :visible="true"
      :disabled="false"

      :itemHeaderClass="`py-2 min-w-[7rem] hover:bg-primary-5 hover:rounded-sm text-secondary-dark flex items-center gap-2 ${
        activeTab === index  && 'text-primary border-b-2 border-primary-3'}`"
      itemHeaderActiveClass="bg-secondary"
      itemHeaderDisabledClass="bg-primary"
    >
      <template #header>
        <slot>
           <PuzzleIcon class="w-4 h-4" />
        <span class="text-sm font-medium"> Tab Nav {{ index }} </span>
        </slot>
      </template>
      <template #default> default tab body contents {{ index + 1 }} </template>
    </o-tab-item>
  </slot>
  </o-tabs>
</template>
