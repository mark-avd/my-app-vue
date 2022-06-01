<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { useStore } from '@/store'
import draggableComponent from 'vuedraggable'
import LoadingDummy from '@/components/UI/LoadingDummy/LoadingDummy.vue'
import DragDropWord from '@/components/UI/DragDropWord/DragDropWord.vue'
import { DragItem } from '@/types'
import './styles.scss'

export default defineComponent({
  props: {
    initial: Boolean,
  },
  setup(props) {
    const store = useStore()
    const { initial } = toRefs(props)
    return {
      loading: computed(() => store.state.fetchStore.loading),
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
        return this.initial
          ? this.$store.state.sentenceStore.initialWords
          : this.$store.state.sentenceStore.targetWords
      },
      set(words: DragItem[]) {
        return this.initial
          ? this.$store.commit('setStartWords', words)
          : this.$store.commit('setTargetWords', words)
      },
    },
  },
})
</script>

<template>
  <div class="words-group" v-if="loading && initial">
    <loading-dummy />
  </div>
  <draggable-component
    v-else
    class="words-group"
    ghost-class="words-group__word_moving"
    group="words"
    v-model="words"
    :animation="250"
    :sort="!initial"
    :item-key="initial ? 'startWords' : 'targetWords'"
  >
    <template #item="{ element }">
      <drag-drop-word :key="element.id" :text="element.text" />
    </template>
  </draggable-component>
</template>
