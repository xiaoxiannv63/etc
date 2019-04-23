const app = getApp();
Page({
  data: {
    title: "绑定个人",
    // cards: [],
    cards: [{
         cardId: 'asdff',
        issuerName: 'asdff',
        cardType: 'asdff',
        titleName: 'asdff',
        plateNum: 'asdff'
    }]
  },
  onLoad(query) {
    console.log('onload')
    let cards = []
    let carIds = JSON.parse(query.cardIds)
    let i = 0;
    this.getCardList(i,carIds)
    this.setData({
      cards:cards
    })
  },
  getCardList(i,carIds){
      let json1 = {
        cardId: carIds[i].cardId,
        ticketId: app.userInfo.ticketId
      }
      app.ajax(json1,"CARD_DETAIL",(data)=>{
        let carditem = {
          cardId: data.cardId,
          issuerName: data.issuerName,
          cardType: data.cardType,
          titleName: data.titleName,
          plateNum: data.plateNum
        }
        this.data.cards.push(carditem)
        if(carIds.length-1 == i){
          this.setData({
            cards: this.data.cards
          })
        }else{
          this.getCardList(i,carIds)
        }
        i++;
      })
  },
  onShow() {
    // this.setData({
    //   cards: this.data.cards
    // })
  },
  onETC() {
    my.confirm({
      title: '温馨提示',
      content: 'ETC卡没关联抬头，不能开出发票。',
      confirmButtonText: '关联抬头',
      cancelButtonText: '查看ETC卡',
      success: (result) => {
        if(result.confirm){
          console.log("跳转到关联抬头页面")
        }
        else{
          console.log("跳转到ETC卡列表")
        }
      },
    });
  },
  onRise() {
     my.alert({
            title: '跳转到关联抬头页面'
          });
  },
  tapUrl(e) {
    app.handleForward(e)
  },
  toAddTitile(){
    let url = "/pages/wodeETC/myetc/myetc"
    if(this.data.cards.length>1){
      url = "/pages/wodeETC/myetc/myetc"
    }else{
      url = "/pages/wodeETC/selTaitou/selTaitou?cardid="+this.data.cards[0].cardId+"&needRedirect=yes&type="+this.data.cards[0].cardType
    }
    let data = {
      currentTarget:{
        dataset:{
          url: url,
          openType: 'redirectTo'
        }
      }
    }
    app.handleForward(data)
  },
  toMyEtc(e){
    app.handleForward(e)
  }
});
