<script setup>
import {
  CloudUploadIcon,
  TrashIcon,
  PlusCircleIcon,
  PencilIcon,
  MusicNoteIcon,
  FilmIcon,
  DocumentTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/solid";

const props = defineProps({
  modelValue: {
    type: [Object, File, Array],
    default: [],
  },
  errorMessage: {
    type: String,
    default: undefined,
  },
  accept: {
    type: String,
    default: "/*",
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  dragDrop: {
    type: Boolean,
    default: true,
  },
  native: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: [String, Number],
    default: undefined,
  },
  defaultFileUrl: {
    type: String,
    default: "",
  },
  buttonClass: {
    type: String,
    default: () => "",
  },
  rootClass: {
    type: String,
    default: () => "",
  },
  dropZoneClass: {
    type: String,
    default: () => "",
  },
  draggableClass: {
    type: String,
    default: () => "",
  },
  hoveredClass: {
    type: String,
    default: () => "",
  },
  previewClass: {
    type: String,
    default: () => "",
  },
  sceneClass: {
    type: String,
    default: () => "",
  },
  itemsClass: {
    type: String,
    default: () => "",
  },
});

const update = defineEmits(["update:modelValue", "input"]);

const fileValues = ref(props.modelValue);

watch(
  () => fileValues.value,
  (newValue) => {
    update("update:modelValue", newValue);
  }
);

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const onChange = (event) => {
  const { files } = event.target;

  if (props.multiple) {
    fileValues.value = [];
    Object.values(files).forEach((file) => {
      getBase64(file).then((data) =>
        fileValues.value.push({
          name: file.name,
          base64: data,
          type: file.type,
          size: file.size,
        })
      );
    });
  } else {
    getBase64(files[0]).then(
      (data) =>
        (fileValues.value = {
          name: files[0].name,
          base64: data,
          type: files[0].type,
          size: files[0].size,
        })
    );
  }
};

const onAdd = (event) => {
  const { files } = event.target;

  if (Array.isArray(fileValues.value))
    getBase64(files[0]).then((data) =>
      fileValues.value.push({
        name: files[0].name,
        base64: data,
        type: files[0].type,
        size: files[0].size,
      })
    );
  else
    getBase64(files[0]).then(
      (data) =>
        (fileValues.value = {
          name: files[0].name,
          base64: data,
          type: files[0].type,
          size: files[0].size,
        })
    );
};

const deleteFile = (base64) => {
  if (Array.isArray(fileValues.value))
    fileValues.value = fileValues.value?.filter(
      (file) => file.base64 !== base64
    );
  else fileValues.value = null;
};
</script>
<template>
  <o-field class="file">
    <section
      :class="[
        props.rootClass ? props.rootClass : '',
        !props.disabled && props.dragDrop
          ? 'border-primary-3'
          : 'border-secondary-3',
        props.errorMessage ? 'border-red-500' : '',
      ]"
      class="f-root-class"
    >
      <o-upload
        v-if="(props.multiple && fileValues?.length <= 0) || !fileValues"
        drag-drop
        :draggable-class="['f-draggable-class', draggableClass]"
        :hovered-class="['f-hovered-class', hoveredClass]"
        class="hidden p-2"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        :dragDrop="dragDrop"
        :maxlength="maxlength"
        :native="native"
        :validationMessage="errorMessage"
        @input="onChange"
      >
        <section
          :class="[
            !props.disabled && props.dragDrop
              ? 'text-secondary'
              : 'text-secondary-3',
            !props.dropZoneClass ? props.dropZoneClass : '',
          ]"
          class="f-drop-zone-class"
        >
          <p class="flex-1 flex items-center justify-center">
            <CloudUploadIcon
              :class="[
                !props.disabled && props.dragDrop
                  ? 'text-primary'
                  : 'text-secondary-3',
              ]"
              class="w-12 h-12 delay-300 duration-300"
            />
          </p>
          <h3 class="flex-1 text-center font-bold break-all">
            Drag and Drop
            <span
              :class="[
                !props.disabled && props.dragDrop
                  ? 'text-primary'
                  : 'text-secondary-3',
              ]"
              >files </span
            >Here or
          </h3>
        </section>

        <o-button
          tag="a"
          variant="primary"
          :disabled="props.disabled"
          :class="[
            props.buttonClass ? props.buttonClass : '',
            props.errorMessage ? 'ring-red-500' : '',
          ]"
          class="f-button-class"
        >
          Click to Upload
        </o-button>
        <p class="text-red-500 text-xs font-medium">{{ errorMessage }}</p>
      </o-upload>

      <o-carousel
        v-else
        class="w-full h-full flex-1"
        :scene-class="['f-scene-class', props.sceneClass]"
        :items-class="['f-items-class', props.itemsClass]"
      >
        <o-carousel-item
          itemClass="min-w-full min-h-full"
          v-for="(file, index) in props.multiple ? fileValues : [fileValues]"
          :key="index"
        >
          <section
            :class="[props.previewClass ? props.previewClass : '']"
            class="f-preview-class group"
          >
            <img
              v-if="file.type?.includes('image')"
              :src="file.base64"
              alt="image"
              class="min-w-full object-contain aspect-video object-center"
            />

            <component
              v-else
              :is="
                file.type?.includes('audio')
                  ? MusicNoteIcon
                  : file.type?.includes('video')
                  ? FilmIcon
                  : DocumentTextIcon
              "
              class="w-24 h-24 drop-shadow-2xl text-primary self-center"
            />

            <div
              class="min-w-full text-primary-5 p-2 absolute bottom-0 bg-secondary bg-opacity-50 z-50 flex flex-col gap-1 items-start invisible group-hover:visible"
            >
              <p class="font-medium break-all">
                {{ file.name }}
              </p>
              <p class="text-sm font-medium break-all">
                {{ Number(file.size) / 1024 }} MB
              </p>
              <div
                class="flex flex-1 items-end justify-end self-end pb-2 gap-4"
              >
                <o-upload
                  @input="(event) => onAdd(event)"
                  :accept="accept"
                  class="hidden p-2"
                >
                  <component
                    :is="props.multiple ? PlusCircleIcon : PencilIcon"
                    class="w-8 h-8 drop-shadow text-primary-5 hover:text-primary cursor-pointer transition-colors ease-in-out duration-300"
                  />
                </o-upload>
                <TrashIcon
                  class="w-8 h-8 drop-shadow text-primary-5 cursor-pointer hover:text-red-500 transition-colors ease-in-out duration-300"
                  @click="deleteFile(file.base64)"
                />
              </div>
            </div>
          </section>
        </o-carousel-item>

        <template #arrow="{ hasPrev, prev, hasNext, next }">
          <ChevronLeftIcon
              v-show="hasPrev"
              @click="prev"
              class="w-6 h-6 text-secondary bg-primary-5 rounded-full absolute inset-y-0 my-auto left-4 drop-shadow-md cursor-pointer"
            />
            <ChevronRightIcon
              v-show="hasNext"
              @click="next"
              class="w-6 h-6 text-secondary bg-primary-5 rounded-full absolute inset-y-0 my-auto right-4 drop-shadow-md cursor-pointer"
            />
        </template>

      </o-carousel>
    </section>
  </o-field>
</template>
