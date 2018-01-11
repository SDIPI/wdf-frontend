<template>
  <div class="form-group">
    <label for="interests">Interest fields</label>
    <input type="text" class="form-control" id="interests" placeholder="Enter interest fields">
  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";

  let eventHandler = function(name) {
    return function() {
      console.log("HEH");
      ProfileStore.data.settingsForm.interests = arguments[0].split(',');
    };
  };

  export default {
    name: 'InterestFields',
    components: {
    },
    data() {
      return {
        ProfileStore: ProfileStore.data
      };
    },
    methods: {},
    mounted() {
      let sel = $('#interests').selectize({
        persist: false,
        createOnBlur: false,
        create: false,
        maxItems: 10,
        valueField: 'id',
        labelField: 'label',
        searchField: ['id', 'name', 'label'],
        options: ProfileStore.data.interestsList,
        onChange: eventHandler('change'),
        render: {
          option: function(item, escape) {
            let cat = item['name'].split(' / ');
            let final;
            if (cat.length > 1) {
              final = cat.slice(0, cat.length - 1).join(' / ');
            } else {
              final = cat[0];
            }
            return '<div>' +
              '<span class="label">' + escape(final) + ' / </span>' +
              (item.label ? '<span class="caption">' + escape(item.label) + '</span>' : '') +
              '</div>';
          }
        },
      });
      if (ProfileStore.data.settingsForm.interests) {
        let control = sel[0].selectize;
        let value = ProfileStore.data.settingsForm.interests;
        control.setValue(value);
      }
    },
    beforeDestroy() {
      ProfileStore.data.settingsForm.interests = ProfileStore.data.settingsForm.interests.map(el => {return parseInt(el)});
    }
  }

</script>

<style>
  .selectize-control {
    padding: 0 !important;
    border: 0;
  }

  .label {
    color: #bbbbbb;
  }
</style>
