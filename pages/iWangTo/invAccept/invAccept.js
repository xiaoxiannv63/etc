const app = getApp();
Page({
  data: {
    trip:[],
    month:"",
    mail:'',
    titleId:'',
    tot:'',
    cardId:'',
    canNotKp: true
  },
  onLoad() {
    if(app.inv){
      this.setData({
        trip: app.inv.bindCardList,
        month: app.inv.month,
        titleId: app.inv.titleId,
        tot: app.inv.tot,
        cardId:app.inv.cardId,
        type:app.inv.type
      })
    }
  },
  mailInp(e){
    let isMail, mailReg=/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/g;
    isMail = mailReg.test(e.detail.value);
    this.setData({
      mail: e.detail.value,
      canNotKp: !isMail
    })
  },
  makeOut(){
    let json1 ={} ,that = this,tripInfo=[];
    for( let i in this.data.trip){
      tripInfo.push({
        tradeId: this.data.trip[i]
      })
    }
    let type = this.data.type
    console.log(type)
    if(type=='xf'){
      json1={
      cardId: this.data.cardId,
      invoiceMail: this.data.mail,
      month: this.data.month,
      titleId: this.data.titleId,
      ticketId: app.userInfo.ticketId,
      infos: tripInfo
    }
      my.showLoading({
      content:'加载中...',
      });
      app.ajax(json1,'INVOICE_TRANSAPPLY',function(data){
        my.hideLoading();
        app.recordListRefresh = true;
        app.inv = null;
        my.redirectTo({
          url: '/pages/iWangTo/kpSuccess/kpSuccess', 
        });
      })
    }else if(type == 'cz'){
       json1={
        cardId: this.data.cardId,
        invoiceMail: this.data.mail,
        titleId: this.data.titleId,
        ticketId: app.userInfo.ticketId,
        infos: tripInfo
    }
      my.showLoading({
      content:'加载中...',
      });
      app.ajax(json1,'INVOICE_RECHARGEAPPLY',function(data){
        my.hideLoading();
        app.recordListRefresh = true;
        app.inv = null;
        my.redirectTo({
          url: '/pages/iWangTo/kpSuccess/kpSuccess', 
        });
      })
    }
    
  
  }
});
