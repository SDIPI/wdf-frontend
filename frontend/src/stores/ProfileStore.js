const ProfileStore = {
  data: {
    test: [1,2,3]
  },
  methods: {
    addNumber(number) {
      ProfileStore.data.friends.push(number);
    }
  }
};

export default ProfileStore;
