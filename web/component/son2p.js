var son2p = `
<div>
  <button v-on:click="send2pt">You    me {{ count }} times.</button>
</div>
`

Vue.component("son2p", {
    data: function() {
      return {
        count: 0,
        msg: '这是来自儿子元素的值'
      };
    },
    template: son2p,
    methods: {
      send2pt: function() {
        this.$emit("get_son", this.msg)
      }
    }
  });