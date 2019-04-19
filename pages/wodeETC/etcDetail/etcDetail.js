const app = getApp();
Page({
  data: {
    card:{
      cardId:'',
      issuerName:'',
      cardType:'',
      plateNum:'',
      plateColor:'',
      enableTime:'',
      expireTime:'',
      issuedTime:'',
      status:'',
      amount:'',
      titleId:'',
      titleType:'',
      titleName:'',
      taxNum:'',
      address:'',
      tel:'',
      bank:'',
      bankAccount:'',
      titleBindingTime:'',
      bindingTime:''
    }
  },
  onLoad(query) {
    // console.log(query)
    this.setData({
      cardid: query.cardid
    })
    this.getDet()
  },
  onShow(){
    if(app.needRefresh){
      this.getDet()
    }
  },
  getDet(){
    let json1 = {
      cardId: this.data.cardid,
      ticketId: app.userInfo.ticketId
    }
    let that = this;
    app.ajax(json1,'CARD_DETAIL',function(data){
      data.bindingTime = app.format(data.bindingTime);
      that.setData({
        card: data
      })
    })
  },
  toGuanLian(){//去关联抬头
    console.log("去关联抬头");
  },
  unbind(){//解绑卡片
    let that = this;
    my.confirm({
      title: '温馨提示',
      content: '解绑后，您将无法对这张ETC卡开具通行费发票，如需开票，需重新绑定，是否确认解绑？',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          let json1 = {
            cardId: that.data.card.cardId,
            ticketId: app.userInfo.ticketId
          }
          app.ajax(json1,'CARD_UNBIND',function(){
            app.needRefresh = true
            app.myEtcNeedRefresh = true;
            my.navigateBack();
          })
        }
      },
    });
  },
  bindTaitou(){//去关联抬头
    my.navigateTo({
      url: '/pages/wodeETC/selTaitou/selTaitou?cardid='+this.data.card.cardId
    });
  }
});
