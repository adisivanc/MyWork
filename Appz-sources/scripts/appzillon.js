var Apz = function() {
   ///////////////App Hooks////////////////////
   this.app = {};
   ///////////////Properties////////////////////
   this.version = "1.0.0.0";
   this.expiryDate = null;
   this.serverToken = null;
   this.otpReqd = null;
   this.otaReqd = null;
   this.serverUrl = null;
   this.trackLocation = false;
   this.serverToken = null;
   this.firstPage = null;
   this.firstPageLayout = null;
   ///////////////Settings//////////////////////
   this.dateFormat = "";
   this.timeFormat = "";
   this.dateTimeFormat = "";
   this.dfltDecimals = 2;
   this.decimalSep = ".";
   this.thousandSep = ",";
   this.numberMask = "MILLION";
   this.theme = "";
   this.language = "en";
   this.enableAnimations = true;
   //////////////Constants//////////////////
   this.bindingEngine = "APPZILLON";
   this.genTheme = null;
   this.idSep = "__";
   this.recSep = "_"
   this.webPath = "";
   this.deviceId = "APPZILLONSIMULATOR";
   this.deviceGroup = null;
   this.deviceGroupDet = null;
   this.deviceType = "APPZILLONSIMULATOR";
   this.screenSize = null;
   this.screenPpi = null;
   this.stdPpi = 160;
   this.nativeServiceCBName = "Apz.nativeServiceCB";
   /////////////Angular Specific////////////////
   this.angularscope = null;
   /////////////App Data////////////////////////
   this.lattitude = null;
   this.longitude = null;
   this.orientation = "PORTRAIT";
   this.lockRotation = false;
   this.sessionId = null;
   this.userId = null;
   this.userFirstName = null;
   this.userLastName = null;
   this.userExtId = null;
   this.userProfilePic = null;
   this.lastLogin = null;
   this.store = [];
   this.ifaces = [];
   this.ifacesMap = [];
   this.scrDefs = [];
   this.scrDefsMap = [];
   this.scrHtmls = [];
   this.loadDiv = "page_1";
   this.currDiv = "page_2";
   this.currScr = "";
   this.msgs = [];
   this.lovs = [];
   this.lits = [];
   this.ccys = [];
   this.scrMetaData = null;
   this.scrReq = null;
   this.scrResp = null;
   this.privs = {};
   this.privs.screens = {};
   this.privs.ifaces = {};
   this.privs.controls = {};
   /////////////Flags/Temp Stores////////////////////////
   this.procIdCntr = 0;
   ////////////////Initialize Mandatory Modules/////////
   //this.ns = new Apz.Ns(this);
  // this.log = new Apz.Log(this);
   ////////////////Initialize Optional Modules//////////
   if (Apz.Data) {
      this.data = new Apz.Data(this);
   }
   if (Apz.Audit) {
      this.audit = new Apz.Audit(this);
   }
   if (Apz.Val) {
      this.val = new Apz.Val(this);
   }
   if (Apz.Mca) {
      this.mca = new Apz.Mca(this);
   }
   if (Apz.Server) {
      this.server = new Apz.Server(this);
   }
   if (Apz.Offline) {
      this.offline = new Apz.Offline(this);
   }
   if (Apz.Workflow) {
      this.workflow = new Apz.Workflow(this);
   }
   if (Apz.Lov) {
      this.lov = new Apz.Lov(this);
   }
};
//APPZILLONMCAAPP //Dont Delete
////Plugin Call Details
Apz.apzNativeServiceDet = [];
////Display Msg Details
Apz.dispMsgCBParams = null;
///Disp MSg Call Back
Apz.dispMsgCB = function(choice) {
   var params = Apz.dispMsgCBParams;
   if (params) {
      params.choice = choice;
      //Call User Call Back
      if (this.isFunction(params.callBack)) {
         if (params.callBackObj) {
            params.callBack.call(params.callBackObj, params);
         } else {
            params.callBack(params);
         }
      }
   }
   ////Nullify Params
   Apz.dispMsgCBParams = null;
}
/////Init Native Service
///This gets called from Window Context as the call comes from native layer
Apz.nativeServiceCB = function(res) {
   if (typeof res == "string") {
      res = JSON.parse(res);
   }
   var id = res.id;
   if (res.id) {
      var cbDet = Apz.apzNativeServiceDet[id];
      res.proc = cbDet.proc;
      res.fwdData = cbDet.fwdData;
      res.callBack = cbDet.callBack;
      res.callBackObj = cbDet.callBackObj;
      ////Call Thread  CallBack
      cbDet.owner.procThreadCompleted.call(cbDet.owner, res);
      ///Remove From Map
      if (!res.keepAlive) {
         delete Apz.apzNativeServiceDet[id];
      }
   }
};
//////////////////////////////////////////////////////////////
///////////////////Prototype Definition///////////////////////
//////////////////////////////////////////////////////////////
Apz.prototype = {
   initNativeService : function(req) {
      if (req) {
         if (this.isNull(req.id)) {
            req.id = this.getProcId();
         }
         var cbDet = {};
         cbDet.id = req.id;
         //Reqiured to call thread Completed of the current instance
         cbDet.owner = this;
         cbDet.callBack = req.callBack;
         cbDet.callBackObj = req.callBackObj;
         cbDet.proc = req.proc;
         cbDet.fwdData = req.fwdData;
         Apz.apzNativeServiceDet[req.id] = cbDet;
         ///Remove circular dependency
         if (req.proc) {
             req.proc = null;
         }
         if (req.fwdData) {
             req.fwdData = null;
         }
         if (req.runnerObj) {
             req.runnerObj = null;
         }
         if (req.runner) {
             req.runner = null;
         }
         if (req.callBack) {
             req.callBack = null;
         }
         if (req.callBackObj) {
             req.callBackObj = null;
         }
      }
   }, getProcId : function() {
      this.procIdCntr = this.procIdCntr + 1;
      return "PROC_" + this.procIdCntr;
   },
   //////////////////////////////////////////////////////////////
   ///////////////////Process Definition///////////////////////
   //////////////////////////////////////////////////////////////
   startProc : function(proc) {
      var noOfThreads = proc.threads.length;
      proc.noOfThreads = noOfThreads;
      proc.successCount = 0;
      proc.failureCount = 0;
      if (noOfThreads > 0) {
         for (var i = 0; i < noOfThreads; i++) {
            var params = proc.threads[i];
            params.proc = proc;
            ///Execute
            params.runner.call(params.runnerObj, params);
         }
      } else {
         ////Directly call Process Completed
         if (this.isFunction(proc.callBack)) {
            if (proc.callBackObj) {
               proc.callBack.call(proc.callBackObj, proc);
            } else {
               proc.callBack(proc);
            }
         }
      }
   }, procThreadCompleted : function(params) {
      if (params) {
         try {
            ////Call Thread Callback Function
            if (this.isFunction(params.callBack)) {
               if (params.callBackObj) {
                  params.callBack.call(params.callBackObj, params);
               } else {
                  params.callBack(params);
               }
            }
            ////Call Process Call Back..
            if (params.proc) {
               if (!params.status) {
                  params.proc.failureCount = params.proc.failureCount + 1;
               } else {
                  params.proc.successCount = params.proc.successCount + 1;
               }
               if (params.proc.noOfThreads) {
                  params.proc.noOfThreads = params.proc.noOfThreads - 1;
                  if (params.proc.noOfThreads === 0) {
                     console.log("Process Completed..");
                     if (this.isFunction(params.proc.callBack)) {
                        if (params.proc.callBackObj) {
                           params.proc.callBack.call(params.proc.callBackObj, params.proc);
                        } else {
                           params.proc.callBack(params.proc);
                        }
                     }
                  }
               }
            }
         } catch (e) {
            console.log("Error :" + e.message);
         }
      }
   },
   //////////////////////////////////////////////////////////////
   ///////////////////Utils//////////////////////////////////////
   //////////////////////////////////////////////////////////////
   getFile : function(params) {
      var content = null;
      if (this.getDataType(params) == "STRING") {
         var path = params;
         params = {};
         params.path = path;
      }
      var myobj = $(this)[0];
      if (this.isNull(params.async)) {
         params.async = false;
      }
      $.ajax({
         type : "GET", url : params.path, dataType : "text", async : params.async, success : function(data) {
            params.status = true;
            params.content = data;
            ///Callback
            myobj.procThreadCompleted(params);
            content = data;
         }, error : function(data) {
            params.status = false;
            params.content = null;
            ///Callback
            myobj.procThreadCompleted(params);
         }
      });
      return content;
   }, getScreenWidth : function() {
      return $(window).width();
   }, getScreenHeight : function() {
      return screen.height;
   }, startLoader : function() {
      $("#apzloader").removeClass("dispnone viewhidden");
   }, stopLoader : function() {
      $("#apzloader").addClass("dispnone");
   }, isNull : function(obj) {
      return (!((obj !== null) && (obj !== "") && (obj !== "undefined") && (obj !== undefined)));
   }, getBoolean : function(flag) {
      return (flag == "Y");
   }, containsKey : function(obj, key) {
      return key in obj;
   }, getScreenWidth : function() {
      return $(window).width();
   }, getScreenHeight : function() {
      return screen.height;
   }, copyJSONObject : function(obj) {
      var newObj = null;
      try {
         newObj = JSON.parse(JSON.stringify(obj));
      } catch (err) {
      }
      return newObj;
   }, clearJSONObject : function(obj) {
      for (var m in obj)
      delete obj[m];
   }, sleep : function(millis, callBack) {
      setTimeout(function() {
         if (callBack !== null) {
            callBack();
         }
      }, millis);
   }, getFloat : function(str) {
      var flt = null;
      try {
         flt = parseFloat(str);
      } catch (err) {
         flt = null;
      }
      if (flt.toString() == "NaN") {
         flt = null;
      }
      return flt;
   }, getInt : function(str) {
      var intVal = null;
      try {
         intVal = parseInt(str);
      } catch (err) {
         intVal = null;
      }
      if (intVal.toString() == "NaN") {
         intVal = null;
      }
      return intVal;
   }, getDataType : function(object) {
      if (object === null) {
         return "null";
      } else if (object === undefined) {
         return "undefined";
      } else if (object.constructor === String) {
         return "STRING";
      } else if (object.constructor === Array) {
         return "Array";
      } else if (object.constructor === Object) {
         return "Object";
      } else if (object == "") {
         return "STRING";
      } else {
         return "none";
      }
   }, isFunction : function(obj) {
      return ( typeof obj == "function");
   }, renameNode : function(parentNode, node, oldName, newName) {
      try {
         if (oldName != newName) {
            var lstr = JSON.stringify(node);
            parentNode[newName] = JSON.parse(lstr);
            node = parentNode[newName];
            delete parentNode[oldName];
         }
      } catch (err) {
      }
      return node;
   }, getObjRowNumber : function(obj) {
      var rowno = obj.getAttribute('rowno');
      if (this.isNull(rowno)) {
         rowno = -1;
      }
      rowno = this.getInt(rowno);
      return rowno;
   }, getObjIdWORowNumber : function(obj) {
      var id = obj.id;
      var lrecno = this.getObjRowNumber(obj);
      var idx = -1;
      if (lrecno != -1) {
         idx = id.lastIndexOf('_');
         id = id.substr(0, idx);
      }
      return id;
   }, getIfaceType : function(iface) {
      var type = "APPZILLON";
      var ifaceName = this.getIfaceName(iface);
      try {
         type = this.ifacesMap[ifacename].type;
      } catch (err) {
         type = "APPZILLON";
      }
      return type;
   }, getReqRoot : function(ifaceName) {
      return ifaceName + "_Req";
   }, getResRoot : function(ifaceName) {
      var type = getIfaceType(ifaceName);
      var root = ifaceName + "_Res";
      if (type == "DATABASE") {
         root = ifaceName + "_Req";
      }
      return root;
   }, getIfaceIdFromDml : function(iface, dml) {
      var dmlInd = "";
      if (dml == "RES") {
         dmlInd = "_Res";
      } else if (dml == "REQ") {
         dmlInd = "_Req"
      }
      return iface + dmlInd;
   }, getNodeId : function(iface, dml, node) {
      var id = "";
      if (!this.isNull(node)) {
         var dmlInd = "i";
         if ((dml == "RES") || (dml == "o")) {
            dmlInd = "o";
         }
         id = iface + this.idSep + dmlInd + this.idSep + node;
      }
      return id;
   }, getNodeName : function(nodeId) {
      var nodeName = nodeId;
      if (this.containsKey(this.scrMetaData.nodesMap, nodeId)) {
         nodeName = this.scrMetaData.nodesMap[nodeId].name;
      }
      return nodeName;
   }, getElmId : function(nodeId, elm) {
      return nodeId + this.idSep + elm;
   }, getElmName : function(elmId) {
      var elmName = elmId;
      if (this.containsKey(this.scrMetaData.elmsMap, elmId)) {
         elmName = this.scrMetaData.elmsMap[elmId].name;
      }
      return elmName;
   }, getElmIface : function(elmId) {
      var iface = "";
      var ind = elmId.indexOf(this.idSeperator);
      if (ind >= 0) {
         iface = elmId.substring(0, ind);
      }
      return iface;
   },
   //// Method to check the given element is Datamodel Element
   isDMLElm : function(elmId) {
      var dmlElm = false;
      var elmDet = elmId.split(this.idSep);
      if (elmDet.length == 4) {
         if ((!this.isNull(elmDet[0])) && (!this.isNull(elmDet[0])) && (!this.isNull(elmDet[0])) && (!this.isNull(elmDet[0]))) {
            dmlElm = true;
            ///Rads .. Need to check other conditions as well..
         }
      }
      return dmlElm;
   }, readjustHeight : function() {
      try {
         document.getElementById("page-body").style.height = "auto";
         var x, y;
         if (self.innerHeight)// all except Explorer
         {
            x = self.innerWidth;
            y = self.innerHeight;
         } else if (document.documentElement && document.documentElement.clientHeight) {
            x = document.documentElement.clientWidth;
            y = document.documentElement.clientHeight;
         } else if (document.body) {
            x = document.body.clientWidth;
            y = document.body.clientHeight;
         }
         var hdrHeight = jQuery('#header').height();
         if (this.isNull(hdrHeight)) {
            hdrHeight = 0;
         }
         var ftrHeight = jQuery('#footer').height();
         if (this.isNull(ftrHeight)) {
            ftrHeight = 0;
         }
         var pageHeight = y - (hdrHeight + ftrHeight);
         var pageWidth = x;
         var sidebarHeight = 0;
         var body = document.getElementById("page-body");
         var sidebar = document.getElementById("sidebar");
         if (pageHeight < 75) {
            return false;
         } else {
            body.style.marginTop = hdrHeight + "px";
            body.style.marginBottom = ftrHeight + "px";
            if (!this.isNull(sidebar)) {
               sidebar.style.top = hdrHeight + "px";
               sidebar.style.marginBottom = ftrHeight + "px";
               sidebarHeight = sidebar.clientHeight;
            }
         }
         if (body.clientHeight <= sidebarHeight) {
            if (pageHeight >= sidebarHeight) {
               body.style.height = pageHeight + "px";
               sidebar.style.minHeight = pageHeight + "px";
            } else if (sidebarHeight > pageHeight) {
               body.style.height = sidebarHeight + "px";
            }
         } else {
            if (body.clientHeight <= pageHeight) {
               document.getElementById("page-body").style.height = pageHeight + "px";
            }
         }
      } catch (e) {
      }
   }, getEncryptionKey : function() {
      var key = this.encryptionKey;
      if (!this.isNull) {
         key = replace.replace("$APPID", this.appId).replace("$DEVICEID", this.deviceId).replace("$USERID", this.userId);
      }
      return key;
   }, getDeviceGroup : function() {
      var path = this.getConfigPath() + "/" + "devicegroups.json";
      var params = {};
      params.path = path;
      params.async = false;
      params.id = "DEVICEGROUP";
      params.callBack = null;
      params.content = this.getFile(params);
      var deviceGroups = JSON.parse(params.content);
      deviceGroups = deviceGroups.deviceGroups;
      var deviceGroup = null;
      var sw = this.screenSize.split("X")[0];
      var sh = this.screenSize.split("X")[1];
      sw = Math.round(sw / (this.screenPpi / this.stdPpi));
      sh = Math.round(sh / (this.screenPpi / this.stdPpi));
      var dw = 0;
      var dh = 0;
      var dt = 0;
      var minDiff = 999999;
      for (var i = 0; i < deviceGroups.length; i++) {
         if ((deviceGroups[i].os == "ALL") || (deviceGroups[i] == this.deviceOs)) {
            dw = Math.abs(sw - deviceGroups[i].width);
            dh = Math.abs(sh - deviceGroups[i].height);
            if (dw == 0 && dh == 0) {
               deviceGroup = deviceGroups[i].name;
               this.deviceGroupDet = deviceGroups[i];
               break;
            } else {
               dt = dw + dh;
               if (dt < minDiff) {
                  deviceGroup = deviceGroups[i].name;
                  minDiff = dt;
                  this.deviceGroupDet = deviceGroups[i];
               }
            }
         }
      }
      return deviceGroup;
   }, onOrientationChange : function(orientation) {
      this.orientation = orientation;
   }, getServerdateFormat : function(node) {
      var format = this.ifacesMap[this.scrMetaData.nodesMap[node].ifaceName].dateFormat;
      if (this.isNull(format)) {
         format = "yyyy-MM-dd";
      }
      return format;
   }, getServerTimeFormat : function(node) {
      var format = this.ifacesMap[this.scrMetaData.nodesMap[node].ifaceName].timeFormat;
      if (this.isNull(format)) {
         format = "hh:mm:ss";
      }
      return format;
   }, getServerDateTimeFormat : function(node) {
      var format = this.ifacesMap[this.scrMetadata.nodesMap[node].ifaceName].dateTimeFormat;
      if (this.isNull(format)) {
         format = "hh:mm:ss";
      }
      return format;
   }, formatDate : function(val, fromFormat, toFormat) {
      var value = "";
      if (!this.isNull(val)) {
         try {
            if (fromFormat != toFormat) {
               var ldate = null;
               ////Convert To Date Object
               if (fromFormat == "sssssssssssss") {
                  ldate = new Date();
                  ldate.setTime(val);
               } else {
                  ldate = Date.parseExact(encodeURIComponent(val), encodeURIComponent(fromFormat));
               }
               ////Make it a String.
               if (toFormat == "sssssssssssss") {
                  value = ldate.getTime();
               } else {
                  value = ldate.toString(toFormat);
               }
               ///Check For Null..
               if (this.isNull(value)) {
                  value = val;
               }
            } else {
               value = val;
            }
         } catch (err) {
            value = val;
         }
      }
      return value;
   }, getDecimalPoints : function(elmData, recNo) {
      var decPoints = this.dfltDecimals;
      if (!this.isNull(elmData)) {
         if (elmData.dataType == "INTEGER") {
            decPoints = 0;
         } else {
            var relId = elmData.relElm;
            if (!this.isNull(relId)) {
               if (recNo !== -1) {
                  relId = relId + "_" + recNo;
               }
               if (relId != "__") {
                  var relObj = document.getElementById(relId);
                  if (!this.isNull(relObj)) {
                     var ccy = this.getObjValue(relObj);
                     if (!this.isNull(ccy)) {
                        try {
                           decPoints = this.ccys[ccy];
                           if (this.isNull(decPoints)) {
                              decPoints = this.dfltDecimals;
                           }
                        } catch (e) {
                           decPoints = this.dfltDecimals;
                        }
                     }
                  }
               }
            } else {// // Added by Chandu to take max decimals if currencies not
               // maintained
               decPoints = elmData.maxDec;
               if (this.isNull(decPoints)) {
                  decPoints = this.dfltDecimals;
               }
            }
         }
         if ((this.isNull(decPoints)) || (elmData.dataType != "INTEGER" && decPoints == 0)) {
            decPoints = 2;
         }
      }
      return decPoints;
   }, million : function(value, decSep, decPoint) {
      if (decSep == ".") {
         thouSep = ",";
      } else {
         thouSep = ".";
      }
      x = value.split('.');
      x1 = x[0];
      x2 = x.length > 1 ? decSep + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
         x1 = x1.replace(rgx, '$1' + thouSep + '$2');
      }
      if (x2.length > 1 && decPoint > 0) {
         if ((x[1].length) < decPoint) {
            for ( i = 0; i < (decPoint - x[1].length); i++) {
               x2 = x2 + 0;
            }
         } else {
            x2 = ".";
            for (i = 0; i < decPoint; i++) {
               x2 = x2 + 0;
            }
         }
      } else {
         for ( i = 0; i < decPoint; i++) {
            if (i == 0)
               x1 = x1 + decSep + "0";
            else
               x1 = x1 + "0";
         }
      }
      return (x1 + x2);
   }, lakh : function(value, decSep, decPoint) {
      if (decSep == ".") {
         thouSep = ",";
      } else {
         thouSep = ".";
      }
      var runTime = "N";
      var x = value.split('.');
      var value = x[0];
      var len = value.length;
      var len1 = len - 3;
      var i = value.substring(len - 3, len);
      var j = value.substring(0, len - 3);
      var result = '';
      if (len > 3) {
         var a = 2;
         if (len1 % 2 == 0) {
            for (var count = 0; count < len1; count++) {
               result += j.substring(count, a) + thouSep;
               count = count + 1;
               a = a + 2;
            }
         } else {
            var k = value.substring(0, 1) + thouSep;
            var l = j.substring(1, j.length);
            for (var count = 0; count < l.length; count++) {
               result += l.substring(count, a) + thouSep;
               count = count + 1;
               a = a + 2;
            }
            result = k + result;
         }
      }
      result = result + i;
      if (x.length > 1 && decPoint > 0) {
         result = result + decSep + x[1].substring(0, decPoint);
         if (x[1].length < decPoint) {
            for ( i = 0; i < (decPoint - x[1].length); i++) {
               result = result + 0;
            }
         }
      } else {
         for ( i = 0; i < decPoint; i++) {
            if (i == 0)
               result = result + decSep + "0";
            else
               result = result + "0";
         }
      }
      return result;
   }, formatNumber : function(value, decimalSep, decimalPoints, mask, displayAsLiteral) {
      var lvalue = "";
      if (decimalSep == ".") {
         thousandSep = ",";
      } else {
         thousandSep = ".";
      }
      // // Check if number has to be displayed as Literal
      if (!this.isNull(value)) {
         var decSep = decimalSep;
         var maskSep = thousandSep;
         value = parseFloat(value);
         value = value.toString();
         var lvalue = value.trim();
         var minus = lvalue.split(/-/g).length - 1;
         if (minus > 0) {
            lvalue = lvalue.substring(1, lvalue.length);
         }
         if (displayAsLiteral == "Y") {
            if (mask == "MILLION") {
               if (lvalue >= 10000000)
                  lvalue = (lvalue / 1000000000).toFixed(1) + 'B';
               else if (lvalue >= 100000)
                  lvalue = (lvalue / 1000000).toFixed(1) + 'M';
               else if (lvalue >= 1000)
                  lvalue = (lvalue / 1000).toFixed(1) + 'T';
            } else if (mask == "LAKH") {
               if (lvalue >= 10000000)
                  lvalue = (lvalue / 10000000).toFixed(1) + 'C';
               else if (lvalue >= 100000)
                  lvalue = (lvalue / 100000).toFixed(1) + 'L';
               else if (lvalue >= 1000)
                  lvalue = (lvalue / 1000).toFixed(1) + 'K';
            }
         } else {
            if (mask == "MILLION") {
               lvalue = this.million(lvalue, decSep, decimalPoints);
            } else if (mask == "LAKH") {
               lvalue = this.lakh(lvalue, decSep, decimalPoints);
            }
         }
         if (minus > 0) {
            lvalue = "-" + lvalue;
         }
      }
      return lvalue;
   }, formatNumberControl : function(obj) {
      var id = obj.id;
      var elmData = null;
      var recNo = -1;
      recNo = this.getObjRowNumber(obj);
      id = this.getObjIdWORowNumber(obj);
      try {
         elmData = this.scrMetaData.elmsMap[id];
      } catch (e) {
         elmData = null;
      }
      var value = this.getObjValue(obj);
      if (!this.isNull(value)) {
         //RADS - Unformat and Format Number..Chekc Should be based on whether
         // the value is Changed or Not..
         //If its not Changed, we shouldnot format because its alreay formatted
    // //Formatting a Literal to Number
       var lastChar = value.slice(-1);
       var val = value.split(lastChar)[0];
       if (!$.isNumeric(lastChar) && $.isNumeric(val)) {
          lastChar = lastChar.toUpperCase();
          if (lastChar == "L") {
        value = Number(val) * 100000;
          } else if (lastChar == "C") {
        value = Number(val) * 10000000;
          } else if (lastChar == "K" || lastChar == "M" || lastChar == "B" || lastChar == "T") {
        value = val + lastChar;
        value = numeral().unformat(value);
          } else {
        value = value;
          }
       }
       if (this.isNull(apz.val.validateNumber(id, value))) {
      // /// Currency Changes to be handled here
      var decPoints = this.getDecimalPoints(elmData, recNo);
      // //Number Field Validation
      if (apz.val.isNumber(value)) {
         value = this.unFormatNumber(value, this.decimalSep, elmData.displayAsLiteral);
         value = this.formatNumber(value, this.decimalSep, decPoints, this.numberMask, elmData.displayAsLiteral);
         this.setObjValue(obj, value);
      } else {
         this.displayMessage("APZ-CNT-078");
      }
        } else {
      obj.value = '';
        }
      }
   }, unFormatNumber : function(value, decimalSep, displayAsLiteral) {
      if (decimalSep == ".") {
         thousandSep = ",";
      } else {
         thousandSep = ".";
      }
      var lvalue = value;
      if (!this.isNull(value)) {
         if (displayAsLiteral == "Y") {
            var lastChar = lvalue.slice(-1);
            var val = lvalue.split(lastChar)[0];
            if (!$.isNumeric(lastChar)) {
               lastChar = lastChar.toUpperCase();
               val = Number(val);
               if (lastChar == "C") {
                  lvalue = val * 10000000;
               } else if (lastChar == "L") {
                  lvalue = val * 100000;
               } else if (lastChar == "K") {
                  lvalue = val * 1000;
                  lvalue = numeral().unformat(lvalue);
               } else if (lastChar == "B") {
                  lvalue = val * 1000000000;
               } else if (lastChar == "M") {
                  lvalue = val * 1000000;
               } else {
                  lvalue = value;
               }
            }
         } else {
            lvalue = value.toString();
            var regex = null;
            if (thousandSep == ".") {
               regex = new RegExp(thousandSep, "g");
               lvalue = lvalue.replace(/\./g, '');
               regex = new RegExp(",", "g");
               lvalue = lvalue.replace(regex, '.');
            } else {
               regex = new RegExp(thousandSep, "g");
               lvalue = lvalue.replace(regex, '');
            }
         }
      }
      return lvalue;
   }, dispMsg : function(params) {
      ////Register Call Back
      Apz.dispMsgCBParams = params;
      var desc = "";
      var defTitle = ""
      var type = "E";
      var title = null;
      var image = null;
      try {
         desc = this.messages[params.code];
         type = desc.substring(0, 1);
         desc = desc.substring(1);
      } catch (err) {
         desc = "Error Code " + code + " is Missing. Please Contact Helpdesk.";
         type = "E";
      }
      if (type == "I") {
         image = 'info.png';
         title = "LIT_DISP_MSG_INFO";
         defTitle = "Information";
      } else if (type == "E") {
         image = 'error.png';
         title = "LIT_DISP_MSG_ERROR";
         defTitle = "Error";
      } else if (type == "P") {
         image = 'prompt.png';
         title = "LIT_DISP_MSG_PROMPT";
         defTitle = "Prompt";
      } else if (type == "W") {
         image = 'warning.png';
         title = "LIT_DISP_MSG_WARNING";
         defTitle = "Warning";
      } else if (type == "C") {
         image = 'confirmation.png';
         title = "LIT_DISP_MSG_CONFIRMATION";
         defTitle = "Confirmation";
      } else if (type == "S") {
         image = 'Success.png';
         title = "LIT_DISP_MSG_SUCCESS";
         defTitle = "Success";
      }
      try {
         title = this.lits[this.language][title];
      } catch (err) {
         title = defTitle;
      }
      if (this.isNull(title)) {
         title = defTitle;
      }
      // //Update Arguments...
      var argsLen = 0;
      var largs = '';
      try {
         largs = params.args.split("<#>");
         argsLen = largs.length;
      } catch (err) {
         argsLen = 0;
      }
      var ind = 0;
      var arg = "";
      if (argsLen > 0) {
         for (var a = 0; a < argsLen; a++) {
            arg = largs[a];
            if (arg.indexOf("<#>") >= 0) {
               arg = "Invalid Argument";
            }
            ind = desc.indexOf("<#>");
            if (ind >= 0) {
               desc = desc.substring(0, ind) + larg + desc.substring(ind + 3);
            }
         }
      }
      image = "styles/" + this.theme + "/img/" + image;
      if (type === "C") {
         jConfirm(desc, title, Apz.dispMsgCB);
      } else if (type === "P") {
         jPrompt(desc, " ", title, Apz.dispMsgCB);
      } else {
         jAlert(desc, title, Apz.dispMsgCB);
      }
      $('#popup_content.alert').css('background-image', 'url(' + image + ')');
   }, displayMessage : function(code, args, callBackFunction) {
      var desc = "";
      var defTitle = ""
      var type = "E";
      var title = null;
      var image = null;
      var lcallBackFunction = '';
      var checkStat = true;
      if (!this.isNull(callBackFunction)) {
         lcallBackFunction = callBackFunction;
      } else if ( typeof (args) == "function" || this.isNull(args)) {
         lcallBackFunction = args;
         checkStat = false;
      }
      try {
         desc = this.messages[code];
         type = desc.substring(0, 1);
         desc = desc.substring(1);
      } catch (err) {
         desc = "Error Code " + code + " is Missing. Please Contact Helpdesk.";
         type = "E";
      }
      if (type == "I") {
         image = 'info.png';
         title = "LIT_DISP_MSG_INFO";
         defTitle = "Information";
      } else if (type == "E") {
         image = 'error.png';
         title = "LIT_DISP_MSG_ERROR";
         defTitle = "Error";
      } else if (type == "P") {
         image = 'prompt.png';
         title = "LIT_DISP_MSG_PROMPT";
         defTitle = "Prompt";
      } else if (type == "W") {
         image = 'warning.png';
         title = "LIT_DISP_MSG_WARNING";
         defTitle = "Warning";
      } else if (type == "C") {
         image = 'confirmation.png';
         title = "LIT_DISP_MSG_CONFIRMATION";
         defTitle = "Confirmation";
      } else if (type == "S") {
         image = 'Success.png';
         title = "LIT_DISP_MSG_SUCCESS";
         defTitle = "Success";
      }
      try {
         title = this.lits[this.language][title];
      } catch (err) {
         title = defTitle;
      }
      if (this.isNull(title)) {
         title = defTitle;
      }
      // //Update Arguments...
      var argsLen = 0;
      var largs = '';
      try {
         largs = args.split("<#>");
         argsLen = largs.length;
      } catch (err) {
         argsLen = 0;
      }
      if (!checkStat) {
         argsLen = 0;
      }
      var ind = 0;
      var arg = "";
      if (argsLen > 0) {
         for (var a = 0; a < argsLen; a++) {
            arg = largs[a];
            if (arg.indexOf("<#>") >= 0) {
               arg = "Invalid Argument";
            }
            ind = desc.indexOf("<#>");
            if (ind >= 0) {
               desc = desc.substring(0, ind) + larg + desc.substring(ind + 3);
            }
         }
      }
      image = "styles/" + this.theme + "/img/" + image;
      if (type === "C") {
         jConfirm(desc, title, lcallBackFunction);
      } else if (type === "P") {
         jPrompt(desc, " ", title, lcallBackFunction);
      } else {
         jAlert(desc, title, lcallBackFunction);
      }
      $('#popup_content.alert').css('background-image', 'url(' + image + ')');
   }, hide : function(id) {
      var obj = document.getElementById(id);
      if (!this.isNull(obj)) {
         $(obj).addClass("dispnone");
      }
   }, show : function(id) {
      var obj = document.getElementById(id);
      if (!this.isNull(obj)) {
         $(obj).removeClass("viewhidden dispnone");
      }
   }, getLabel : function(title) {
      var label = title
      if (!this.isNull(title)) {
         try {
            label = this.lits[this.language][title];
         } catch (e) {
            label = title;
         }
      }
      return label;
   }, replace : function(string, key, replaceData) {
      var lstring = string;
      lstring = lstring.replace(new RegExp('' + key + ''), replaceData);
      return lstring;
   }, replaceAll : function(string, key, replaceData) {
      var lstring = string;
      lstring = lstring.replace(new RegExp('' + key + '', 'g'), replaceData);
      return lstring;
   }, getMaskedValue : function(maskFormat, value) {
      var elemMaskFormatLength = maskFormat.length;
      var elemMaskFormat = maskFormat;
      var lmaskFormat = elemMaskFormat.replace(/[^\w\s]/gi, '');
      var lvalue = value;
      var j = 0, i = 0;
      var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
      if (value.length <= lmaskFormat.length) {
         while (i < elemMaskFormatLength) {
            if (isNaN(elemMaskFormat[j]) && !pattern.test(elemMaskFormat[j])) {
               j++;
               i++;
            } else if (pattern.test(elemMaskFormat[j])) {
               j++;
            } else {
               elemMaskFormat = elemMaskFormat.split('');
               elemMaskFormat[j] = lvalue[i];
               elemMaskFormat = elemMaskFormat.join('');
               j++;
               i++;
            }
         }
      } else {
         elemMaskFormat = lvalue;
      }
      return elemMaskFormat;
   }, isObjectEmpty : function(obj) {
      return jQuery.isEmptyObject(obj);
   }, changeStyleTheme : function(prevTheme) {
      if (this.theme != prevTheme) {
         var linkArr = $('link');
         for (var i = 0; i < linkArr.length; i++) {
            var lhref = linkArr[i].href;
            lhref = lhref.replace("styles/" + prevTheme, "styles/" + this.theme);
            $(linkArr[i]).attr('href', lhref);
         }
      }
   }, populateDropdown : function(obj, options) {
      var opt = "";
      this.clearHtml(obj.id);
      for (var i = 0; i < options.length; i++) {
         opt = document.createElement('option');
         opt.value = options[i].val;
         opt.innerHTML = options[i].desc;
         obj.appendChild(opt);
      }
   }, populateROSelect : function(obj, options) {
      var dd = "";
      var lclass = $($(obj).find("dd"))[0].classList;
      var classStr = lclass.toString();
      for (var i = 0; i < options.length; i++) {
         dd = document.createElement('dd');
         $(dd).attr('id', obj.id + "_" + i);
         $(dd).attr('value', options[i].val);
         $(dd).addClass(classStr);
         dd.innerHTML = options[i].desc;
         obj.appendChild(dd);
      }
   },
   //////Sort/Filter/Serach Table Functions to go Here..
   getRecordNumber : function(container, recNo) {
      var currPage = this.scrMetaData.containersMap[container].currPage;
      var pageSize = this.scrMetaData.containersMap[container].pageSize;
      var recNo = (pageSize * (currPage - 1)) + recNo;
      return recNo;
   }, selectAllRows : function(tableId) {
      var select = true;
      try {
         select = this.preSelectAll(tableId);
         if (this.isNull(select)) {
            select = true;
         }
      } catch (err) {
         select = true;
      }
      if (select) {
         var ltableId = '#' + tableId + ' .group-checkable';
         var status = $('#' + $(ltableId)[0].id)[0].checked;
         $(ltableId).prop('checked', status);
      }
      try {
         this.postSelectAll(tableId);
      } catch (err) {
      }
   }, unSelectAllRows : function(tableId) {
      var unSelect = true;
      try {
         unSelect = this.preUnSelectAll(tableId);
         if (this.isNull(unSelect)) {
            unSelect = true;
         }
      } catch (err) {
         unSelect = true;
      }
      if (unSelect) {
         var ltableId = '#' + tableId + ' .group-checkable';
         var status = $('#' + $(ltableId)[0].id)[0].checked;
         $(ltableId).prop('checked', !status);
      }
      try {
         this.postUnSelectAll(tableId);
      } catch (err) {
      }
   }, showPageStyle2Controls : function(container) {
      var st = 0;
      var le = 0;
      var tp = this.scrMetaData.containersMap[container].totalPages;
      var cp = this.scrMetaData.containersMap[container].currPage;
      ///// Control Buttons
      if (tp <= 0) {
         this.hide('fgp_' + container + '_first_btn');
         this.hide('fgp_' + container + '_prev_btn');
         this.hide('fgp_' + container + '_next_btn');
         this.hide('fgp_' + container + '_last_btn');
         ////Hide all five Buttons
      }
      else {
         this.show('fgp_' + container + '_first_btn');
         this.show('fgp_' + container + '_prev_btn');
         this.show('fgp_' + container + '_next_btn');
         this.show('fgp_' + container + '_last_btn');
         /////Adjust Page Numbers
         var ps = this.getElmValue('fgp_' + container + '_1_btn');
         var pe = this.getElmValue('fgp_' + container + '_5_btn');
         var ls = cp;
         if (cp > pe) {
            le = cp;
            ls = le - 4;
         } else if (cp < ps) {
            ls = cp;
            le = ls + 4;
         }
      }
      for (var i = 1; i <= 5; i++) {
         btnValue = i + ls - 1;
         this.setElemValue('fgp_' + container + '_' + i + '_btn', btnValue);
         if (cp > 0) {
            if (lp == btnValue) {
               ///Highlight the Btn
            }
            else {
               ///no
            }
         }
      }
   }, changeTypeToText : function(obj) {
      if ($(obj).hasClass("iosnumber")) {
         $(obj).attr('type', 'text');
      }
   }, addScriptsPath : function(scripts) {
      if(!this.isNull(scripts)){
         var count = scripts.length;
         for (var i = 0; i < count; i++) {
            if(scripts[i].substring(0,4) == "cwd/"){			 
				scripts[i] = this.getInfraPath() + "/" + scripts[i];
			}else{
				scripts[i] = this.getScriptsPath() + "/" + scripts[i];
			}
         }
      }
   }, setSelectedFileName : function(obj){
      var id = obj.id;
      var spanLi = $("#" + id).parent().parent().siblings().find('#selectedfiles');
      var result = $(obj)[0].files;
      for(var x = 0;x< result.length;x++){
         var file = result[x];
         // here are the files
         $(spanLi).append("<p>" + file.name +','+' '+"</p>");  
      }
   }, changeTypeToNumber : function(obj) {
       var val = this.getObjValue(obj);
       if (!this.isNull(val)) {
           val = this.unFormatNumber(val, this.thousandSep);
           obj.value = val;
       }
       $(obj).attr('type', 'number');
   }, onRowElmChange : function(obj) {
       if (!this.isNull($(obj).closest('tr'))) {
           var obj = obj.closest('tr');
           this.rowClicked(obj);
       }
   },
   ///////////////////////////////////////////////////////
   /////////////////////////Dom///////////////////////////
   ///////////////////////////////////////////////////////
   getID : function(elmData, recNo) {
      var id = elmData.id;
      if (!this.isNull(recNo)) {
         if (recNo != -1) {
            id = id + this.recSep + recNo;
         }
      }
      return id;
   }, getHtml : function(id) {
      return $("#" + id).html();
   }, setHtml : function(id, html) {
	  if(this.bindingEngine == "ANGULAR"){
		 angular.element(document).injector().invoke(function($compile) {
			 var loadDiv = $("#" + id);
			 loadDiv.html(html);
			 $compile(loadDiv.contents())(apz.data.angularAppScope);
			 apz.data.angularAppScope.data = apz.data.scrdata;
		 });
	  } else {
         if (apz.deviceType == "WIN8SURFACE" || apz.deviceType == "WIN8.1SURFACE" || apz.deviceType == "WIN8.1PHONE") {
            MSApp.execUnsafeLocalFunction(function() {
               $("#" + id).html(html);
            });
         } else {
	        $("#" + id).html(html);
         }
	  }
   }, clearHtml : function(id) {
      $("#" + id).empty();
   }, getElmValue : function(id) {
      return this.getObjValue(document.getElementById(id));
   }, getValue : function(elmData, recNo) {
      var id = this.getID(elmData, recNo);
      var value = "";
      var obj = document.getElementById(id);
      if (!this.isNull(obj)) {
         if (elmData.type == "GAUGE") {
            ///Get Value From Gauge
         }
         else if (!this.isNull(elmData.mask)) {
            value = $('#' + id).attr('apzvalue');
         } else {
            value = this.getObjValue(obj);
            ////Un Formatting to be Handled Here
            var dataType = elmData.dataType;
            var presetDataType = elmData.preset;
            var nodeId = elmData.nodeId;
            if (dataType == "NUMBER" || dataType == "INTEGER") {
               if (elmData.skipFormat == "N") {
                  value = this.unFormatNumber(value, this.decimalSep);
               }
            } else if (dataType == "TIME") {
               var serverTimeFormat = this.getServerTimeFormat(nodeId);
               value = this.formatTime(value, this.timeformat, serverTimeFormat);
            } else if (dataType == "DATETIME") {
               var serverDateTimeFormat = this.getServerDateTimeFormat(nodeId);
               value = this.formatDate(value, this.dateTimeFormat, serverDateTimeFormat);
            } else if (dataType == "DATE") {
               var serverdateFormat = this.getServerdateFormat(nodeId);
               value = this.formatDate(value, this.dateFormat, serverdateFormat);
            }
         }
         if (elmData.isArray == "Y") {
            if (value.indexOf(",") > 0) {
               value = value.split(",");
            } else {
               value = new Array(value);
            }
         }
      }
      return value;
   }, getObjValue : function(obj) {
      var value = "";
      var tagName = obj.tagName;
      var idType = $(obj).attr('apztype');
      if (tagName == "INPUT") {
         var id = obj.id;
         var type = $('#' + id).attr('type');
         if (type == "hidden") {
            if (obj.classList.contains("appzillon_date")) {
               try {
                  value = $('#' + id)[0].nextElementSibling.firstChild.data;
               } catch (e) {
                  value = "";
               }
            }
         } else if (type == "CHECKBOX") {
            var checkedAttr = $('#' + id).attr('checked');
            if (checkedAttr != null && checkedAttr != undefined) {
               value = $('#' + id).attr('checkedval');
            } else {
               value = $('#' + id).attr('uncheckedval');
            }
         } else {
            value = obj.value;
         }
      } else if ((tagName == "LI") || (tagName == "DIV")) {
         if (idType == "toggleswitch") {
            var id0 = obj.id + '0';
            var id1 = obj.id + '1';
            if ($('#' + id0)[0].checked) {
               value = $('#' + id0).val();
            } else {
               value = $('#' + id1).val();
            }
         } else if (idType == "radiogroup") {
            var id = obj.id;
            $("#" + id).find('input').each(function() {
               if ($(this).attr("type") == "radio") {
                  var checked = $(this).is(":checked");
                  if (checked) {
                     value = $(this).val();
                  }
               }
            });
         } else {
            var id = obj.id;
            var span = $('span', $('#' + id));
            for (var i = 0; i < span.length; i++) {
               var testId = span[i].id;
               if (!this.isNull(testId)) {
                  var checked = $('#' + testId)[0].checked;
                  if (checked) {
                     value = $('#' + testId)[0].value;
                  }
               }
            }
         }
      } else if (tagName == "SELECT") {
         if (obj.selectedIndex >= 0) {
            value = obj.options[obj.selectedIndex].value;
            // Nagaraj Changes
         }
      } else if (tagName == "TEXTAREA") {
         value = obj.value;
      } else if (tagName == "DD") {
         value = obj.innerHTML;
      } else if (tagName == "DL") {
         var ddList = $(obj).find('dd');
         if (ddList.length > 0) {
            for (var i = 0; i < ddList.length; i++) {
               if (!$(ddList[i]).hasClass('dispnone')) {
                  value = $(ddList[i]).attr('value');
                  break;
               }
            }
         }
      } else if (tagName == "P") {
         value = obj.innerHTML;
      } else if (tagName == "SPAN") {
         value = obj.innerHTML;
      } else if (tagName == "A") {
         value = obj.innerHTML;
      } else if (tagName == "IMG") {
         var source = obj.src;
         if (source != null && source != "" && (source.indexOf('.') == -1)) {
            value = source.substr(22, source.length);
         } else {
            value = source
         }
      } else if (tagName == "PROGRESS") {
         value = obj.value;
      }
      return value;
   }, setElmValue : function(id) {
      this.setObjValue(document.getElementById(id));
   }, setValue : function(elmData, recNo, value) {
      var id = this.getID(elmData, recNo);
      var obj = document.getElementById(id);
      if (this.isNull(value)) {
         value = "";
      }
      if (!this.isNull(obj)) {
         if (elmData.type == "GAUGE") {
            var myObj = this;
            requirejs([this.getInfraPath() + "/appzillon/gauges.js"], function() {
               var gaugeObj = myObj.scrMetaData.gaugesMap[id];
               try {
                  var gauges = new Apz.Gauges(myObj);
                  gauges.paintGauge(gaugeObj);
               } catch(e) {
                  console.log("Problems with Gauges Library");
               }
            });
         } else if (!this.isNull(elmData.mask)) {
            $('#' + id).attr("apzvalue", value);
            value = this.getMaskedValue(elmData.mask, value);
         } else {
            // //Formatting to be Handled Here...
            var dataType = elmData.dataType;
            if (dataType != "STRING") {//Bug 4404 Masking Changes
               var nodeId = elmData.nodeId;
               var presetDataType = elmData.preset;
               if ((dataType == "NUMBER" || dataType == "INTEGER")) {
                  if (elmData.skipFormat == "N") {
                     var decPoints = this.getDecimalPoints(elmData, recNo);
                     value = this.formatNumber(value, this.decimalSep, decPoints, this.numberMask, elmData.displayAsLiteral);
                  }
               } else if (dataType == "TIME") {
                  var serverTimeFormat = this.getServerTimeFormat(nodeId);
                  value = this.formatTime(value, serverTimeFormat, this.timeFormat);
               } else if (dataType == "DATETIME") {
                  var serverDateTimeFormat = this.getServerDateTimeFormat(nodeId);
                  value = this.formatDate(value, serverDateTimeFormat, this.dateTimeFormat);
               } else if (dataType == "DATE") {
                  var ltype = $('#' + id).attr('type');
                  var serverdateFormat = this.getServerdateFormat(nodeId);
                  value = this.formatDate(value, serverdateFormat, this.dateFormat);
               }
            }
            //// To clear value for the Image data model field
            if (obj.tagName == "IMG") {
               if ((this.isNull(elmData.nodeId)) && (this.isNull(elmData.name))) {
                  value = obj.getAttribute('src');
               }
            }
            if (!this.isNull(elmData.mask)) {
               $('#' + id).attr("apzvalue", value);
               //// Set Actual value to Obj
               value = this.getMaskedValue(elmData.mask, value);
            }
         }
         //// APZFIX
         if (elmData.isArray == "Y") {
            value = value.toString();
         }
         if (elmData.type != "GAUGE") {
            this.setObjValue(obj, value);
         }
      }
   }, setObjValue : function(obj, value) {
      var tagName = obj.tagName;
      var idType = obj.type;
      if (value === null) {
         value = "";
      }
      if (tagName == "INPUT") {
         var id = obj.id;
         var type = $('#' + id).attr('type');
         if (type == "hidden") {
            if (obj.classList.contains("appzillon_date")) {
               $('#' + id)[0].nextElementSibling.innerHTML = value;
            }
         } else if (type == "CHECKBOX") {
            var checkedVal = $('#' + id).attr('checkedval');
            var uncheckedVal = $('#' + id).attr('uncheckedval');
            var indeterminateVal = $('#' + id).attr('indeterminateval');
            if (value == checkedVal) {
               obj.value = checkedVal;
               $('#' + id).attr('checked', '');
            } else if (value == indeterminateVal) {
               obj.value = indeterminateVal;
               obj.indeterminate = true;
            } else {
               obj.value = uncheckedVal;
               $('#' + id).removeAttr('checked');
            }
            var grpId = id + "_ctrl_grp_div";
            if ($("#" + grpId).hasClass('tostyle')) {//// APZFIX
               $('#' + id).uniform();
            }
         } else if (type != "file") {
            this.changeTypeToText(obj);
            obj.value = value;
         }
      } else if (((tagName == "LI") || (tagName == "DIV")) && idType == "toggleswitch") {
         var id0 = obj.id + '0';
         var id1 = obj.id + '1';
         if ($('#' + id0).val() == value) {
            $('#' + id0)[0].checked = true;
            $('#' + id1)[0].checked = false;
         } else {
            $('#' + id1)[0].checked = true;
            $('#' + id0)[0].checked = false;
         }
      } else if ((tagName == "LI") || (tagName == "DIV")) {
         var lid = obj.id;
         $('#' + lid).attr('value', value);
         var id = lid + '_option_' + value;
         $('#' + id).attr('checked', true);
         var grpId = lid + "_ctrl_grp_div";
         if ($("#" + grpId).hasClass('tostyle')) {////APZFIX looping for all the  options
            $('#' + lid).find('input[type="radio"]').each(function() {
               $('#' + this.id).uniform();
            });
         }
      } else if (tagName == "SELECT") {
         var noOfElem = obj.options.length;
         for (var i = 0; i < noOfElem; i++) {
            if (obj.options[i].value == value) {
               obj.selectedIndex = i;
            }
         }
         if (!this.isNull(obj.getAttribute("onChange")) && !this.isNull(value)) {
            $("#" + obj.id).trigger("change")
         }
      } else if (tagName == "TEXTAREA") {
         obj.value = value;
      } else if (tagName == "DD") {
         obj.innerHTML = value;
      } else if (tagName == "DL") {
         var ddList = $(obj).find('dd');
         if (ddList.length > 0) {
            ddList.addClass('dispnone');
            for (var i = 0; i < ddList.length; i++) {
               if ($(ddList[i]).attr('value') == value) {
                  $(ddList[i]).removeClass('dispnone');
                  break;
               }
            }
         }
      } else if (tagName == "P") {
         obj.innerHTML = value;
      } else if (tagName == "SPAN") {
         obj.innerHTML = value;
      } else if (tagName == "A") {
         obj.innerHTML = value;
      } else if (tagName == "IMG") {
         var myStatus;
         if (value != null && value != "" && (value.indexOf('.') == -1)) {
            myStatus = value.indexOf("data:image/png;base64,");
            if (myStatus == -1) {
               myStatus = value.indexOf("data:image/jpg;base64,");
               if (myStatus == -1) {
                  obj.src = "data:image/png;base64," + value;
               } else {
                  obj.src = value;
               }
            } else {
               obj.src = value;
            }
         } else {
            if (value != null && value != "") {
               var currTheme = this.theme;
               myStatus = value.indexOf("styles/" + currTheme + "/img");
               if (!this.Null(myStatus) && myStatus != -1) {
                  obj.src = value;
               } else {
                  obj.src = this.getStylesPath() + currTheme + "/img/" + value;
               }
            } else {
               obj.src = value;
            }
         }
      } else if (tagName == "PROGRESS") {
         obj.value = value;
      }
   },
   //////////////////////////////////////////////////////////////
   ///////////////////Loader ////////////////////////////////////
   //////////////////////////////////////////////////////////////
   getHTMLFileName : function(scr, lo) {
      return scr + "_" + lo + "_" + this.language + ".html";
   }, getIfaceName : function(iface) {
      var len = iface.length;
      if (len > 4) {
         var end4 = iface.substr(len - 4);
         var end2 = iface.substr(len - 2);
         if ((end4 == "_Req") || (end4 == "_Res")) {
            iface = iface.substr(0, len - 4);
         } else if ((end4 == "_i") || (end4 == "_o")) {
            iface = iface.substr(0, len - 2);
         } else {
            // //Could be Database..
            var ind = iface.lastIndexOf("_");
            if (ind >= 0) {
               var action = iface.substring(lind + 1);
               if (!this.isNull(action)) {
                  if ((action == "Query") || (action == "New") || (action == "Modify") || (action == "Delete") || (action == "Authorize")) {
                     iface = iface.substring(0, ind);
                  }
               }
            }
         }
      }
      return iface;
   }, getLayout : function(scr) {
      return this.loMap[scr][this.deviceGroup][this.orientation];
   }, initScrDef : function(scrMeta) {
      ////Nodes
      var noOfNodes = scrMeta.nodes.length;
      for (var n = 0; n < noOfNodes; n++) {
         if (scrMeta.nodes[n].relType == "1:N") {
            scrMeta.nodes[n].currRec = -1;
         } else {
            scrMeta.nodes[n].currRec = 0;
         }
      }
      ////Containers
      var noOfContainers = scrMeta.containers.length;
      for (var c = 0; c < noOfContainers; c++) {
         scrMeta.containers[c].pageRows = 0;
         scrMeta.containers[c].totalRecs = 0;
         scrMeta.containers[c].currRec = -1;
         scrMeta.containers[c].currPage = 0;
         scrMeta.containers[c].totalPages = 0;
      }
   }, appendScrDef : function(parentMeta, childMeta) {
      var noOfChildIfaces = childMeta.ifaces.length;
      var noOfChildNodes = childMeta.nodes.length;
      var noOfChildCntnrs = childMeta.containers.length;
      var noOfChildGroups = childMeta.groups.length;
      var noOfParentIfaces = parentMeta.ifaces.length;
      var noOfParentNodes = parentMeta.nodes.length;
      var noOfParentCntnrs = parentMeta.containers.length;
      var noOfParentGroups = parentMeta.groups.length;
      for (var i = 0; i < noOfChildCntnrs; i++) {
         var containerName = childMeta.containers[i].name;
         parentMeta.containers[noOfParentCntnrs] = childMeta.containers[i];
         parentMeta.containersmap[containerName] = childMeta.containers[i];
         noOfParentCntnrs++;
      }
      for (var i = 0; i < noOfChildIfaces; i++) {
         var lifacename = childMeta.ifaces[i].name;
         parentMeta.ifaces[noOfParentIfaces] = childMeta.ifaces[i];
         parentMeta.ifacesMap[lifacename] = childMeta.ifaces[i];
         noOfParentIfaces++;
      }
      for (var i = 0; i < noOfChildGroups; i++) {
         var lgroupname = childMeta.groups[i].name;
         parentMeta.groups[noOfParentGroups] = childMeta.groups[i];
         parentMeta.groupsmap[lgroupname] = childMeta.groups[i];
         noOfParentGroups++;
      }
      for (var i = 0; i < noOfChildNodes; i++) {
         var lnodename = childMeta.nodes[i].name;
         parentMeta.nodes[noOfParentNodes] = childMeta.nodes[i];
         parentMeta.nodes[lnodename] = childMeta.nodes[i];
         noOfParentNodes++;
      }
   },
   ////Get Device Info (NS CB)
   loadDeviceInfo : function(info) {
      this.deviceId = info.deviceId;
      this.deviceOs = info.deviceOs;
      this.deviceType = info.deviceType;
      this.screenSize = info.screenSize;
      this.screenPpi = info.screenPpi;
      this.deviceGroup = info.deviceGroup;
      this.orientation = info.orientation;
      this.lockRotation = info.lockRotation;
      ////Call Process Callback
      //this.processCB(res);
   },
   ////User Preferences(NS CB)
   loadUserPrefs : function(res) {
      if (res) {
         if (res.userPrefs) {
            var prefs = res.userPrefs;
            this.dateFormat = prefs.dateFormat ? prefs.dateFormat : "dd-MMM-yyyy";
            this.dateTimeFormat = prefs.dateTimeFormat ? prefs.dateTimeFormat : "dd-MMM-yyyy  HH-mm-ss";
            this.timeFormat = prefs.timeFormat ? prefs.timeFormat : "HH-mm-ss";
            this.dfltDecimals = prefs.dfltDecimals;
            this.decimalSep = prefs.decimalSep;
            this.thousandSep = prefs.thousandSep;
            this.numberMask = prefs.numberMask;
            this.theme = prefs.theme;
            this.language = prefs.language;
            this.enableAnimations = true;
         }
      }
      ////Call Process Callback
      //this.processCB(res);
   }, loadAppProps : function(res) {
      var props = res.props;
      this.appId = props.appId;
      this.version = props.version;
      this.expiryDate = props.expiryDate;
      this.serverToken = props.serverToken;
      this.authenticationType = props.authenticationType;
      this.otpReqd = this.getBoolean(props.otpReqd);
      this.otaReqd = this.getBoolean(props.otaReqd);
      this.serverUrl = props.serverUrl;
      this.trackLocation = this.getBoolean(props.trackLocation);
      this.serverToken = props.serverToken;
      this.encryptionKey = props.encryptionKey;
      this.enableAnimations = this.getBoolean(props.enableAnimations);
      this.auditLogReqd = this.getBoolean(props.auditLogReqd);
      this.logLevel = props.logLevel;
      this.sendLog = props.sendLog;
      this.noOfLogLines = props.noOfLogLines;
      this.firstPage = props.firstPage;
      this.firstPageLayout = props.firstPageLayout;
      ////Defaults
      try
      {
         this.animationsSupported = Modernizr.cssanimations;
      } catch (e) {
         this.animationsSupported = false;
      }
      if (!this.animationsSupported) {
         this.enableAnimations = false;
      }
   },
   //////Project Definition
   loadProjDef : function(params) {
      def = JSON.parse(params.content);
      ///App Properties
      this.loadAppProps(def);
      ///User Preferences
      this.loadUserPrefs(def);
      this.messages = def.msgs[this.language];
      this.lovs = def.lovs;
      this.lits = def.lits[this.language];
      this.ccys = def.ccys;
      this.prjScripts = def.scripts;
      ////add Path
      this.addScriptsPath(this.prjScripts);

      ////Declare Process for User Prefrences
      var proc = {};
      proc.threads = [];
      proc.id = "USERPREFLOAD";
      var params = {};
      //////////Get User Preferences////////////////////////
      params.id = "USERPREFS";
      params.runnerObj = this.ns;
      params.runner = this.ns.getUserPrefs;
      params.callBack = this.loadUserPrefs;
      params.callBackObj = this;
      proc.threads[proc.threads.length] = params;
      this.startProc(proc);

      ////Layout Mapping
      this.loMap = def.loMap;
   }, storeIfaceDef : function(iface, def) {
      this.ifacesMap[iface] = def;
   }, storeScrDef : function(scr, lo, def) {
      var key = scr + this.idSep + lo;
      this.scrDefsMap[key] = def;
   }, storeScrHtml : function(scr, lo, html) {
      var key = this.getHTMLFileName(scr, lo);
      this.scrHtmls[key] = html;
   },
   /////Load Interface Definition
   loadIfaceDef : function(params) {
      def = JSON.parse(params.content);
      var getArrayMember = function(obj, ind, def) {
         var val = def;
         if (obj) {
            val = obj[ind];
         }
         return val;
      };
      var ifaceObj = {};
      ifaceObj.extMap = {};
      iface = def.name;
      ifaceObj.name = def.name;
      ifaceObj.type = def.type;
      ifaceObj.dateFormat = def.dateFormat;
      ifaceObj.dateTimeFormat = def.dateTimeFormat;
      ifaceObj.timeFormat = def.timeFormat;
      ifaceObj.offline = def.offline;
      ifaceObj.amountMask = def.amountMask;
      ifaceObj.decimalSep = def.decimalSep;
      ifaceObj.thousandSep = def.thousandSep;
      ifaceObj.session = def.session;
      ifaceObj.encrypt = this.getBoolean(def.encrypt);
      ifaceObj.targetNs = def.targetNs;
      ifaceObj.endPointUrl = def.endPointUrl;
      ifaceObj.noOfReqNodes = def.noOfReqNodes;
      ifaceObj.noOfResNodes = def.noOfResNodes;
      ifaceObj.noOfFaultNodes = def.noOfReqNodes;
      ifaceObj.correctReq = this.getBoolean(def.correctReq);
      ifaceObj.correctRes = this.getBoolean(def.correctRes);
      ifaceObj.nsList = def.nsList;
      ifaceObj.ignoreNs = def.ignoreNs;
      var eCntr = 0;
      var noOfNodes = def.nodes.length;
      ifaceObj.nodes = [];
      ifaceObj.nodesMap = [];
      ifaceObj.elms = [];
      ifaceObj.elmsMap = [];
      if (noOfNodes > 0) {
         for (var n = 0; n < noOfNodes; n++) {
            var dml = "REQ";
            if (n >= def.noOfReqNodes) {
               dml = "RES";
            }
            if (def.type == "DATABASE") {
               dml = "";
            }
            ////Init
            var nodeObj = {};
            nodeObj.dml = dml;
            ////Node Properties
            nodeObj.name = def.nodes[n];
            nodeObj.id = this.getNodeId(iface, dml, nodeObj.name);
            nodeObj.ifaceName = iface;
            nodeObj.ifaceId = this.getIfaceIdFromDml(iface, dml);
            nodeObj.extName = getArrayMember(def.nExtName, n, "");
            nodeObj.parent = this.getNodeId(iface, dml, getArrayMember(def.nParent, n, ""));
            nodeObj.multiRec = getArrayMember(def.nMultiRec, n, "N");
            nodeObj.mrParent = this.getNodeId(iface, dml, getArrayMember(def.nMrParent, n, ""));
            nodeObj.relType = getArrayMember(def.nRelType, n, "1:1");
            nodeObj.ns = getArrayMember(def.nNs, n, "");
            nodeObj.nsAlias = getArrayMember(def.nNsAlias, n, "");
            nodeObj.isoTags = getArrayMember(def.nIsoTags, n, "");
            var parents = getArrayMember(def.nParents, n, "");
            nodeObj.parents = [];
            var nodeExtKey = "";
            if (!this.isNull(parents)) {
               var arr = parents.split("~");
               for (var s = 0; s < arr.length; s++) {
                  var pnrtId = this.getNodeId(iface, dml, arr[s]);
                  nodeObj.parents[s] = pnrtId;
                  if (dml == "RES") {
                     var prntExtName = ifaceObj.nodesMap[pnrtId].extName;
                     if (this.isNull(nodeExtKey)) {
                        nodeExtKey = prntExtName;
                     } else {
                        nodeExtKey = nodeExtKey + "~" + prntExtName;
                     }
                  }
               }
               ////Add Current Node aswell..
               if (dml == "RES") {
                  if (this.isNull(nodeExtKey)) {
                     nodeExtKey = nodeObj.extName;
                  } else {
                     nodeExtKey = nodeExtKey + "~" + nodeObj.extName;
                  }
                  ifaceObj.extMap[nodeExtKey] = nodeObj.name;
               }
            } else {
               ////Case of DML Root Node
               ifaceObj.extMap[nodeObj.name] = nodeObj.name;
            }
            var childs = getArrayMember(def.nChilds, n, "");
            nodeObj.childs = [];
            if (!this.isNull(childs)) {
               var arr = childs.split("~");
               for (var s = 0; s < arr.length; s++) {
                  nodeObj.childs[s] = this.getNodeId(iface, dml, arr[s]);
               }
            }
            ////Elements
            nodeObj.elms = [];
            nodeObj.elmsMap = [];
            var noOfNodeElms = getArrayMember(def.noOfNodeElms, n, 0);
            for (var e = eCntr; e < (eCntr + noOfNodeElms); e++) {
               var elmObj = {};
               elmObj.name = def.elms[e];
               elmObj.id = this.getElmId(nodeObj.id, elmObj.name);
               elmObj.dml = dml;
               elmObj.nodeId = nodeObj.id;
               elmObj.nodeName = nodeObj.name;
               elmObj.ifaceName = iface;
               elmObj.ifaceId = nodeObj.ifaceId;
               elmObj.isArray = nodeObj.isArray;
               elmObj.extName = getArrayMember(def.eExtName, e, "");
               elmObj.dataType = getArrayMember(def.eDataType, e, "STRING");
               elmObj.relNode = getArrayMember(def.eRelNode, e, "");
               elmObj.relElm = getArrayMember(def.eRelElm, e, "");
               elmObj.cents = getArrayMember(def.eCents, e, "N");
               elmObj.pad = getArrayMember(def.ePad, e, "N");
               elmObj.padChar = getArrayMember(def.ePadChar, e, "");
               elmObj.mand = getArrayMember(def.eMand, e, "N");
               elmObj.pattern = getArrayMember(def.ePattern, e, "");
               elmObj.maxDec = this.getInt(getArrayMember(def.eMaxDec, e, 9));
               elmObj.lenType = getArrayMember(def.eLenTyp, e, "V");
               elmObj.maxLen = this.getInt(getArrayMember(def.eMaxLen, e, 0));
               elmObj.minLen = this.getInt(getArrayMember(def.eMinLen, e, 0));
               elmObj.maxVal = this.getFloat(getArrayMember(def.eMaxVal, e, 0));
               elmObj.minVal = this.getFloat(getArrayMember(def.eMinVal, e, 0));
               elmObj.ns = getArrayMember(def.eNs, e, "");
               elmObj.nsAlias = getArrayMember(def.eNsAlias, e, "");
               ////Ext Map
               if (dml == "RES") {
                  var elmExtKey = nodeExtKey + "~" + elmObj.extName;
                  ifaceObj.extMap[elmExtKey] = elmObj.name;
               }
               ///Add to Arrays
               nodeObj.elms[e - eCntr] = elmObj;
               nodeObj.elmsMap[elmObj.id] = elmObj;
               ifaceObj.elms[e] = elmObj;
               ifaceObj.elmsMap[elmObj.id] = elmObj;
            }
            eCntr = eCntr + noOfNodeElms;
            ////Add to Nodes Array
            ifaceObj.nodes[n] = nodeObj;
            ifaceObj.nodesMap[nodeObj.id] = nodeObj;
         }
      }
      ////Add to Store
      this.storeIfaceDef(iface, ifaceObj);
   }, loadScrDef : function(params) {
      def = JSON.parse(params.content);
      var scr = params.scr;
      var lo = params.lo;
      var type = params.type;
      /////Initialize
      var scrMeta = {};
      scrMeta.htmls = [];
      ////Counters
      var nodeCntr = 0;
      var elmCntr = 0;
      var elmLovRfCntr = 0;
      var elmLovBvCntr = 0;
      var noOfIfaces = 0;
      if (def.ifaces) {
         noOfIfaces = def.ifaces.length;
      }
      ////Populate Ifaces and Nodes
      scrMeta.ifaces = [];
      scrMeta.ifacesMap = [];
      scrMeta.nodes = [];
      scrMeta.nodesMap = [];
      scrMeta.scripts = def.scripts;
      ///add Path
      this.addScriptsPath(scrMeta.scripts);
      for (var i = 0; i < noOfIfaces; i++) {
         var ifaceId = def.ifaces[i];
         var ifaceName = this.getIfaceName(ifaceId);
         var ifaceObj = this.ifacesMap[ifaceName];
         ////Add Iface
         if (!this.containsKey(scrMeta.ifacesMap, ifaceName)) {
            var noOfScrIfaces = scrMeta.ifaces.length;
            scrMeta.ifaces[noOfScrIfaces] = ifaceObj;
            scrMeta.ifacesMap[ifaceName] = ifaceObj;
            var noOfScrNodes = scrMeta.nodes.length;
            var noOfIfaceNodes = ifaceObj.nodes.length;
            for (var n = 0; n < noOfIfaceNodes; n++) {
               var nodeObj = ifaceObj.nodes[n];
               scrMeta.nodes[noOfScrNodes] = nodeObj;
               scrMeta.nodesMap[nodeObj.id] = nodeObj;
               noOfScrNodes = noOfScrNodes + 1;
            }
         }
      }
      //////Containers
      scrMeta.containers = [];
      scrMeta.containersMap = [];
      scrMeta.elms = [];
      scrMeta.elmsMap = [];
      var noOfCntnrs = 0;
      if (!this.isNull(def.containers)) {
         if (!this.isNull(def.containers.name)) {
            noOfCntnrs = def.containers.name.length;
         }
      }
      for (var c = 0; c < noOfCntnrs; c++) {
         var cntnrObj = {};
         cntnrObj.name = def.containers.name[c];
         cntnrObj.ui = def.containers.ui[c];
         cntnrObj.id = def.containers.name[c];
         cntnrObj.type = def.containers.type[c];
         cntnrObj.multiRec = def.containers.multiRec[c];
         cntnrObj.paginationStyle = def.containers.pgStyle[c];
         cntnrObj.readOnly = def.containers.ro[c];
         cntnrObj.pageSize = def.containers.pgSize[c];
         var childs = def.containers.childs[c];
         cntnrObj.childs = childs.split("~");
         if (!this.isNull(childs)) {
            cntnrObj.childs = childs.split("~");
         } else {
            cntnrObj.childs = [];
         }
         ////Add to Containers Array
         scrMeta.containers[c] = cntnrObj;
         scrMeta.containersMap[cntnrObj.name] = cntnrObj;
         /////Nodes
         var noOfCntrNodes = def.containers.noOfNodes[c];
         cntnrObj.nodes = [];
         if (noOfCntrNodes > 0) {
            for (var n = nodeCntr; n < (nodeCntr + noOfCntrNodes); n++) {
               var nodeId = def.containers.nodes[n];
               cntnrObj.nodes[n - nodeCntr] = nodeId;
            }
            nodeCntr = nodeCntr + noOfCntrNodes;
         }
         ////Elements
         var noOfCntrElms = def.containers.noOfElms[c];
         cntnrObj.elms = [];
         cntnrObj.elmsMap = [];
         if (noOfCntrElms > 0) {
            for (var e = elmCntr; e < (elmCntr + noOfCntrElms); e++) {
               ////Add to Screen Elements
               var elmObj = {};
               var elmId = def.containers.elms[e];
               var elmType = def.containers.elmType[e];
               var uiElm = def.containers.eUi[e];
               ////Add to Container/Screen Elements Array
               cntnrObj.elms[e - elmCntr] = elmObj;
               cntnrObj.elmsMap[elmId] = elmObj;
               scrMeta.elms[e] = elmObj;
               scrMeta.elmsMap[elmId] = elmObj;
               ////Layout Properties
               elmObj.id = elmId;
               elmObj.name = elmId;
               elmObj.container = cntnrObj.name;
               elmObj.type = elmType;
               elmObj.ui = uiElm;
               elmObj.readOnly = def.containers.eRo[e];
               elmObj.mask = def.containers.eMask[e];
               elmObj.runtimeFormat = def.containers.eRtFmt[e];
               elmObj.skipFormat = def.containers.eSkipFmt[e];
               elmObj.displayAsLiteral = def.containers.eLiteral[e];
               elmObj.lovId = def.containers.eLovId[e];
               elmObj.lovWidthClass = def.containers.eLovWidth[e];
               elmObj.lovMinWidth = def.containers.eLovMinWidth[e];
               var noOfLovRf = def.containers.noOfeLovRf[e];
               elmObj.returnFields = [];
               if (noOfLovRf > 0) {
                  for (var rf = elmLovRfCntr; rf < (elmLovRfCntr + noOfLovRf); rf++) {
                     elmObj.returnFields.push(def.containers.eLovRf[rf]);
                  }
                  elmLovRfCntr = elmLovRfCntr + noOfLovRf;
               }
               var noOfLovBv = def.containers.noOfeLovBv[e];
               elmObj.bindVariables = [];
               if (noOfLovBv > 0) {
                  for (var bv = elmLovBvCntr; bv < (elmLovBvCntr + noOfLovBv); bv++) {
                     elmObj.bindVariables.push(def.containers.eLovBv[bv]);
                  }
               }
               elmLovBvCntr = elmLovBvCntr + noOfLovBv;
               if (uiElm == "Y") {
                  elmObj.name = elmId;
               } else {
                  ////Copy Attributes From Interface Definition
                  var elmDet = elmId.split(this.idSep);
                  if (elmDet.length >= 4) {
                     var lelmcntnrObjname = elmDet[0];
                     var ifaceElmObj = this.ifacesMap[lelmcntnrObjname].elmsMap[elmId];
                     elmObj.name = ifaceElmObj.name;
                     elmObj.id = ifaceElmObj.id;
                     elmObj.nodeName = ifaceElmObj.nodeName;
                     elmObj.nodeId = ifaceElmObj.nodeId;
                     elmObj.ifaceName = ifaceElmObj.ifaceName;
                     elmObj.ifaceId = ifaceElmObj.ifaceId;
                     elmObj.dataType = ifaceElmObj.dataType;
                     elmObj.relNode = ifaceElmObj.relNode;
                     elmObj.relElm = ifaceElmObj.relElm;
                     elmObj.cents = ifaceElmObj.cents;
                     elmObj.pad = ifaceElmObj.pad;
                     elmObj.padChar = ifaceElmObj.padChar;
                     elmObj.mand = ifaceElmObj.mand;
                     elmObj.pattern = ifaceElmObj.pattern;
                     elmObj.maxDec = ifaceElmObj.maxDec;
                     elmObj.lenType = ifaceElmObj.lenType;
                     elmObj.maxLen = ifaceElmObj.maxLen;
                     elmObj.minLen = ifaceElmObj.minLen;
                     elmObj.maxVal = ifaceElmObj.maxVal;
                     elmObj.minVal = ifaceElmObj.minVal;
                  }
               }
            }
            elmCntr = elmCntr + noOfCntrElms;
         }
      }
      ///////Charts
      scrMeta.charts = [];
      scrMeta.chartsMap = [];
      var noOfCharts = 0;
      if (!this.isNull(def.charts)) {
         noOfCharts = def.charts.length;
      }
      if (noOfCharts > 0) {
         for (var c = 0; c < noOfCharts; c++) {
            var chartObj = def.charts[c];
            chartObj.type = "CHART";
            chartObj.id = chartObj.name;
            ////Add to Array
            scrMeta.charts[c] = chartObj;
            scrMeta.chartsMap[chartObj.name] = chartObj;
            ////Add Nodes
            if (!this.isNull(chartObj.nodes)) {
               var noOfChartNodes = chartObj.nodes.length;
               if (noOfChartNodes > 0) {
                  for (var n = 0; n < noOfChartNodes; n++) {
                     var nodeId = chartObj.nodes[n];
                     cntnrObj.nodes[n] = nodeId;
                  }
               }
            }
            ////Add to Containers
            scrMeta.containers[noOfCntnrs] = chartObj;
            scrMeta.containersMap[chartObj.name] = chartObj;
            noOfCntnrs = noOfCntnrs + 1;
         }
      }
      ////Gauges
      scrMeta.gauges = [];
      scrMeta.gaugesMap = [];
      var noOfGauges = 0;
      if (!this.isNull(def.gauges)) {
         noOfGauges = def.gauges.length;
      }
      if (noOfGauges > 0) {
         for (var c = 0; c < noOfGauges; c++) {
            var gaugeObj = def.gauges[c];
            gaugeObj.type = "GAUGE";
            gaugeObj.id = gaugeObj.name;
            ////Add to Array
            scrMeta.gauges[c] = gaugeObj;
            scrMeta.gaugesMap[gaugeObj.name] = gaugeObj;
            if (!this.isNull(gaugeObj.nodes)) {
               var noOfGaugeNodes = gaugeObj.nodes.length;
               if (noOfGaugeNodes > 0) {
                  for (var n = 0; n < noOfGaugeNodes; n++) {
                     var nodeId = gaugeObj.nodes[n];
                     cntnrObj.nodes[n] = nodeId;
                  }
               }
            }
            ////Add to Containers
            if (gaugeObj.widgetcategory == "CONTAINER") {
               scrMeta.containers[noOfCntnrs] = gaugeObj;
               scrMeta.containersMap[gaugeObj.name] = gaugeObj;
               noOfCntnrs = noOfCntnrs + 1;
            }
         }
      }
      ////Groups
      scrMeta.groups = [];
      scrMeta.groupsMap = [];
      var groupnodeCntr = 0;
      var groupContainerCntr = 0;
      var noOfGroups = 0;
      if (!this.isNull(def.groups) && !this.isNull(def.groups.name)) {
         noOfGroups = def.groups.name.length;
      }
      for (var g = 0; g < noOfGroups; g++) {
         var groupObj = {};
         groupObj.name = def.groups.name[g];
         /////Nodes
         var noOfGroupNodes = def.groups.noOfNodes[g];
         groupObj.nodes = [];
         groupObj.nodesMap = [];
         if (noOfGroupNodes > 0) {
            var i = 0;
            for (var n = groupnodeCntr; n < (groupnodeCntr + noOfGroupNodes); n++) {
               var grpNode = def.groups.nodes[n];
               groupObj.nodes[i] = grpNode;
               groupObj.nodesMap[grpNode] = grpNode;
               ////Set Group for Node
               scrMeta.nodesMap[grpNode].group = groupObj.name;
               i = i + 1;
            }
            groupnodeCntr = groupnodeCntr + noOfGroupNodes;
         }
         /////Containers
         var noOfGroupContainers = def.groups.noOfContainers[g];
         groupObj.containers = [];
         groupObj.containersMap = [];
         if (noOfGroupContainers > 0) {
            for (var c = groupContainerCntr; c < (groupContainerCntr + noOfGroupContainers); c++) {
               var grpContainer = def.groups.containers[c];
               groupObj.containers[c - groupContainerCntr] = grpContainer;
               groupObj.containersMap[grpContainer] = grpContainer;
               ////Set Group for Container
               scrMeta.containersMap[grpContainer].group = groupObj.name;
            }
            groupContainerCntr = groupContainerCntr + noOfGroupContainers;
         }
         /////Add to Group Array
         scrMeta.groups[g] = groupObj;
         scrMeta.groupsMap[groupObj.name] = groupObj;
      }
      ///////UI Inits
      scrMeta.uiInits = def.uiInits;
      ////INitialize
      this.initScrDef(scrMeta);
      ////Add to Store
      this.storeScrDef(scr, lo, scrMeta);
   },
   /////Project Loading..
   loadProject : function() {
      ///Start Loader
      this.startLoader();
      ////Declare Process
      var proc = {};
      proc.threads = [];
      proc.id = "PROJECTLOAD";
      proc.callBack = this.projectLoaded;
      proc.callBackObj = this;
      var params = null;
      ///////////Get Device Info///////////////////////////
      params = {};
      params.id = "DEVICEINFO";
      params.runnerObj = this.ns;
      params.runner = this.ns.getDeviceInfo;
      params.callBack = this.loadDeviceInfo;
      params.callBackObj = this;
      proc.threads[proc.threads.length] = params;
      //////////Get User Preferences////////////////////////
      params = {};
      params.id = "USERPREFS";
      params.runnerObj = this.ns;
      params.runner = this.ns.getUserPrefs;
      params.callBack = this.loadUserPrefs;
      params.callBackObj = this;
      proc.threads[proc.threads.length] = params;
      /*
      //////////Get App Properties////////////////////////
      params = {};
      params.id = "APPPROPS";
      params.runnerObj = this;
      params.runner = this.getFile;
      params.callBack = this.loadAppProps;
      params.callBackObj = this;
      params.path = this.getConfigPath() + "/" + "appprops.json";
      params.async = true;
      proc.threads[proc.threads.length] = params;
      */
      ///////////Load Process Definition////////////////////
      if (Apz.mcaApp) {
         this.mca.getProcessJson(proc);
      }
	  ///////////Initialize Angular Directives////////////////////
	  if(this.bindingEngine == "ANGULAR"){
		  this.data.init();
	  }
      ///////////Load Project Definition////////////////////
      params = {};
      params.id = "PROJDEF";
      params.runnerObj = this;
      params.runner = this.getFile;
      params.callBack = this.loadProjDef;
      params.callBackObj = this;
      params.path = this.getConfigPath() + "/" + "prjdef.json";
      params.async = true;
      proc.threads[proc.threads.length] = params;
      ///////////////////////Start/////////////////////////
      this.startProc(proc);
   }, projectLoaded : function(proc) {
      //alert("Project Loaded");
      var myObj = this;
      ////Load Project Level Scripts
      requirejs(this.prjScripts, function() {
         myObj.enableAnimations = true;
         myObj.launchScreen(myObj.firstPage, 0);
      });
   }, launchScreen : function(scr, animation) {
      var lo = this.getLayout(scr);
      var proc = {};
      proc.scr = scr;
      proc.lo = lo;
      proc.type = "PG";
      proc.animation = animation;
      proc.newDiv = this.loadDiv;
      proc.oldDiv = this.currDiv;
      this.loadScreen(proc);
   }, launchSubScreen : function(scr, div, animation) {
      this.launchInDiv("SS", scr, div, animation);
   }, launchCallForm : function(scr, div, animation) {
      this.launchInDiv("CF", scr, div, animation);
   }, launchInDiv : function(type, scr, div, animation) {
      var lo = this.getLayout(scr);
      var proc = {};
      proc.scr = scr;
      proc.lo = lo;
      proc.type = type;
      proc.animation = animation;
      proc.newDiv = div;
      ////Create Divs
      proc.origDiv = proc.newDiv;
      var div1 = proc.newDiv + "_apz_1";
      var div2 = proc.newDiv + "_apz_2";
      var html = this.getHtml(proc.newDiv);
      var divObj = document.getElementById(proc.newDiv)
      var div1Obj = document.createElement("div");
      div1Obj.setAttribute("id", div1);
      var div2Obj = document.createElement("div");
      div2Obj.setAttribute("id", div2);
      this.clearHtml(proc.newDiv);
      divObj.appendChild(div1Obj);
      divObj.appendChild(div2Obj);
      $("#" + div1).addClass("lcol12");
      $("#" + div2).addClass("lcol12 dispnone viewhidden");
      this.setHtml(div1, html)
      proc.oldDiv = div1;
      proc.newDiv = div2;
      ///Call Load
      this.loadScreen(proc);
   }, loadScreen : function(proc) {
      ///Start Loader
      this.startLoader();
      ////Validate Screen Authorization
      proc.threads = [];
      proc.id = "SCRLOAD";
      proc.callBack = this.scrFilesLoaded;
      proc.callBackObj = this;
      ///SetAnimation
      if (!this.enableAnimations) {
         proc.animation = 0;
      }
      var params = null;
      ////Screen Definition
      var key = proc.scr + this.idSep + proc.lo;
      if (!this.containsKey(this.scrDefsMap, key)) {
         /////Screen Loading Process
         //////Screen Definition
         params = {};
         params.id = "SCRDEF";
         params.runnerObj = this;
         params.runner = this.getFile;
         params.callBack = this.scrDefLoaded;
         params.callBackObj = this;
         params.path = this.getScrDefPath() + "/" + proc.scr + "_" + proc.lo + ".json";
         params.async = true;
         proc.threads[proc.threads.length] = params;
      }
      ////Screen HTML
      key = this.getHTMLFileName(proc.scr, proc.lo);
      if (!this.containsKey(this.scrHtmls, key)) {
         params = {};
         params.id = "SCRHTML";
         params.runnerObj = this;
         params.runner = this.getFile;
         params.callBack = this.scrHtmlLoaded;
         params.callBackObj = this;
         params.path = this.getScrPath() + this.getHTMLFileName(proc.scr, proc.lo);
         params.async = true;
         proc.threads[proc.threads.length] = params;
      }
      ////Start Process
      this.startProc(proc);
   }, scrDefLoaded : function(params) {
      params.proc.loadScrDef = true;
      params.proc.scrDef = params.content;
   }, scrHtmlLoaded : function(params) {
      ///Store
      this.storeScrHtml(params.proc.scr, params.proc.lo, params.content);
      params.proc.scrHtml = params.content;
   }, scrFilesLoaded : function(proc) {
      //alert("Screen Files Loaded..");
      ////Load Interfaces Process
      proc.threads = [];
      proc.id = "SCRLOAD";
      proc.callBack = this.ifacesLoaded;
      proc.callBackObj = this;
      if (proc.loadScrDef) {
         var params = null;
         var def = JSON.parse(proc.scrDef);
         var noOfIfaces = 0;
         if (def.ifaces) {
            noOfIfaces = def.ifaces.length;
         }
         for (var i = 0; i < noOfIfaces; i++) {
            if (!this.containsKey(this.ifacesMap, def.ifaces[i])) {
               params = {};
               params.id = "IFACEDEF";
               params.runnerObj = this;
               params.runner = this.getFile;
               params.callBack = this.loadIfaceDef;
               params.callBackObj = this;
               params.path = this.getIfaceDefPath() + "/" + def.ifaces[i] + ".json";
               params.async = true;
               proc.threads[proc.threads.length] = params;
            }
         }
      }
      ////Start Process
      this.startProc(proc);
   }, ifacesLoaded : function(proc) {
      //alert("ifaces Loaded");
      ////Load Screen Meta Data
      if (proc.loadScrDef) {
         var params = {};
         params.content = proc.scrDef;
         params.scr = proc.scr;
         params.lo = proc.lo;
         params.type = proc.type;
         this.loadScrDef(params);
      }
      //alert("scr meta loaded..");
      this.loadScrContent(proc);
   }, loadScrContent : function(proc) {
      var key = proc.scr + this.idSep + proc.lo;
      this.scrMetaData = this.scrDefsMap[key];
      key = this.getHTMLFileName(proc.scr, proc.lo);
      proc.scrHtml = this.scrHtmls[key];
      ////Inject HTML
      this.setHtml(proc.newDiv, proc.scrHtml);
	  ////Update Current Screen
	  if(proc.type != "CF"){
		  this.currScr = proc.scr;
	  }
      /////Update Ids
      var ids = $('#' + proc.oldDiv + ' [id]').map(function() {
         if (this.id != proc.oldDiv) {
            this.id = this.id + "_Dummy";
            if (this.id == "sidebar_Dummy") {
               $(this).css("display", "none");
            }
         }
      });
      ////Update Classes for subscreen
      if (proc.type != "PG") {
         $("div#scr_" + proc.scr + "_main .page-body").each(function(elm, val) {
            val.id = "page-body_" + proc.scr;
            $("div#scr_" + proc.scr + "_main .page-body").removeClass("page-body");
            $("div#scr_" + proc.scr + "_main .header").removeClass("header");
            $("div#scr_" + proc.scr + "_main .footer").removeClass("footer");
            $("div#scr_" + proc.scr + "_main").removeClass("rolepage");
         });
      }
      ////Load Scripts
      var myObj = this;
      requirejs(this.scrMetaData.scripts, function() {
         myObj.scrScriptsLoaded(proc);
      });
   }, scrScriptsLoaded : function(proc) {
      //alert("Scripts Loaded");
      ////Execute onload Scripts (??)
      ///Initialize UI Components
      this.init(proc);
      ///Show Screen
      if (proc.animation > 0) {
         var animator = new Apz.Anim(this);
         animator.animate(proc);
      } else {
         this.scrShowScreen(proc);
      }
   }, scrShowScreen : function(proc) {
      var onLoad = "onLoad_" + proc.scr;
      if (this.app[onLoad]) {
         this.app[onLoad]();
      }
      window.scrollTo(0, 0);
      if (proc.type == "PG") {
         this.clearHtml(proc.oldDiv)
         this.flipPages();
      } else {
         var lhtml = this.getHtml(proc.newDiv);
         this.setHtml(proc.origDiv, lhtml);
      }
      ///Init Screen
      this.scrInit();
      ////Execute PostShow
   }, flipPages : function(proc) {
      var bkp = this.currDiv;
      this.currDiv = this.loadDiv;
      this.loadDiv = bkp;
      ///Set Visibility
      $("#" + this.loadDiv).addClass("viewhidden");
      $("#" + this.currDiv).removeClass("viewhidden");
   }, scrInit : function(proc) {
      ///Readjust Height, Carousel init ui ints etc...
      this.readjustHeight();
      //////Stop Loader
      this.stopLoader();
      this.ns.hideSplash({});
   }, getScreenWidth : function() {
      return $(window).width();
   }, getScreenHeight : function() {
      return screen.height;
   }, getInfraPath: function() {
        var path = "../../../appzillon/scripts";
        if (this.deviceOs == "WEB") {
            path = "appzillon/scripts";
        } else if(this.deviceOs == "MCA"){
            path = "appzillon/controllers";
        }
        return path;
    }, getScrPath: function() {
        var path = "";
        if (this.deviceOs == "WEB") {
            path = "apps/" + this.appId + "/screens/";
        } else if(this.deviceOs == "MCA"){
        	path = "apps/" + this.appId + "/views/";
        }
        return path;
    }, getScrDefPath: function() {
        var path = "scrdef";
        if (this.deviceOs == "WEB" || this.deviceOs == "MCA") {
            path = this.getScrPath() + "scrdef";
        }
        return path;
    }, getIfaceDefPath: function() {
        var path = "ifacedef";
        if (this.deviceOs == "WEB" || this.deviceOs == "MCA") {
            path = this.getScrPath() + "ifacedef";
        }
        return path;
    }, getMockRespPath: function() {
        var path = "mockresponses";
        if (this.deviceOs == "WEB" || this.deviceOs == "MCA") {
            path = this.getScrPath() + "mockresponses";
        }
        return path;
    }, getConfigPath: function() {
        var path = "config";
        if (this.deviceOs == "WEB" || this.deviceOs == "MCA") {
            path = this.getScrPath() + "config";
        }
        return path;
    }, getDataFilesPath: function() {
        var path = "datafiles";
        if (this.deviceOs == "WEB" || this.deviceOs == "MCA") {
            path = this.getScrPath() + "datafiles";
        }
        return path;
    }, getStylesPath: function() {
        var path = "../styles";
        if (this.deviceOs == "WEB" || this.deviceOs == "MCA") {
            path = "apps/" + this.appId + "/styles";
        }
        return path;
    }, getScriptsPath: function() {
        var path = "../scripts";
        if (this.deviceOs == "WEB") {
            path = "apps/" + this.appId + "/scripts";
        } else if(this.deviceOs == "MCA"){
        	path = "apps/" + this.appId + "/controllers";
        }
        return path;
    },
   ////Other Module hooks
   callLov : function(elmId, cntnrId){
	  this.lov.callLov(elmId, cntnrId);
   }, sortRecords : function(container, element, sortType) {
      var containerId = container.id;
      var containerObj = this.scrMetaData.containersMap[containerId];
      var containerType = containerObj.type;
      if (containerType == "TABLE" || containerType == "LIST") {
         var node;
         var nodes = containerObj.nodes;
         var noOfNodes = nodes.length;
         for (var x = 0 ; x < noOfNodes ; x ++){
            node = nodes[x];
            this.sortRows(container, node, element, sortType);
         }
      }
   }, sortRows : function(container, node, element, sortType) {
      var containerId = container.id;
      var containerObj = this.scrMetaData.containersMap[containerId];
      var containerType = containerObj.type;
      var ifacename = "";
      if (containerType == "TABLE" || containerType == "LIST") {
         var finalOutput = this.getAllRecords(containerObj);
         var nodeElm = element.id;
         var elmType = containerObj.elmsMap[nodeElm].dataType;
            finalOutput[node].sort(this.sortNode(element, sortType, elmType,  function(a) {return a}));
            this.data.scrdata[node] = finalOutput[node];
            ifaceName = this.scrMetaData.nodesMap[node].ifaceName;
      }
      this.data.loadData(ifaceName);
   }, sortNode : function(element, reverse, elmType, primer) {
      var key = primer ? function(x) {
            return primer(x[element]);
      } : function(x) {
            return x[element];
      };
      reverse = !reverse ? 1 : -1;
      //APPFIX FOR DATE/DATE TIME SORT
      return function(a, b) {
         var val1 = key(a);
         var val2 = key(b);
            if(elmType == "DATE"){
               return a = Date.parseExact(val1,this.dateFormat), b = Date.parseExact(val2,this.dateFormat), reverse * ((a > b) - (b > a));
            }else if(elmType == "DATETIME"){
               return a = Date.parseExact(val1,this.dateTimeFormat), b = Date.parseExact(val2,this.dateTimeFormat), reverse * ((a > b) - (b > a));
            }else{
               return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
      };
   }, getAllRecords : function(containerObj) {
      var finalOutput = {};
      var dataPointer;
      var nodes = containerObj.nodes;
      var noOfNodes = nodes.length;
      var node = nodes[0];
      var mrParent = this.scrMetaData.nodesMap[node].mrParent;
      var totalRecs = this.data.getNoOfRecs(mrParent);
      for (var r = 0 ; r <= totalRecs ; r++) {
         for(var n = 0; n < noOfNodes; n++) {
            node = nodes[n];
            if (r == 0) {
               finalOutput[node] = [];
            }
            dataPointer = this.data.getDataPointer(node, r);
            if (dataPointer !== null) {
               finalOutput[node][r] = dataPointer;
            }
         }
      }
      return finalOutput;
   }, 
};
