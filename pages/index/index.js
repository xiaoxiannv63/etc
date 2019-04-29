const app = getApp();
Page({
  data: {
    background: ['green', 'red', 'yellow'],
    authCode: "",
    CardItem: [
    ],
    itemsList: [],
    etcList_PERSONAL: [],
    etcList_COMPANY: [],
    news:[],
    noData: 1,
    modalOpened:false
  },
  onLoad(query) {
    // 页面加载
    this.etcList();
    this.getInfo();
  },
  onModalClick() {
    let var1 = {
      currentTarget: {
        dataset: {
          url: '/pages/iWangTo/cardList/cardList',
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
  etcList(){ //全部获取ETC
    my.showLoading({
      content:'loading...'
    });
    this.getCardUrl('PERSONAL')
    this.getCardUrl('COMPANY')
  },
  getInfo() {
    let js = {
      ticketId: app.userInfo.ticketId,
      notifyType: 'INVOICE_ISSUED',
      pageIndex: 1,
      pageSize: 1
      }
      app.ajax(js, 'USER_MYNOTIFY', (data) => {
        if (data.success) {
        this.setData({
        news: data.items
        })
      }
    console.log(data, '最新开票')
    })
  },
  getCardUrl(type) {
    let js1 = {
      userType: type,
      ticketId: app.userInfo ? app.userInfo.ticketId : ''
    }
    app.ajax(js1, 'CARD_LIST', (data) => {
      let arr = []
      my.hideLoading();
      if (data.items.length > 0) {
        data.items.forEach(item => {
        let name = item.issuerName
        arr = arr.concat(item.cards.map(res => {
            let obj = {}
            obj = { ...res }
            obj.cardIdMap = res.cardId.substring(0, 6) + "**********" + res.cardId.substr(-4)
            obj.issuerName = name
            return obj
          })
        )
        console.log(arr, 'arr.....')
        if (type == "PERSONAL") {
          this.setData({
            etcList_PERSONAL: arr,
            noData: 0
          })
        }
        else if (type == "COMPANY") {
          this.setData({
            etcList_COMPANY: arr,
            noData: 0
          })
        }
        })
        }else{
          if (type == "PERSONAL") {
            this.setData({
              etcList_PERSONAL: [],
            })
          }
          else if (type == "COMPANY") {
            this.setData({
              etcList_COMPANY: [],
            })
          }
        }
        if(this.data.etcList_COMPANY.length == 0 && this.data.etcList_PERSONAL.length == 0){
          this.setData({
            noData: 1
          })
        }
    })
  },
  toMyEtc() {//我的ETC
    if (app.authCode) {//判断是否授权
      my.navigateTo({
        url: '/pages/wodeETC/myetc/myetc'
      });
    } else {
      this.getPermision();
    }
  },
  toInvTit() {
    if (app.authCode) {//判断是否授权
      my.navigateTo({
        url: '/pages/invoiceTit/index/index'
      });
    } else {
      this.getPermision();
    }
  },
  toIWantKP() {
    if (app.authCode) {//判断是否授权
      // my.navigateTo({
      //   url:'/pages/invoice/invoice'
      // })
      my.navigateTo({
        url: '/pages/iWangTo/cardList/cardList'
      });
    } else {
      this.getPermision();
    }
  },
  toMyInv() {
    if (app.authCode) {//判断是否授权
      my.navigateTo({
        // url:'/pages/myInvoice/invoiceList/invoiceList'
        url: '/pages/invoice/invoice'
      });
    } else {
      this.getPermision();
    }
  },
  toKP() {//开票记录
    my.navigateTo({
      url: '/pages/invoice/invoice'
    });
  },
  toHelp() {//使用帮助
    my.navigateTo({
      url: '/pages/help/help'
    });
  },
  toUsusQues() {//常见问题
    this.getPermision();
  },
  toH5(e) {
    console.log(e)
    my.navigateTo({
      url: e.target.dataset.url
    })
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  moreETC(e) {
     my.navigateTo({
        url:e.target.dataset.url
      });
    // console.log("moreETC")
  },
  onItemClick(ev) {
    let index = ev.target.dataset.index
    console.log(index)
    if (index == "0") {
      my.navigateTo({
        url:"/pages/iWangTo/cardList/cardList"
      });
      // console.log("我要开票")
    }
    // else if (index == "1") {
    //   my.navigateTo({
    //     url:"/pages/invoiceTit/addTaitou/addTaitou"
    //   });
    //   // console.log("添加抬头")
    // }
    else if (index == "2") {
      my.navigateTo({
        url:"/pages/question/question"
      });
      // console.log("常见问题")
    }
    else if (index == "1") {
      my.navigateTo({
        url:"/pages/myInvoice/invoiceList/invoiceList"
      });
      // console.log("我的发票")
    }
    else if (index == "3") {
      my.navigateTo({
        url:"/pages/invoiceTit/index/index"
      });
      // console.log("抬头管理")
    }
    // else if (index == "5") {
    //   // console.log("联系客服")
    // }
  },
  tapUrl(e) {
    console.log(e)
    if(e.target.dataset.flag){
      this.setData({
        modalOpened: true,
      });
    }else{
      app.handleForward(e)
    }
  },
  onShow(){
    // console.log(app.needRefresh)
    // if(app.needRefresh){
      // app.needRefresh = false
      this.etcList();
      this.getInfo();
    // }
  },
  getCard(ev) {
    let cardid = ev.currentTarget.dataset.id;
    console.log(cardid)
    my.navigateTo({
      url: '/pages/wodeETC/etcDetail/etcDetail?cardid='+cardid
    })
  }
});
