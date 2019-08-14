var p2son = `
<div>
<input v-model='detail.name'/>
<input v-model='name'/>
<button v-on:click="detail.name">detail.name:   {{detail.name}}   msg: {{msg}}   count: {{ count }}</button>
<input v-model='change.name'/>
<input v-model='change.id'/>
</div>`

Vue.component("p2son", {
    props: ["msg", "detail", 'name'],
    data: function() {
      return {
        count: 0,
        change: this.detail
      };
    },
    template: p2son,
    mounted() {
      this.change.name = '111'
    }   
  });