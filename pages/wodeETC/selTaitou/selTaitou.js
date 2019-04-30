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
    console.log('----------',query)
    if(query.etc){
      this.setData({
        etc:true
      })
    }
    this.setData({
      cardid: query.cardid,
      needRedirect: query.needRedirect
    })
    this.getTitList();
  },
  onShow(){
    if(app.invTitIndNeedRefresh){
      app.invTitIndNeedRefresh = false;
      this.getTitList();
    }
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
    // console.log('你选择的框架是：', e.detail.value)
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
    let json1 = {
      ticketId: app.userInfo.ticketId,
      titleId: this.data.selection.titleId,
      infos:[{
        cardId: this.data.cardid
      }]
    }
    let that = this;
    app.ajax(json1,'TITLE_ADDCARD',(data) => {
      that.setData({
        showMyConf: false
      })
      console.log('---',data)
      my.alert({
        title: '关联成功',
        content: '',
        buttonText: '确定',
        success: () => {
          app.needRefresh = true;
          app.myEtcNeedRefresh = true;
          if(!this.data.etc){
            if(that.data.needRedirect && that.data.needRedirect == 'yes'){
              let str = "?cardId=" + that.data.cardid+"&titleId="+that.data.selection.titleId+"&titleName="+that.data.selection.name+"&type="+that.data.cardType;
              my.redirectTo({
                url:"/pages/wodeETC/myetc/myetc"
              });
            }else{
              my.navigateBack();
            }
          }else{
            let str = "?cardid=" + that.data.cardid;
              my.redirectTo({
                url:"/pages/wodeETC/etcDetail/etcDetail" + str
            }); 
          }
        },
      });
    })
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
    // my.navigateTo({
    //   url:'/pages/invoiceTit/addTaitou/addTaitou?etcFlag=1'
    // });
  }
});
