<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>{{ labels[0] }}</th>
      <th colspan="2">{{ labels[1] }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(element, index) in list">
      <th scope="row">{{ index+1 }}</th>
      <td>{{ element[keyLabel] }}</td>
      <td class="middle"><strong>{{ valueF ? valueF(element[keyValue]) : element[keyValue] }}</strong></td>
      <td class="middle bar">
        <div class="progress">
          <div class="progress-bar" role="progressbar" :style="'width: ' + (element[keyValue]*100/maxValue) + '%;'" :aria-valuenow="element[keyValue]*100/maxValue" aria-valuemin="0" :aria-valuemax="maxValue"></div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'BarList',
    props: ['list', 'labels', 'keyLabel', 'keyValue', 'valueF'],
    computed: {
      maxValue() {
        return this.list[0][this.keyValue]
      }
    }
  }
</script>

<style>
.progress-bar {
  background-color: red !important;
}

td.middle {
  vertical-align: middle;
  text-align: right;
}

.bar {
  width: 100%;
}
</style>
