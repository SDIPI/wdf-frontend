<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>{{ labels[0] }}</th>
      <th>Visible</th>
      <th>{{ labels[1] }}</th>
      <th>{{ labels[3] }}</th>
      <th colspan="2">{{ labels[2] }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(element, index) in list">
      <th scope="row">{{ index+1 }}</th>
      <td class="first">
        <button type='button' class='btn btn-primary' data-toggle='modal' data-target='#exampleModal'
                :disabled="activeList[element[keyLabel]] === false"
                :class="{clickable: activeList[element[keyLabel]] === true}"
                v-on:click="cbButton(element[keyLabel])">{{element[keyLabel]}}</button>
      </td>
      <td class="hint">
        <button
          v-on:click="clickHide(element[keyLabel])"
          v-if="activeList[element[keyLabel]] === true" type="button" class="btn btn-sm btn-outline-success smallButton"><i class="material-icons">visibility</i></button>
        <button
          v-on:click="clickShow(element[keyLabel])"
          v-if="activeList[element[keyLabel]] === false" type="button" class="btn btn-sm btn-outline-danger smallButton"><i class="material-icons">visibility_off</i></button>
      </td>
      <td class="middle"><var>{{ element[keyValue1] ? (valueF1 ? valueF1(element[keyValue1]) : element[keyValue1]) : '-' }}</var></td>
      <td class="middle"><strong>{{ element[keyValue3] ? element[keyValue3] : 0 }}</strong></td>
      <td class="middle toRight"><strong>{{ element[keyValue2] ? (valueF2 ? valueF2(element[keyValue2]) : element[keyValue2]) : 0 }}</strong></td>
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
  import ProfileStore from "../stores/ProfileStore";

  export default {
    name: 'BarExtendedListTrackers',
    props: ['list', 'labels', 'keyLabel', 'keyValue1', 'keyValue2', 'valueF1', 'valueF2', 'cbButton', 'activeList', 'fixedMax', 'keyValue3'],
    computed: {
      maxValue() {
        return this.fixedMax ? this.fixedMax : this.list[0][this.keyValue2];
      }
    },
    methods: {
      clickHide(e) {
        this.activeList[e] = false;
        ProfileStore.methods.computeTrackers();
        this.list.splice(); // To force re-rendering the list
        ProfileStore.methods.trackersForm.refreshNbHidden();
      },
      clickShow(e) {
        this.activeList[e] = true;
        ProfileStore.methods.computeTrackers();
        this.list.splice(); // To force re-rendering the list
        ProfileStore.methods.trackersForm.refreshNbHidden();
      }
    }
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

.clickable {
  cursor: pointer;
}

.smallButton {
  width: 41px;
  height: 33px;
}
</style>
