<template>
  <div class="table-wrapper" id="table-wrapper">
    <Vue3EasyDataTable
      :headers="headers"
      :items="items"
      :rows-per-page="10"
      header-item-class-name="table-header"
    >
      <!--  -->
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
      <!--  -->
    </Vue3EasyDataTable>
  </div>
</template>

<script>
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

export default {
  components: { Vue3EasyDataTable },
  props: {
    headers: {
      type: Array,
      requered: true,
    },
    items: {
      type: Array,
      requered: true,
    },
  },
};
</script>

<style lang="scss">
#table-wrapper {
  .table-header {
    background: #333;
    color: #fff;
    padding: 10px 0;

    .header {
      justify-content: center;
      font-size: 15px;
    }
  }

  .vue3-easy-data-table__header th.sortable .sortType-icon {
    border-bottom-color: #fff;
  }
}
</style>
