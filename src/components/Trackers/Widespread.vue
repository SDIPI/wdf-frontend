<template>
  <div>
    <h2 class="mb-0">Most revealing domains</h2>
    <BarExtendedListCb
      :list="ProfileStore.trackersPage.mostSending"
      :labels="['Domain', 'Data', 'Requests']"
      :keyLabel="'from'"
      :keyValue1="'size'"
      :keyValue2="'amount'"
      :valueF1="(function(e) {return Math.floor(e/8/1024) + ' kB';})"
      :cbButton="(function(e) {
        ProfileStore.trackersForm.modalList = [];
        ProfileStore.trackersForm.selectedDomain = e;
        for (let to in ProfileStore.trackers[e]) {
          let tracker = ProfileStore.trackers[e][to];
          ProfileStore.trackersForm.modalList.push({label: to, amount: tracker.amount, size: tracker.size});
        }
        ProfileStore.trackersForm.modalList.sort((a, b) => {
          return (b['amount'] - a['amount'])
        }).slice(0, 100);
      })"
    ></BarExtendedListCb>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Requests sent from <strong>{{ProfileStore.trackersForm.selectedDomain}}</strong></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <BarExtendedList
              :list="ProfileStore.trackersForm.modalList"
              :labels="['Domain', 'Data', 'Requests']"
              :keyLabel="'label'"
              :keyValue1="'size'"
              :keyValue2="'amount'"
              :valueF1="(function(e) {return Math.floor(e/8/1024) + ' kB';})"
              :cbButton="(function(e) {ProfileStore.trackersForm.selectedDomain = e;})"
            ></BarExtendedList>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";
  import BarList from "../BarList.vue";
  import BarExtendedListCb from "../BarExtendedListCb.vue";
  import BarExtendedList from "../BarExtendedList.vue";
  import TableList from "../TableList.vue";

  export default {
    name: 'Widespread',
    components: {
      TableList,
      BarList,
      BarExtendedListCb,
      BarExtendedList
    },
    data() {
      return {
        ProfileStore: ProfileStore.data
      };
    },
    methods: {

    }
  }
</script>

<style>
.modal-dialog {
  max-width: 1140px;
}
</style>
