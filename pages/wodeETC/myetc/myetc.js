const app = getApp();
Page({
  data: {
    serverType:'CARD_LIST',
    userType: 'PERSONAL',
    items: [],
    personItems: [],
    companyItems: [],
    first: true,
    noData: 0
  },
  onUnload(){
    console.log(123)
    app.myEtcRefreshUserType = ''
  },
  onLoad() {
    //刷新时判断显示单位卡还是个人卡
    app.myEtcRefreshUserType = 'PERSONAL'
    this.getList();
  },
  onShow(){
    if(app.myEtcNeedRefresh){
      app.myEtcNeedRefresh = false;
      this.setData({
        first:true,
        userType: app.myEtcRefreshUserType,
      })
      this.getList();
    }
  },
  tuomin(str){
    return str.substring(0,6)+"---------"+str.substr(-4)
  },
  getList(){
    my.showLoading({
      content:'loading...'
    });
    let js1 = {
      userType:this.data.userType,
      ticketId:app.userInfo?app.userInfo.ticketId:''
    }
    app.ajax(js1,'CARD_LIST',(data)=>{
      my.hideLoading();
      let noData = data.items.length == 0?1:0;

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
  choosePer(){
    let noData = this.data.personItems.length == 0?1:0;
    this.setData({
      userType: 'PERSONAL',
      items: this.data.personItems,
      noData: noData
    })
    //刷新时判断显示单位卡还是个人卡
    app.myEtcRefreshUserType = 'PERSONAL'
  },
  chooseCom(){
    let noData = this.data.companyItems.length == 0?1:0;
    if(this.data.first){
      this.setData({
        first:false,
        userType: 'COMPANY',
        noData: noData
      })
      this.getList()
    }else{
      this.setData({
        userType: 'COMPANY',
        items: this.data.companyItems,
        noData: noData
      })
    }
    //刷新时判断显示单位卡还是个人卡
    app.myEtcRefreshUserType = 'COMPANY'
  },
  toDet(e){//进入详情
    // let cardid = e.currentTarget.dataset.card;
    // console.log(cardid)
    // my.navigateTo({
    //   url: '/pages/wodeETC/etcDetail/etcDetail?cardid='+cardid
    // }
    app.handleForward(e)
  },
  toAddEtc(e){//添加卡片
    // let str = this.data.userType == 'PERSONAL'?'?type=PERSONAL':'?type=COMPANY';
    // my.navigateTo({
    //   url: '/pages/wodeETC/addEtcCard/addEtcCard'+str
    // })
    app.handleForward(e)
  }
});
