var p2son = `<button v-on:click="count++">You   {{detail.name}}   clicked {{msg}}   me {{ count }} times.</button>`

Vue.component("p2son", {
    data: function() {
      return {
        count: 0
      };
    },
    template: p2son,
    props: ["msg", "detail"]
  });