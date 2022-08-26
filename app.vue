<template>
  <div class="bg-primary-5 min-h-screen w-screen overflow-hidden">
    <div class="bg-white bg-opacity-50 w-screen min-h-screen p-6 gap-12 overflow-y-scroll flex items-center flex-wrap">

        <h-auto-complete
        inputClass="sldjfd"
          v-model="state"
          v-model:selectValue="autoComplete"
          v-model:id="id"     
          :data="data"
          :field="'ptitle'"
          :error-message="v$.state.$errors[0]?.$message"
        >
        <template #header="headerProps"> {{headerProps.val}} Header Content</template>
        <template #footer> Footer Content</template>
        <template v-slot="slotProps">
            {{slotProps.option.id}} : {{slotProps.option.ptitle}}
        </template>
        </h-auto-complete>


        <h-infinite-scroll
          v-model="state"
          v-model:selectValue="autoComplete"
          v-model:id="id"     
          :data="data"
          :field="'ptitle'"
          :loading="false"
          :error-message="v$.state.$errors[0]?.$message"
          @fetch-more="getMoreDate"
        >
        <!-- <template v-slot="slotProps">
            {{slotProps.option.id}} : {{slotProps.option.ptitle}}
        </template> -->
        <template #header="headerProps"> {{headerProps.val}} Header Content</template>
        <template #footer> Footer Content</template>
        </h-infinite-scroll>

        <h-file-upload v-model="file" :error-message="v$.file.$errors[0]?.$message" />
        <h-time-picker v-model="time" :error-message="v$.time.$errors[0]?.$message"/>
        <h-sliders v-model="slider"/>
        <h-date-picker v-model="datetime" :error-message="v$.datetime.$errors[0]?.$message" :events="[new Date(2022, 7, 10), new Date(2022, 7, 20)]"/>
        <h-pagination />
        <h-carousel @scroll="getIndx" />
        <h-tabs></h-tabs>

      <button
        type="submit"
        @click="submitForm"
        class="mt-8 px-8 py-1.5 bg-primary rounded-full text-white text-sm font-semibold hover:ring-4 hover:ring-primary hover:ring-opacity-30 transition-all ease-in-out duration-300"
      >
        Check!
      </button>
    </div>
  </div>
</template>

<script async setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import projects from '~/graphql/queries/projects.query.gql'
import { useQuery } from "@urql/vue";

const getIndx = (val) => {
  console.log(val);
}

const state = ref('');
const autoComplete = ref(null)
const id = ref(null)

const { data: qData, error } = await useQuery({
      query: projects,
      variables: {title: state}
    })    

const data = computed(() => qData.value?.data) 

const slider = ref(30)
const time = ref(null)
const datetime  = ref()
const infscroller = ref("");
const file = ref(null);

watchEffect(() => {
  console.log(state.value, autoComplete.value, id.value, "|||", file.value);
});

const getMoreDate = () => {
  console.log("getting more data...");
}

const rules = computed(() => ({
  state: { required },
  file: { required },
  infscroller: {required},
  time: {required},
  datetime: {required},
}));

const v$ = useVuelidate(rules, { state, file, infscroller, time, datetime});

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    console.log(state.value, file.value, infscroller.value);
  } else {
    console.log("error");
  }
};
</script>
