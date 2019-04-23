const app = getApp();
Page({
  data: {
    //props  cardId
    showMyConf: false,
    items: [/*{
      titleId: '', //发票抬头唯一标识
      titleType: '',//发票抬头类型
      name:'name1',  //单位名称or姓名
      taxNum:'1111111',//纳税人识别号
      address: '发东莞市地方公司',//单位地址
      tel: '123456498789',//单位电话
      bank: '',//开户行名称
      bankAccount: '',//开户行帐号
      hasBind: true//是否和当前卡绑定
    },{
      titleId: '', //发票抬头唯一标识
      titleType: '',//
      name:'name2',
      taxNum:'2222222',
      address: '',
      tel: '',
      bank: '',
      bankAccount: '',
      hasBind: ''
    }*/],
    select: null,
    selection: {},
    cardType:''
  },
  onLoad(query) {
    if(query.type){
      this.setData({
        cardType:query.type
      })
    }
    this.setData({
      cardid: query.cardid,
      needRedirect: query.needRedirect
    })
    this.getTitList();
  },
  onShow(){
    if(app.invTitIndNeedRefresh){
      app.invTitIndNeedRefresh = false;
      this.getTitList();
    }
  },
  getTitList(){
    let json1 = {
      cardId: this.data.cardid,
      ticketId: app.userInfo?app.userInfo.ticketId:''
    };
    let that = this;
    app.ajax(json1,'CARD_TITLELIST',function(data){
      that.setData({
        items: data.items
      })
    })
  },
  radioChange: function(e) {
    // console.log('你选择的框架是：', e.detail.value)
    this.setData({
      select: e.detail.value
    })
  },
  btnSure(){
    if(this.data.select != null){
      this.setData({
        selection: this.data.items[this.data.select],
        showMyConf: true
      })
      

    }
  },
  sureHandle(){
    let json1 = {
      ticketId: app.userInfo.ticketId,
      titleId: this.data.selection.titleId,
      infos:[{
        cardId: this.data.cardid
      }]
    }
    let that = this;
    app.ajax(json1,'TITLE_ADDCARD',function(data){
      that.setData({
        showMyConf: false
      })
      console.log('---',data)
      my.alert({
        title: '关联成功',
        content: '',
        buttonText: '确定',
        success: () => {
          app.needRefresh = true;
          app.myEtcNeedRefresh = true;
          if(that.data.needRedirect && that.data.needRedirect == 'yes'){
            let str = "?cardId=" + that.data.cardid+"&titleId="+that.data.selection.titleId+"&titleName="+that.data.selection.name+"&type="+that.data.cardType;
            my.redirectTo({
              url:"/pages/iWangTo/recordList/recordList" + str
            });
          }else{
            my.navigateBack();
          }
        },
      });
    })
  },
  cancelHandle(){
    this.setData({
      showMyConf: false
    })
  },
  addTaitou(){
    let data = {
      currentTarget:{
        dataset:{
          url:'/pages/invoiceTit/addTaitou/addTaitou?etcFlag=1',
          openType: 'redirectTo'
        }
      }
    }
    app.handleForward(data)
    // my.navigateTo({
    //   url:'/pages/invoiceTit/addTaitou/addTaitou?etcFlag=1'
    // });
  }
});
