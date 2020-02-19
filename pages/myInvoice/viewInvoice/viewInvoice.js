const app = getApp();

Page({
  data: {
    items:[]
  },
  onLoad(query) {
    this.setData({
      applyId: query.applyId,
      // cardId: query.cardId,
      // countRecord: query.countRecord
    })
    this.getCardId();
    // this.getDZFPList();
    // this.getDZFPDet();

  },
  getCardId(){
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
        inv: data
      })
      this.getDZFPList();
    })
  },
  getDZFPList(){
    let json1;
    json1 = {
      applyId: this.data.applyId,
      cardId: this.data.inv.cardId,
      ticketId: app.userInfo.ticketId
    }
    my.showLoading({
      content: '加载中...',
    });
    app.ajax(json1,'INVOICE_INVOICEGROUP',(data)=>{
      for(let i in data.items){
        data.items[i].invoiceTime = app.format(data.items[i].invoiceTime);
      }
      this.setData(data)
      // this.setData({
      //   items: data.items
      // })
    })
  },
  // getDZFPDet(){
  //   let json1,that = this;
  //   json1 = {
  //     applyId: this.data.applyId,
  //     cardId: this.data.cardId,
  //     ticketId: app.userInfo.ticketId
  //   }
  //   my.showLoading({
  //     content: '加载中...',
  //   });
  //   app.ajax(json1,'INVOICE_INVOICEGROUP',function(data){
  //     data.applyTime = app.format(data.applyTime);
  //     app.invDet = data
  //   })
  // },
  toDZFP(ind,pdfUrl){
    let invInfo = this.data.items[ind];
    let source = this.data.applySource?this.data.applySource:'';
    let data = {
      invoice_no: invInfo.invoiceNum,
      invoice_code: invInfo.invoiceCode,
      invoice_amount: (invInfo.totalAmount/100).toFixed(2),
      invoice_date: invInfo.invoiceTime.slice(0,10),
      title_name: invInfo.buyerName,
      tax_amount: (invInfo.totalTaxAmount/100).toFixed(2),
      register_name: invInfo.sellerName,
      seller_tax_num: invInfo.sellerTaxNum,
      source: 1,
      user_id: app.userInfo.userId,//2088102175926618
      file_download_url: pdfUrl,
      apply_source: source //来源
    }
    // console.log(data)
    let aesData = app.AESencrypt(data);
    my.request({
      url: app.ajaxRoot2,
      headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
      method: 'POST',
      data: aesData,
      dataType: 'json',
      success: function(res) {
        if(res.data.data){
          console.log('---------------',res.data.data)
          my.call('startApp', {
            appId: '20000920',
            param: {
                startMultApp: 'YES',
                appClearTop: false,
                url: '/www/detail.htm?code='+res.data.data+'&__webview_options__=ttb%3Dauto'
            }
          });
        }
      },
      fail: function(res) {
        my.hideLoading();
      },
      complete: function(res) {
        my.hideLoading();
      }
    });
    // console.log(app.InvoiceHtmlUrl)
    // my.navigateTo({
    //   url: "/pages/myInvoice/invImg/invImg"
    // })
  },
  toMingxi(){
    let str = '?countRecord='+this.data.inv.countRecord + "&applyId="+ this.data.applyId +"&cardId=" +this.data.inv.cardId;
    my.navigateTo({
      url:'/pages/myInvoice/invDetail/invDetail' + str
    });
  },
  fphc(e){
    my.showLoading({
      content: '加载中...'
    })
    let ind = e.target.dataset.ind;
    let invH5Url = this.data.items[ind].invoiceHtmlUrl;
    var reg = new RegExp("(^|&)param=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = invH5Url.split("?")[1].match(reg);  // 匹配目标参数
    let param = unescape(r[2]);//'ZnBkbT0wMTEwMDE3MDAxMTImZnBobT0wOTk4NjUzMQ=='
    console.time("getInfo");
    my.request({
      url: 'https://kp.txffp.com/openInvoice/api/service/getInvoice',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      method: 'POST',
      data: param,
      success: (res) => {
        console.log(1,res);
        if(res.data.success){
          let data = {
            invoiceID: res.data.data.invoiceID
          }
          my.request({
            url: 'https://kp.txffp.com/openInvoice/api/service/getPdfUrl',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            method: 'POST',
            data: JSON.stringify(data),
            dataType: 'json',
            success: (res2)=> {
              console.log(2,res2)
              if(res.data.success){
                console.timeEnd("getInfo");
                this.toDZFP(ind,res2.data.data)
              }
            },
            fail: function(res) {
            },
            complete: function(res) {
              my.hideLoading();
            }
          });
        }
      },
      fail: function(res) {
      },
      complete: function(res) {
        my.hideLoading();
      }
    });
  },
  lookInvoice(e){
    let url = e.target.dataset.url
    app.gotoH5(url)
  }
});
