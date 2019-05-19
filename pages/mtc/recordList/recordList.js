const app = getApp();
Page({
  data: {
    tabs:['通行记录','开票记录'],
    tab:0,
    month:'',//查询月份
    nowMonth:'',//当月月份
    statusArr:['开票中','开票完成','审核中','审核完成'],
    status:'',
    pageTripIndex:1,
    pageInvoiceIndex:1,
    nomoreTrip:false,
    nomoreInvoice:false,
    tripArr:[],//行程记录
    invoiceArr:[],//开票纪录
  },
  onLoad(query) {
    if(query.tab){
      this.setData({
        tab:query.tab
      })
    }
    let date = new Date();
    let nowMonth = date.getFullYear()+"-"+num2(date.getMonth() + 1)
    this.setData({
      month: nowMonth,
      nowMonth: nowMonth
    })
    // 日期格式
    function num2(num){
      return ('0'+num).slice(-2)
    }

    this.data.tab ? this.getInvoiceRecord() : this.getTripRecord();
  },
  changeTab(e){
    this.setData({
      month:this.data.nowMonth,
      tab:e.target.dataset.index,
    })
    if(this.data.tab && this.data.invoiceArr.length == 0){
      this.getInvoiceRecord()
    }else if(!this.data.tab && this.data.tripArr.length == 0){
      this.getTripRecord();
    }
  },
  selDate(){
    let d = new Date();
    let nowYear = d.getFullYear()
    let nowMonth = d.getMonth() + 1
    let setMonth = 1
    let setYear = 2018

    my.datePicker({
      format: 'yyyy-MM',
      startDate: setYear + "-" + setMonth,
      currentDate: this.data.month,
      endDate: nowYear + "-" + nowMonth,
      success: (res) => {
        this.setData({
          month: res.date
        })
        if(this.data.tab){
          this.setData({
            pageInvoiceIndex:1,
            invoiceArr:[],
            nomoreInvoice:false,
          })
        }else{
          this.setData({
            pageTripIndex:1,
            tripArr:[],
            nomoreTrip:false,
          })
        }
        this.data.tab ? this.getInvoiceRecord() : this.getTripRecord();
      }
    });
  },
  selStatus(){
    my.showActionSheet({
      title: '选择开票状态',
      items: this.data.statusArr,
      success: (res) => {
        this.setData({
          status: this.data.statusArr[res.index],
          pageInvoiceIndex:1,
          invoiceArr:[]
        });
        this.getInvoiceRecord();
      },
    });
  },
  //行程列表
  getTripRecord(){
    if(this.data.nomoreTrip) return;
    let json1 = {
      month: this.data.month.split("-").join(""),
      ticketId: app.userInfo.ticketId,
      pageIndex: this.data.pageTripIndex,
      pageSize: 10
    }
    app.ajax(json1,'MTC_MPRECORDS',(data) => {
      let nomoreTrip = false;
      console.log('---data----',data)
      if(data.items.length<10) nomoreTrip = true;
      this.setData({
        tripArr: this.data.tripArr.concat(data.items),
        pageTripIndex: ++this.data.pageTripIndex,
        nomoreTrip
      })
      console.log(this.data.tripArr)
    })
  },
  //开票列表
  getInvoiceRecord(){
    if(this.data.nomoreInvoice) return;
    let json1 = {
      month: this.data.month.split("-").join(""),
      ticketId: app.userInfo.ticketId,
      pageIndex: this.data.pageInvoiceIndex,
      status:this.data.status,
      pageSize: 10
    }
    app.ajax(json1,'MTC_SEARCHAPPLY',(data) => {
      let nomoreInvoice = false;
      if(data.items.length<10) nomoreInvoice = true;
      data.items.forEach((item,index) => {
        item.applyTime = app.format(item.applyTime)
        
      })
      this.setData({
        invoiceArr: this.data.invoiceArr.concat(data.items),
        pageInvoiceIndex: ++this.data.pageInvoiceIndex,
        nomoreInvoice
      })
    })
    return this.data.invoiceArr
  },
  lower() {
    console.log("到底了xxxx")
    this.data.tab ? this.getInvoiceRecord() : this.getTripRecord();
  },
  goMtcConfirm(e){
    console.log(e)
    let detail = JSON.stringify(e.target.dataset.detail)
    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/mtc/recordConfirm/recordConfirm?detail=${detail}`,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  },
  goInvoiceDetail(e){
    let invoiceDetail = this.data.invoiceArr[e.target.dataset.index];
    my.setStorageSync({
      key: "invoiceDetail",
      data: invoiceDetail
    })
    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/mtc/invoiceDetail/invoiceDetail`,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  }
});
