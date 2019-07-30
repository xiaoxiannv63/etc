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
    if(app.myEtcNeedRefresh && app.recordListRefresh){
      // app.needRefresh = false;
      app.myEtcNeedRefresh = false;
      this.getCardList();
    }
  },
  choosePer(){
    if(this.data.userType == 'PERSONAL')return;
    this.setData({
      userType: 'PERSONAL',
      items: this.data.personItems,
      noData: this.data.personItems.length==0? 1 : 0
    })
  },
  chooseCom(){
    if(this.data.userType == 'COMPANY')return;
    if(this.data.first){
      this.setData({
        first:false,
        userType: 'COMPANY',
        noData: this.data.personItems.length==0? 1 : 0
      })
      this.getCardList()
    }else{
      this.setData({
        userType: 'COMPANY',
        items: this.data.companyItems,
        noData: this.data.companyItems.length==0? 1 : 0
      })
    }
  },
  getCardList(){
    let js1 = {
      userType:this.data.userType,
      ticketId:app.userInfo?app.userInfo.ticketId:''
    };
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
  tapUrl(e){
    app.handleForward(e)
  },
  // toAddEtc(e){//添加卡片
  //   my.navigateTo({
  //     url: `/pages/wodeETC/addEtcCard/addEtcCard?type=${e.target.dataset.type}`
  //   })
  // },
  toInvoice(e) {
    my.setStorageSync({
      key: 'userType', // 缓存数据的key
      data: this.data.userType, // 要缓存的数据
    });
    let cardid = e.currentTarget.dataset.card;
    if(!e.currentTarget.dataset.tit){
      my.confirm({
        title: '提示',
        content: '此ETC卡未关联发票抬头，不能进行开票；立即前往关联？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: (result) => {
          
          // console.log(result)
          if(result.confirm){
            let str = "?cardid="+cardid +'&needRedirect=yes';
            my.navigateTo({
              url:"/pages/wodeETC/selTaitou/selTaitou" + str
            });
          }
        },
      });
      return;
    }
    let str = "?cardId=" + cardid+"&titleId="+e.currentTarget.dataset.tit+"&titleName="+e.currentTarget.dataset.name+"&type="+e.currentTarget.dataset.type;
    // console.log(str);
    my.navigateTo({
      url:"/pages/iWangTo/recordList/recordList" +  "?cardId=" + cardid+"&titleId="+e.currentTarget.dataset.tit+"&titleName="+e.currentTarget.dataset.name+"&type="+e.currentTarget.dataset.type
    });
  },
  tapUrl(e){
    app.handleForward(e)
  }
});
