<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>{{ labels[0] }}</th>
      <th>{{ labels[1] }}</th>
      <th colspan="2">Estimated interest</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(element, index) in list">
      <th scope="row">{{ index+1 }}</th>
      <td>{{ element[keyLabel] }}</td>
      <td class="middle">
        <select ref="topicSelect[index]" v-on:change="cbChanged($event, element)">
          <option value="-1"></option>
          <option v-for="el in ProfileStore.interestsList"
                  v-if="ProfileStore.settingsForm.interests.indexOf(el.id) > -1"
                  :value="el.id"
                  :selected="ProfileStore.currentTags[element.topicId] == el.id">{{el.label}}</option>
        </select>
      </td>
      <td>
        {{Math.round(element.amount / list[0].amount * 100)}}%
      </td>
      <td class="middle bar">
        <div class="progress">
          <div class="progress-bar" role="progressbar" :style="'width: ' + (element['amount']*100/maxValue) + '%;'" :aria-valuenow="element['amount']*100/maxValue" aria-valuemin="0" :aria-valuemax="maxValue"></div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'BarList',
    props: ['list', 'labels', 'keyLabel', 'keyValue', 'valueF', 'cbChanged'],
    data() {
      return {
        ProfileStore: ProfileStore.data
      };
    },
    computed: {
      maxValue() {
        return this.list[0]['amount']
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
