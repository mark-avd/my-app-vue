<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import draggableComponent from 'vuedraggable'
import LoadingDummy from '@/components/UI/LoadingDummy.vue'
import DragDropWord from '@/components/DragDropWord.vue'
import store from '@/store'
import { DragItem } from '@/types'

export default defineComponent({
  props: {
    initial: Boolean,
  },
  setup(props) {
    const { initial } = toRefs(props)
    return {
      loading: computed(() => store.state.loading),
    }
  },
  components: {
    DragDropWord,
    LoadingDummy,
    draggableComponent,
  },
  computed: {
    words: {
      get() {
        return this.initial ? store.state.startWords : store.state.targetWords
      },
      set(words: DragItem[]) {
        return this.initial
          ? store.commit('setStartWords', words)
          : store.commit('setTargetWords', words)
      },
    },
  },
})
</script>

<template>
  <div class="words-group" v-if="loading">
    <loading-dummy />
  </div>
  <draggable-component
    v-else
    class="words-group"
    ghost-class="words-group__word_moving"
    v-model="words"
    group="words"
    :animation="250"
    :item-key="initial ? 'startWords' : 'targetWords'"
  >
    <template #item="{ element }">
      <drag-drop-word :key="element.id" :text="element.text" />
    </template>
  </draggable-component>
</template>

<style lang="scss">
.words-group {
  align-content: flex-start;
  border-top: 1px solid #030303;
  display: flex;
  flex-wrap: wrap;
  min-height: 110px;
  padding: 6px;

  &__word_moving {
    opacity: 0.5;
    background: #f7fafc;
    border: 1px solid #4299e1;
  }
}
</style>
