const app = getApp();
Page({
  data: {
    tabs:['通行记录','开票记录'],
    tab:0,
    monthLeft:'',//查询月份（通行记录）
    monthRight:'',//查询月份(开票记录)
    statusArr:['开票中','开票完成','审核中','审核失败','全部'],
    statusEn:["INVOICING","INVOICED","CHECKING","CHECK_FAILED",""],
    statusObj:{
      "WAIT":"开票中",
      "INVOICING":"开票中",
      "INVOICED":"开票完成",
      "CHECKING":"审核中",
      "CHECK_FAILED":"审核失败",
      "INVOICE_FAIL":"开票完成"
    },
    statusSel:"",
    status:'全部',
    pageTripIndex:1,
    pageInvoiceIndex:1,
    nomoreTrip:false,
    nomoreInvoice:false,
    tripArr:[],//行程记录
    invoiceArr:[],//开票记录
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
      monthRight: nowMonth,
      monthLeft: nowMonth
    })
    // 日期格式
    function num2(num){
      return ('0'+num).slice(-2)
    }

    this.data.tab ? this.getInvoiceRecord() : this.getTripRecord();
  },
  changeTab(e){
    this.setData({
      tab:e.target.dataset.index,
    })
    if(this.data.tab && this.data.invoiceArr.length == 0){
      this.getInvoiceRecord()
    }else if(!this.data.tab && this.data.tripArr.length == 0){
      this.getTripRecord();
    }
  },
  selDateLeft(){
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
          monthLeft: res.date
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
  selDateRight(){
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
          monthRight: res.date
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
        console.log(res)
        if(res.index == -1){
          this.setData({
            status: this.data.status,
            statusSel: this.data.statusSel,
            pageInvoiceIndex:1,
            invoiceArr:[],
            nomoreInvoice:false
          });
        }else{
          this.setData({
            status: this.data.statusArr[res.index],
            statusSel: this.data.statusEn[res.index],
            pageInvoiceIndex:1,
            invoiceArr:[],
            nomoreInvoice:false
          });
        }
        console.log(111111)
        this.getInvoiceRecord();
      },
    });
  },
  //行程列表
  getTripRecord(){
    if(this.data.nomoreTrip) return;
    let json1 = {
      month: this.data.monthLeft.split("-").join(""),
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
    console.log(22222)
    if(this.data.nomoreInvoice) return;
    let json1 = {
      month: this.data.monthRight.split("-").join(""),
      ticketId: app.userInfo.ticketId,
      pageIndex: this.data.pageInvoiceIndex,
      status:this.data.statusSel,
      pageSize: 10
    }
    app.ajax(json1,'MTC_SEARCHAPPLY',(data) => {
      let nomoreInvoice = false;
      console.log(data)
      if(data.items.length<10) nomoreInvoice = true;
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
