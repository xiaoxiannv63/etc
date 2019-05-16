const app = getApp();
Page({
  data: {
    //props  cardId
    showMyConf: false,
    items: [],
    select: null,
    selection: {},
    etc:false
  },
  onLoad(query) {
    this.getTitList();
  },
  onShow(){
      this.getTitList();
  },
  getTitList(){
    let json1 = {
      cardId: this.data.cardid,
      ticketId: app.userInfo?app.userInfo.ticketId:''
    };
    let that = this;
    app.ajax(json1,'CARD_TITLELIST',function(data){
      that.setData({
        items: data.items
      })
    })
  },
  radioChange: function(e) {
    this.setData({
      select: e.detail.value
    })
  },
  btnSure(){
    if(this.data.select != null){
      this.setData({
        selection: this.data.items[this.data.select],
        showMyConf: true
      })
    }
  },
  sureHandle(){
    console.log(this.data.selection)
    let selection = JSON.stringify(this.data.selection)
    my.redirectTo({
      url:`/pages/mtc/confirmSuccess/confirmSuccess?flag=true&selection=${selection}`
    });
  },
  cancelHandle(){
    this.setData({
      showMyConf: false
    })
  },
  addTaitou(){
    let data = {
      currentTarget:{
        dataset:{
          url:'/pages/invoiceTit/addTaitou/addTaitou?etcFlag=1',
          openType: 'redirectTo'
        }
      }
    }
    app.handleForward(data)
  }
});
