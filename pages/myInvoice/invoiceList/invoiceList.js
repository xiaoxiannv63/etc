const app = getApp();
Page({
  data: {
    userType: 'PERSONAL',
    items: [],
    personItems: [],
    companyItems: [],
    first: true,
    noData: 0
  },
  onLoad() {
    this.getCardList();
  },
  onShow(){
    if(app.myEtcNeedRefresh){
      app.myEtcNeedRefresh = false;
      this.getCardList()
    }
  },
  //个人卡
  choosePer(){
    this.setData({
      noData:0
    })
    if(this.data.userType == 'PERSONAL') return;
    this.setData({
      userType: 'PERSONAL',
      items: this.data.personItems
    })
    let noData = this.data.items.length == 0 ? 1 : 0;
    this.setData({
      noData:noData
    })
  },
  //单位卡
  chooseCom(){
    if(this.data.userType == 'COMPANY')return;
    if(this.data.first){
      this.setData({
        first:false,
        userType: 'COMPANY',
      })
      this.getCardList()
    }else{
      this.setData({
        userType: 'COMPANY',
        items: this.data.companyItems
      })
      let noData = this.data.items.length == 0 ? 1 : 0;
      this.setData({
        noData:noData
      })
    }
  },
  getCardList(){
    let js1 = {
      userType:this.data.userType,
      ticketId:app.userInfo?app.userInfo.ticketId:''
    }
    my.showLoading({
      content:'加载中...'
    })
    app.ajax(js1,'CARD_LIST',(data)=>{
      my.hideLoading();
      let noData = data.items.length == 0 ? 1 : 0;
      if(this.data.userType == 'PERSONAL'){
        this.setData({
          personItems: data.items,
          items: data.items,
          noData: noData
        })
      }else{
        this.setData({
          companyItems: data.items,
          items: data.items,
          noData: noData
        })
      }
    })
  },
  toInvoice(e) {
    let str = "?cardId=" + e.currentTarget.dataset.card+"&plateNum="+e.currentTarget.dataset.plateNum;
    // console.log(str);
    my.navigateTo({
      url:"/pages/myInvoice/serInvList/serInvList" + str
    });
  },
  toAddEtc(){//添加卡片
    if(this.data.userType == 'PERSONAL'){
      my.navigateTo({
        url: '/pages/wodeETC/addEtcCard/addEtcCard?type=PERSONAL'
      })
    }else{
        my.navigateTo({
          url: '/pages/wodeETC/addEtcCard/addEtcCard'
        })
    }
  }
});
