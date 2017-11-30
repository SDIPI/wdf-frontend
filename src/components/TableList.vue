<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>{{ labels[0] }}</th>
      <th>{{ labels[1] }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(element, index) in list">
      <th scope="row">{{index+1}}</th>
      <td v-for="displayE in displayF(element)">{{ displayE }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'TableList',
    props: ['list', 'labels', 'displayF'],
    mounted() {
    }
  }
</script>

<style>

</style>
