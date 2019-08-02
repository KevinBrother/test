var comTest = `<button v-on:click="count++">You   {{detail.name}}   clicked {{msg}}   me {{ count }} times.</button>`

Vue.component("comtest", {
    data: function() {
      return {
        count: 0
      };
    },
    template:
    comTest,
    props: ["msg", "detail"]
  });