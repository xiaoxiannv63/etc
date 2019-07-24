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
      bindingTime:'',
      modalOpened: false,
      autoInvoice: false,
      mail: ''
    },
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
  onModalClick() {
    let str = "?cardId=" + this.data.card.cardId+"&titleId="+this.data.card.titleId+"&titleName="+this.data.card.titleName+"&type="+this.data.card.cardType+"&plateNum="+this.data.card.plateNum;
    let var1 = {
      currentTarget: {
        dataset: {
          url: '/pages/iWangTo/recordList/recordList' + str,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
    this.setData({
      modalOpened: false,
    });
  },
  onModalClose() {
    this.setData({
      modalOpened: false,
    });
  },
  getDet(){
    let json1 = {
      cardId: this.data.cardid,
      ticketId: app.userInfo.ticketId
    }
    let that = this;
    app.ajax(json1,'CARD_DETAIL',function(data){
      my.setStorageSync({
        key: 'cardDetail', // 缓存数据的key
        data: data, // 要缓存的数据
      });
      data.bindingTime = app.format(data.bindingTime);
      that.setData({
        card: data
      })
    })
  },
  goInvoice(){
    let cardid = this.data.cardid;
    if(!this.data.card.titleId){
      my.confirm({
        title: '提示',
        content: '此ETC卡未关联发票抬头，不能进行开票；立即前往关联？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: (result) => {
          
          // console.log(result)
          if(result.confirm){
            let str = "?cardid="+cardid +'&needRedirect=yes'+'&etc=true';
            my.navigateTo({
              url:"/pages/wodeETC/selTaitou/selTaitou" + str
            });
          }
        },
      });
      return;
    }else{
      this.setData({
        modalOpened: true
      })
    }
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
            my.switchTab({
              url: '/pages/index/index'
            });
          })
        }
      },
    });
  },
  bindTaitou(){//去关联抬头
    let data = {
      currentTarget: {
        dataset:{
          url: '/pages/wodeETC/selTaitou/selTaitou?cardid='+this.data.card.cardId,
          openType: 'navigateTo'
        }
      }
    }
    app.handleForward(data)
  },
  goOpen(){
    if(!app.buttonClick())return;
    if(this.data.card.titleId){
      my.navigateTo({
        url: "/pages/autoinvoice/open/open"
      })
    }else{
      my.alert({
        content: "请先关联抬头"
      })
    }
  },
  goStop(){
    my.navigateTo({
      url: "/pages/autoinvoice/open/open"
    })
  }
});
