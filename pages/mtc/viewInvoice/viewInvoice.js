const app = getApp();

Page({
  data: {
    items:[{
      buyerName:"123",
      buyerTaxNum:null,
      invoiceCode:"150005465212",
      invoiceHtmlUrl:"http://2d076b3970.imwork.net:33080/openInvoice/invoice/previewInvoicetxf.html?param=ZnBkbT0xNTAwMDU0NjUyMTImZnBobT05NTQzNjU2NA==",
      invoiceNum:"95436564",
      invoiceTime:"2018-12-14 15:14:39",
      sellerName:"贵州省高速公路联网管理中心",
      sellerTaxNum:"512345678900000039",
      totalAmount:20580,
      totalTaxAmount:599
    },
    {
      buyerName:"123",
      buyerTaxNum:null,
      invoiceCode:"150005465212",
      invoiceHtmlUrl:"http://2d076b3970.imwork.net:33080/openInvoice/invoice/previewInvoicetxf.html?param=ZnBkbT0xNTAwMDU0NjUyMTImZnBobT05NTQzNjU2NA==",
      invoiceNum:"95436564",
      invoiceTime:"2018-12-14 15:14:39",
      sellerName:"贵州省高速公路联网管理中心",
      sellerTaxNum:"512345678900000039",
      totalAmount:20580,
      totalTaxAmount:599
    }
  ]},
  onLoad(query) {

  },
 
  scan(e){
    let url = e.target.dataset.url
    app.gotoH5(url)
  }
});
