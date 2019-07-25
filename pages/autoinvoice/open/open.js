const app = getApp();
Page({
  data:{
    email: "develop@dev.com",
    transEmail: false,
    card: {}
  },
  onLoad(){
    let cardDetail = my.getStorageSync({key:'cardDetail'}).data;
    console.log(cardDetail)
    this.setData({
      card: cardDetail,
    })
  },
  transEmail(){
    let that = this;
    if(this.data.transEmail){
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
    card.mail = e.detail.value;
    this.setData({
      card: card
    })
  },
  sureOpen(){
    let that = this;
    if(!app.buttonClick())return;
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
            my.navigateTo({
              url:`/pages/autoinvoice/openSuc/openSuc?cardId=${that.data.card.cardId}&plateNum=${that.data.card.plateNum}`
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