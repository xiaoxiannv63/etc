if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$.js?appxworker=1');
require('./importScripts$.js?appxworker=1');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../../app.js?appxworker=1');
require('../../node_modules/mini-antui/es/flex/index.js?appxworker=1');
require('../../node_modules/mini-antui/es/flex/flex-item/index.js?appxworker=1');
require('../../node_modules/mini-antui/es/modal/index.js?appxworker=1');
require('../../node_modules/mini-antui/es/list/index.js?appxworker=1');
require('../../node_modules/mini-antui/es/list/list-item/index.js?appxworker=1');
require('../../node_modules/mini-antui/es/grid/index.js?appxworker=1');
require('../../node_modules/mini-antui/es/badge/index.js?appxworker=1');
require('../../node_modules/mini-antui/es/tabs/index.js?appxworker=1');
require('../../node_modules/mini-antui/es/tabs/tab-content/index.js?appxworker=1');
require('../../node_modules/mini-antui/es/am-icon/index.js?appxworker=1');
require('../../node_modules/mini-antui/es/notice/index.js?appxworker=1');
require('../../components/steps/steps.js?appxworker=1');
require('../../pages/startup/startup.js?appxworker=1');
require('../../pages/index/index.js?appxworker=1');
require('../../pages/invoiceStatus/invoiceStatus.js?appxworker=1');
require('../../pages/iWangTo/kpSuccess/kpSuccess.js?appxworker=1');
require('../../pages/electronicInvoice/electronicInvoice.js?appxworker=1');
require('../../pages/web/index.js?appxworker=1');
require('../../pages/invoice/invoice.js?appxworker=1');
require('../../pages/wodeETC/etcDetail/etcDetail.js?appxworker=1');
require('../../pages/quotation/quotation.js?appxworker=1');
require('../../pages/login/protocols/protocols.js?appxworker=1');
require('../../pages/login/personal/personal.js?appxworker=1');
require('../../pages/help/help.js?appxworker=1');
require('../../pages/myInvoice/invoiceList/invoiceList.js?appxworker=1');
require('../../pages/changing/changing.js?appxworker=1');
require('../../pages/invoiceError/invoiceError.js?appxworker=1');
require('../../pages/bindSuccessful/bindSuccessful.js?appxworker=1');
require('../../pages/user/user.js?appxworker=1');
require('../../pages/login/bind/index.js?appxworker=1');
require('../../pages/wodeETC/myetc/myetc.js?appxworker=1');
require('../../pages/question/question.js?appxworker=1');
require('../../pages/wodeETC/addEtcCard/addEtcCard.js?appxworker=1');
require('../../pages/invoiceRecord/invoiceRecord.js?appxworker=1');
require('../../pages/wodeETC/selTaitou/selTaitou.js?appxworker=1');
require('../../pages/invoiceTit/index/index.js?appxworker=1');
require('../../pages/invoiceTit/invoiceDet/invoiceDet.js?appxworker=1');
require('../../pages/invoiceTit/redact/redact.js?appxworker=1');
require('../../pages/invoiceTit/addTaitou/addTaitou.js?appxworker=1');
require('../../pages/invoiceTit/selEtc/selEtc.js?appxworker=1');
require('../../pages/myInvoice/serInvList/serInvList.js?appxworker=1');
require('../../pages/myInvoice/invApplication/invApplication.js?appxworker=1');
require('../../pages/myInvoice/viewInvoice/viewInvoice.js?appxworker=1');
require('../../pages/myInvoice/invImg/invImg.js?appxworker=1');
require('../../pages/myInvoice/invDetail/invDetail.js?appxworker=1');
require('../../pages/iWangTo/cardList/cardList.js?appxworker=1');
require('../../pages/iWangTo/recordList/recordList.js?appxworker=1');
require('../../pages/iWangTo/invAccept/invAccept.js?appxworker=1');
require('../../pages/routeInvoice/routeInvoice.js?appxworker=1');
}
self.bootstrapApp ? self.bootstrapApp({ success: success }) : success();
}