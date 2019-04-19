Component({
  mixins:[{ didMount() {}, }],
  data: {y:2},
  props:{
    steps:[],
    curentStep: 0
  },
  didMount() {
    // console.log(this.props)
  },
  didUpdate(prevProps,prevData){},
  didUnmount(){},
  methods:{
    onMyClick(ev){
      my.alert({});
      this.props.onXX({ ...ev, e2:1});
    },
  },
})