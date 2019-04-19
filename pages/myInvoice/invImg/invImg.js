const app = getApp();

Page({
  data: {
    url: ''
  },
  onLoad() {
    // console.log(app.InvoiceHtmlUrl)
    this.setData({
      url: app.InvoiceHtmlUrl?app.InvoiceHtmlUrl:''
    })
  }
});
