var app = getApp();

Page({
  data: {
    items: [],
    personItems: [],
    companyItems: [],
    selPerCards:[],
    selComCards:[],
    userType:'PERSONAL',
    first: true,
    flag: true
  },
  getEtcList(){
    let js1 = {
      userType:this.data.userType,
      ticketId:app.userInfo?app.userInfo.ticketId:'',
    }
    app.ajax(js1,'CARD_LIST',(data)=>{
      // let hasmore = true;
      // if(data.items.length<10)hasmore = false;
      if(this.data.userType == 'PERSONAL'){
        this.setData({
          items: data.items,
          personItems: data.items
        })
      }else{
        this.setData({
          items: data.items,
          companyItems: data.items
        })
      }
    })
  },
  onLoad(query) {
    this.setData({
      titleId: query.tit
    })
    this.getEtcList();
  },
  selChange(e) {
    console.log(e.detail.value)
    if(e.detail.value.length != 0){
      this.setData({
        flag: false
      })
    }
    this.setData({
      selPerCards: e.detail.value
    })
  },
  selCompChange(e) {
    // console.log(e.detail.value)
    if(e.detail.value.length != 0){
      this.setData({
        flag: false
      })
    }
    this.setData({
      selComCards: e.detail.value
    })
  },
  choosePer(){//选择个人卡
    if(this.data.userType == 'COMPANY'){
      this.setData({
        userType: 'PERSONAL',
        items: this.data.personItems,
      })
    }
  },
  chooseCom(){//选择单位卡
    if(this.data.userType == 'COMPANY')return;
    if(this.data.first){
      this.setData({
        selComCards: [],
        first: false,
        userType: 'COMPANY',
      })
      this.getEtcList();
    }else{
      this.setData({
        userType: 'COMPANY',
        items: this.data.companyItems,
      })
    }
  },
  bind(){
    var json1,
        sel = [],
        that = this,
        titleId = this.data.titleId;
    let selCards = this.data.userType == "PERSONAL"?this.data.selPerCards:this.data.selComCards;
    for(let i in selCards){
      sel.push({
        cardId: selCards[i]
      })
    }
    if(sel.length>0){
      if(!!titleId){//判断是否是否已有发票抬头
        json1 = {
          ticketId: app.userInfo.ticketId,
          titleId: titleId,
          infos: sel
        }
        app.ajax(json1,'TITLE_ADDCARD',function(data){
          app.needRefresh = true;
          app.invTitIndNeedRefresh = true;
          my.navigateBack();
        })

      }else{//正在添加发票抬头
        app.addTaitouEtcList = sel;
        // console.log(app.addTaitouEtcList)
        my.navigateBack();
      }
    }else{
      my.alert({
        content: '请选择要关联的ETC卡'
      });
    }
  },
  onReachBottom(){
    // if(this.data.hasMore){
    //   this.getEtcList();
    // }
    console.log("到底啦");
  }
});