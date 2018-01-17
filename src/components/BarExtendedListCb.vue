<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>{{ labels[0] }}</th>
      <th>{{ labels[1] }}</th>
      <th colspan="2">{{ labels[2] }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(element, index) in list">
      <th scope="row">{{ index+1 }}</th>
      <td class="first"><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#exampleModal' v-on:click="cbButton(element[keyLabel])">{{element[keyLabel]}}</button></td>
      <td class="middle"><var>{{ element[keyValue1] ? (valueF1 ? valueF1(element[keyValue1]) : element[keyValue1]) : '' }}</var></td>
      <td class="middle toRight"><strong>{{ element[keyValue2] ? (valueF2 ? valueF2(element[keyValue2]) : element[keyValue2]) : '' }}</strong></td>
      <td class="middle bar">
        <div class="progress">
          <div class="progress-bar" role="progressbar" :style="'width: ' + (element[keyValue2]*100/maxValue) + '%;'" :aria-valuenow="element[keyValue2]*100/maxValue" aria-valuemin="0" :aria-valuemax="maxValue"></div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'BarExtendedListCb',
    props: ['list', 'labels', 'keyLabel', 'keyValue1', 'keyValue2', 'valueF1', 'valueF2', 'cbButton'],
    computed: {
      maxValue() {
        return this.list[0][this.keyValue2]
      }
    },
  }
</script>

<style>
.progress-bar {
  background-color: red !important;
}

td.first {
  width: 30%;
}

td.middle {
  vertical-align: middle;
}

td.toRight {
  text-align: right;
}

.bar {
  width: 30%;
}
</style>
