const app = getApp();
const cardtypes = {
  'PERSONAL': '个人卡',
  'COMPANY': '单位卡',
}
Page({
  data:{
    email: "develop@dev.com",
    transEmail: false,
    card: {},
    hasBindEmail: false
  },
  onLoad(options){
    
    let cardDetail = my.getStorageSync({key:'cardDetail'}).data;
    console.log(cardDetail)
    this.setData({
      card: cardDetail,
      userType: cardtypes[options.userType]?cardtypes[options.userType]:options.userType,
      hasBindEmail: cardDetail.mail?true:false
    })
  },
  transEmail(){
    let that = this;

    if(this.data.transEmail){
      let rge = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
      if(!rge.test(this.data.card.mail)){
        my.alert({
          title:'请检查邮箱是否正确'
        })
        return
      }
       let json1 = {
            cardId: that.data.card.cardId,
            ticketId:app.userInfo.ticketId,
            mail: that.data.card.mail
          }
          app.ajax(json1,'AUTO_EMAIL',(data)=>{
            my.alert({
              title: data.msg
            })
          })
          that.setData({
            transEmail: false
          })
    }else{
      this.setData({
        transEmail: true
      })
    }
  },
  bindEmail(e){
    let card = this.data.card;
    card.mail = e.detail.value.replace(/\s+/g,'');
    this.setData({
      card: card
    })
  },
  sureOpen(){
    let that = this;
    if(!app.buttonClick())return;
    let rge = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
    if(!rge.test(this.data.card.mail)){
      my.alert({
        title:'请检查邮箱是否正确'
      })
      return
    }
    my.confirm({
      title: '温馨提示',
      content: '自动开票功能或造成您的开票量增加，请您确认是否要开通此功能。',
      confirmButtonText: '确认开通',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          let json1 = {
            cardId: that.data.card.cardId,
            ticketId:app.userInfo.ticketId,
            mail: that.data.card.mail
          }
          app.ajax(json1,'AUTO_OPEN',(data)=>{
            let str = "?cardId=" + that.data.card.cardId+"&titleId="+that.data.card.titleId+"&titleName="+that.data.card.titleName+"&type="+that.data.card.cardType+"&plateNum="+that.data.card.plateNum;
            my.navigateTo({
              url:`/pages/autoinvoice/openSuc/openSuc${str}`
            });
          })
        }
      },
    });
  },
  stop(){
    if(!app.buttonClick())return;
    let that = this;
    my.confirm({
      title:'温馨提示',
      content: '是否确认关闭自动开票？',
      success: (res) => {
        if(res.confirm){
          let json1 = {
            cardId: that.data.card.cardId,
            ticketId:app.userInfo.ticketId
          }
          app.ajax(json1,'AUTO_OFF',(data)=>{
            my.alert({
              title: '自动开票功能已关闭',
                success: () => {
                  my.navigateTo({
                    url: '/pages/wodeETC/etcDetail/etcDetail?cardid='+that.data.card.cardId
                  })
                },
            });
          })
        }
      },
    });

  }
})