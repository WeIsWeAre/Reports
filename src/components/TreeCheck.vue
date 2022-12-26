<!-- Vue SFC -->
<template>
  <div>
    <div v-if="loading">
      <loader></loader>
    </div>
    <div v-else>
      <treeselect alwaysOpen class="treesel" :max-height="500" multiple :options="valuesReportOptios"
        :disable-branch-nodes="true" v-model="value" :show-count="true" @input="updateValue()"
        placeholder="Выберите значения" valueFormat="object" />
    </div>

  </div>
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import Loader from './Loader.vue'

  export default {

    // register the component
    components: {
      Treeselect,
      'loader': Loader,
    },
    data() {

      return {
        value: null,
      }
    },

    computed: {
      valuesReportOptios() {
        return this.$store.getters.getValuesReport;
      },

      loading() {
        return this.$store.getters.getLoading;
      }
    },
    methods: {

      updateValue() {
        this.$store.dispatch('addParameters', this.value);
      }

    },
    created(){
      this.$store.dispatch('getTreeDataFromServer');
    },
    mounted(){
 
    }



  }
</script>

<style>
  .treesel {
    position: static !important;
  }

  .vue-treeselect__menu-container {
    position: static !important;
  }

  .vue-treeselect__menu {
    position: static !important;
  }
</style>