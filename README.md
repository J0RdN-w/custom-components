# Components Minimal Usage

``` auto complate minimal usage ```
<h-auto-complete
# model value to search items
          v-model="state"
# model value  which returns array or string type based on the given data          
          v-model:selectValue="autoComplete"
# model vlaue to get id value from the given data based on idLabel prop(attr)           
          v-model:id="id" 
          idLabel='id'    
          :data="data"
# object key from data object which used by auto-complate component to get item values  
    :field="'title'"
    :error-message="v$.state.$errors[0]?.$message">

 # header slot       
  <template #header="headerProps"> {{headerProps.val}} Header Content</template>

# footer slot
  <template #footer> Footer Content</template>

# default slot with each item data to customize and add style
  <template v-slot="slotProps">
            {{slotProps.data.id}} : {{slotProps.data.ptitle}}
  </template>

</h-auto-complete>



``` infinite scroll minimal usage ```
<h-infinite-scroll
# model value to search items
          v-model="state"
# model value  which returns array or string type based on the given data          
          v-model:selectValue="autoComplete"
# model vlaue to get id value from the given data based on idLabel prop(attr)           
          v-model:id="id" 
          idLabel='id'    
          :data="data"
# object key from data object which used by auto-complate component to get item values          
          :field="'title'"
          :loading="loading"
          :error-message="v$.state.$errors[0]?.$message"

# custom event to get more data after the scroller hits the last item          
          @fetch-more="getMoreDateFromServer"
        >
# default slot with each item data to customize and add style        
  <template v-slot="slotProps">
            {{slotProps.data.id}} : {{slotProps.data.ptitle}}
  </template>

 # header slot  
  <template #header="headerProps"> {{headerProps.val}} Header Content</template>

# footer slot
  <template #footer> Footer Content</template>
</h-infinite-scroll>



``` file upload minimal usage ```
<h-file-upload 

 # returns array of base64 files if multipe is true or base64 file
  v-model="file" 
  :error-message="v$.file.$errors[0]?.$message" 
/>



``` carousel minimal usage ```
 <h-carousel @scroll="getIndx" >

 # default slot to show carousel items 
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
   
   # arrow slot to customize prev and next icons and overlay(zen) mode icons
  <template #arrow="{ hasPrev, prev, hasNext, next }">
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

  # carousel indicator slot you can customize each indicators here
  # mind the for loop iteration here,it should be simial and has the same index with carsousel items
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

  # zen mode overlay slot. you can customize and style overlay here
   <template #overlay>
      <slot v-if="props.hasOverlay" name="overlay">
        <p class="text-secondary-8 py-2">You are in Overlay(Zen) Mode</p>
      </slot>
    </template>  


 </h-carousel>



``` pagination minimal usage ```
 <h-pagination v-model="pageIndex"/>



``` time picker minimal usage ```
<h-time-picker v-model="time" :error-message="v$.time.$errors[0]?.$message"/>



``` date picker minimal usage ```
 <h-date-picker v-model="datetime" :error-message="v$.datetime.$errors[0]?.$message" :events="[new Date(2022, 7, 10), new Date(2022, 7, 20)]" :range="true"/>



``` slider mimnimal usage ```
<h-sliders v-model="slider"/>




``` tabs minimal usage ```
 <h-tabs>

  # default slot to use multiple tab items
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

   # tab navigation header slot  
   <template #header>
        <slot>
           <PuzzleIcon class="w-4 h-4" />
        <span class="text-sm font-medium"> Tab Nav {{ index }} </span>
        </slot>
      </template>
    
  # tab body slot
   <template #default> default tab body contents {{ index + 1 }} </template>
    </o-tab-item>
  </slot>
 </h-tabs>