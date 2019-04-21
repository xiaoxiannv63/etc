const app = getApp();
Page({
  data: {
    background: ['green', 'red', 'yellow'],
    authCode: "",
    CardItem: [
      { id: "1", province: "蒙通卡", type: "企业", plate: "蒙BHN106", cardNumber: "1034516******3421", rise: "北京特微智能有限公司" },
      { id: "2", province: "蒙通卡", type: "个人/非企业", plate: "蒙BHN106", cardNumber: "1034516******3421", rise: "" }
    ],
    itemsList: [
      { name: "发票开具成功", content: "5.00", content: "发票金额" }
    ],
    etcList_PERSONAL:[],
    etcList_COMPANY:[],
    news:[],
    noData:1,
    list3: [
      {
        icon: '../../assets/images/indexCion1.png',
        text: '我要开票'
      },
      {
        icon: '../../assets/images/indexCion2.png',
        text: '我的发票'
      },
      {
        icon: '../../assets/images/indexCion3.png',
        text: '常见问题'
      },
      {
        icon: '../../assets/images/indexCion4.png',
        text: '抬头管理'
      }
    ],
  },
  onLoad(query) {
    // 页面加载
    this.etcList();
    this.getInfo();
    // this.getPermision();
  },
  etcList(){ //全部获取ETC
    my.showLoading({
      content:'loading...'
    });
    this.getCardUrl('PERSONAL')
    this.getCardUrl('COMPANY')
  },
  //原来
  // getInfo(){
    //   let js = {
    //     ticketId:app.userInfo.ticketId,
    //     pageIndex:1,
    //     pageSize:1
    //   }
    //   app.ajax(js,'USER_MYNOTIFY',(data)=>{
    //     if(data.success){
    //       this.setData({
    //         news:data.items
    //       })
    //     }
    //     console.log(data,'最新开票')
    //   })
  // },
  //陈康珍
  getInfo() {
    let js = {
      ticketId: app.userInfo.ticketId,
      notifyType:'INVOICE_ISSUED',
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
  //原来
  // getCardUrl(type){
    //   let js1 = {
    //     userType:type,
    //     ticketId:app.userInfo?app.userInfo.ticketId:''
    //   }
    //   app.ajax(js1,'CARD_LIST',(data)=>{
        
    //     my.hideLoading();
    //     if(data.items.length>0){
    //       data.items.forEach(item=>{
    //         console.log(item,'item')
    //          if(item.cards.length>0){
    //           let arr= item.cards.map(res=>{
    //              let obj ={}
    //              obj = {...res}
    //              obj.cardIdMap = res.cardId.substring(0,6)+"**********"+res.cardId.substr(-4)
    //              obj.issuerName = item.issuerName
    //              return obj
    //            })
    //            if(type=="PERSONAL"){
    //              this.setData({
    //               etcList_PERSONAL:arr
    //            })
    //            }
    //            else if(type=="COMPANY"){
    //              this.setData({
    //               etcList_COMPANY:arr
    //            })
    //            }
              
    //            console.log(arr,type)
    //          } 
    //       })        
    //     }
    //   })
  // },
  //陈康珍
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
  // getCard(ev) {
    //   let target = ev.target.dataset
    //   // let id = target.id
    //   let rise = target.rise
    //   if (rise) {
    //     my.navigateTo({
    //       url: "../../pages/user/user"
    //     });
    //   }
    //   else {
    //     my.confirm({
    //     title: '温馨提示',
    //     content: 'ETC卡没关联抬头，不能开出发票。',
    //     confirmButtonText: '关联抬头',
    //     cancelButtonText: '查看ETC卡',
    //     success: (result) => {
    //       if(result.confirm){
    //         console.log("跳转到关联抬头页面")
    //       }
    //       else{
    //         console.log("跳转到ETC卡列表")
    //       }
    //     },
    //   });
    //   }
  // }
  onShow(){
    if(app.needRefresh){
      app.needRefresh = false
      this.etcList();
      this.getInfo();
    }
  },
  getCard(ev) {
    let cardid = ev.currentTarget.dataset.id;
    console.log(cardid)
    my.navigateTo({
      url: '/pages/wodeETC/etcDetail/etcDetail?cardid='+cardid
    })
  }
});
