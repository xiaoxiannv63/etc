
const app = getApp();
Page({
  data: {
    applyId:'',
    titleId:'',
    itemContent:{},
    items:[],
    downFlag:false,
    showModal:false,
    canTap: true
  },
  onLoad(query) {
    console.log('---换票---',query)
    this.setData({
      applyId: query.applyId,
      cardId: query.cardId,
      plateNum: query.plateNum
    })
    this.getCardId()
  },
  onShow(){
    this.getTitList()
  },
  openHandle(){
    this.setData({
      openFlag : !this.data.openFlag
    })
  },
  getCardId(){// 拿到基本信息
    let json1 = {
      applyId: this.data.applyId,
      ticketId:app.userInfo.ticketId
    }
    my.showLoading({
      content: '加载中...',
    });
    app.ajax(json1,'INVOICE_APPLYDETAIL',(data)=>{
      data.applyTime = app.format(data.applyTime);
      this.setData({
        itemContent: data
      })
    })
  },
  getTitList(){//拿到抬头信息
    let json1 = {
      ticketId: app.userInfo.ticketId
    }
    let that = this;
    app.ajax(json1,'TITLE_SEARCH',function(data){
      let noData = data.items.length == 0?1:0;
      that.setData({
        items: data.items,
        noData: noData
      })
    })
  },
  changeTicket(e) {//点击换票
    if(this.data.canTap){
      this.data.canTap = false;
      setTimeout(()=>{
        this.data.canTap = true;
      },500)
      console.log(this.data.titleId)
      if(!this.data.titleId){return;}
        my.confirm({
          title: '温馨提示',
          content: `您正在申请发票更换，请您认真核对需要的发票，申请提交后，系统将三个工作日内处理您的申请，原有发票将无法继续使用，该发票申请对应的交易记录恢复为待开票状态。`,
          align: 'left',
          confirmButtonText: '确认换票',
          cancelButtonText: '取消',
          success: (result) => {
            if(result.confirm){
              this.setData({
                showModal:true
              })
            }
          },
        });
    }
  },
  cancelHandle() {
    this.setData({
      showModal: false
    })
  },
  sureHandle() {
    this.setData({
      showModal: false
    })
    let json1 = {
      applyId: this.data.applyId,
      titleId: this.data.titleId,
      cardId: this.data.cardId,
      ticketId:app.userInfo.ticketId
    }
    console.log(this.data.titleId)
    app.ajax(json1,'INVOICE_CHANGETITLE',(data)=>{
      let var1 = {
        currentTarget: {
          dataset: {
            url: `/pages/myInvoice/serInvList/serInvList?cardId=${this.data.cardId}&plateNum=${this.data.plateNum}`,
            openType: "navigateTo"
          }
        }
      }
      app.handleForward(var1)
    })
  },
  addTaitou(e){//添加抬头
    let var1 = {
      currentTarget: {
        dataset: {
          url: '/pages/invoiceTit/addTaitou/addTaitou?type=true',
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)   
  },
  looktit(e){
    this.data.items[e.target.dataset.index].flag = !this.data.items[e.target.dataset.index].flag
    this.setData({
      items:this.data.items
    })
  },
  radioChange(e){//单选按钮
    let a = this.data.items.filter((item,index)=>{
      return item.titleId == e.detail.value
    })
    console.log(a[0])
    this.setData({
      titleId:e.detail.value,
      selection: a[0]
    })
  }
});
