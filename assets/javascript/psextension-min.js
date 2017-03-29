var PayScaleExtension = { ServiceURL: "//www.payscale.com", bubbleWidth: "400", bubbleHeight: "330", textColor: "#ffffff", backgroundColor: "#9a0000", borderColor: "#9acddf", chartBgColor: "#f0f9fa", chartFgColor: "#61adc0", campaignId: "", affiliateId: "", srcId: "wizzyBubble", cmPageId: "/syndication/?syndicated_joblisting_calculator", jobListing: false, slideLogo: function(e) {
        if (e > -100) { PayScaleExtension.picture.style.top = e + "px";
            e -= 1;
            setTimeout("PayScaleExtension.slideLogo(" + e + ")", 20) } }, showLogo: function() { PayScaleExtension.picture = document.body.appendChild(document.createElement("div"));
        PayScaleExtension.picture.id = "toplogo";
        PayScaleExtension.picture.style["position"] = "absolute";
        PayScaleExtension.picture.style["top"] = "0";
        PayScaleExtension.picture.style["right"] = "0";
        PayScaleExtension.picture.style["z-index"] = "auto";
        PayScaleExtension.picture.innerHTML = '<img src="' + PayScaleExtension.ServiceURL + '/images/topcorner.png" />';
        setTimeout("PayScaleExtension.slideLogo(0)", 3e3) }, addEvent: function(e, t, n) {
        if (e.addEventListener) { e.addEventListener(t, n, false) } else {
            if (e.attachEvent) { e.attachEvent("on" + t, n) } } }, removeEvent: function(e, t, n) {
        if (e.removeEventListener) { e.removeEventListener(t, n, false) } else {
            if (e.detachEvent) { e.detachEvent("on" + t, n) } } }, init: function() { PayScaleExtension.addEvent(document, "mousedown", PayScaleExtension.cleanup);
        PayScaleExtension.addEvent(document, "mousedown", PayScaleExtension.getMouseXY);
        PayScaleExtension.addEvent(window, "resize", PayScaleExtension.cleanup) }, debug: function(e) { document.getElementById("debug").innerHTML = "mousedown" + e.clientX }, displayChart: function(e, t, n, r) { PayScaleExtension.bubbleWidth = 400;
        PayScaleExtension.bubbleHeight = 330;
        PayScaleExtension.setBubbleLocation();
        PayScaleExtension.processedJob = encodeURIComponent(e);
        PayScaleExtension.processedCity = encodeURIComponent(t);
        PayScaleExtension.processedState = encodeURIComponent(n);
        PayScaleExtension.processedCountry = encodeURIComponent(r);
        PayScaleExtension.baseFrameLoc = PayScaleExtension.ServiceURL + "/bookmarkletQuote.aspx?job=" + PayScaleExtension.processedJob + "&city=" + PayScaleExtension.processedCity + "&state=" + PayScaleExtension.processedState + "&country=" + PayScaleExtension.processedCountry;
        if (PayScaleExtension.affiliateId.length == 0) { PayScaleExtension.frameLoc = PayScaleExtension.baseFrameLoc } else { PayScaleExtension.srcId = PayScaleExtension.affiliateId + "wizbub";
            PayScaleExtension.frameLoc = PayScaleExtension.baseFrameLoc + "&af=" + PayScaleExtension.affiliateId + "&src=" + PayScaleExtension.srcId }
        PayScaleExtension.html = '<div id="wizzySquare"><div style="position:relative;font-family:Verdana,sans-serif;font-size:10pt;width:auto;padding:3px;background-color:#2e5c8a;color:#fff;"><div id="titleBarText">PayScale Salary Evaluator</div><img style="position:absolute;top:4px;right:3px;float:right;" onClick="PayScaleExtension.cleanup()" src="' + PayScaleExtension.ServiceURL + '/images/wizzy_close.png" alt="Close Window" /></div>';
        PayScaleExtension.html = PayScaleExtension.html + '<div id="wizzyMeat"><iframe src="' + PayScaleExtension.ServiceURL + '/bookmarkletLoading.htm" id="innerFrame" scrolling="NO" frameborder="0" style="padding:5px;"></iframe></div></div>';
        if (document.getElementById("wizzyContainer")) { document.body.removeChild(document.getElementById("wizzyContainer")) }
        PayScaleExtension.StartY = PayScaleExtension.y;
        PayScaleExtension.StartX = PayScaleExtension.x;
        PayScaleExtension.container = document.body.appendChild(document.createElement("div"));
        PayScaleExtension.container.id = "wizzyContainer";
        PayScaleExtension.container.style["position"] = "absolute";
        PayScaleExtension.container.style["top"] = PayScaleExtension.StartY + "px";
        PayScaleExtension.container.style["left"] = PayScaleExtension.StartX + "px";
        PayScaleExtension.container.style["margin"] = "0";
        PayScaleExtension.container.style["padding"] = "0";
        PayScaleExtension.container.style.zIndex = "1000";
        PayScaleExtension.container.innerHTML = PayScaleExtension.html;
        PayScaleExtension.buttonClose = document.getElementById("wizzyClose");
        PayScaleExtension.innerFrame = document.getElementById("innerFrame");
        PayScaleExtension.innerFrame.style["width"] = PayScaleExtension.bubbleWidth + "px";
        PayScaleExtension.innerFrame.style["height"] = PayScaleExtension.bubbleHeight + "px";
        setTimeout("PayScaleExtension.innerFrame.src = '" + PayScaleExtension.frameLoc + "'", 300);
        PayScaleExtension.wizzySquare = document.getElementById("wizzySquare");
        PayScaleExtension.wizzySquare.id = "wizzySquare";
        PayScaleExtension.wizzySquare.style["position"] = "relative";
        PayScaleExtension.wizzySquare.style["border"] = "1px solid #2e5c8a";
        PayScaleExtension.wizzySquare.style["backgroundColor"] = "#fff";
        PayScaleExtension.titleBarText = document.getElementById("titleBarText");
        PayScaleExtension.titleBarText.style["font-family"] = "Verdana, sans-serif";
        PayScaleExtension.titleBarText.id = "titleBarText";
        PayScaleExtension.titleBarText.style["marginLeft"] = "5px";
        PayScaleExtension.titleBarText.style["position"] = "relative";
        PayScaleExtension.wizzyMeat = document.getElementById("wizzyMeat");
        PayScaleExtension.wizzyMeat.id = "wizzyMeat";
        PayScaleExtension.wizzyMeat.style["position"] = "relative" }, displaySalaryCalculator: function(e, t, n, r, i, s, o, u) {
        if (null == i) i = PayScaleExtension.textColor;
        if (null == s) s = PayScaleExtension.backgroundColor;
        if (null != u) PayScaleExtension.jobListing = u;
        if (null == e) e = "";
        if (null == t) t = "";
        if (null == n) n = "";
        if (null == r) r = "United States";
        PayScaleExtension.bubbleWidth = 300;
        PayScaleExtension.bubbleHeight = 250;
        var a = true;
        if (null != o && "" != o) {
            var f = document.getElementById(o);
            if (null != f) { a = false;
                PayScaleExtension.x = PayScaleExtension.findPosX(f);
                PayScaleExtension.y = PayScaleExtension.findPosY(f) } } else { PayScaleExtension.setBubbleLocation() }
        PayScaleExtension.processedJob = encodeURIComponent(e);
        PayScaleExtension.processedCity = encodeURIComponent(t);
        PayScaleExtension.processedState = encodeURIComponent(n);
        PayScaleExtension.processedCountry = encodeURIComponent(r);
        PayScaleExtension.cmPageId = encodeURIComponent(PayScaleExtension.cmPageId);
        PayScaleExtension.baseFrameLoc = PayScaleExtension.ServiceURL + "/syndication/calculator_large.aspx?jobTitle=" + PayScaleExtension.processedJob + "&city=" + PayScaleExtension.processedCity + "&state=" + PayScaleExtension.processedState + "&country=" + PayScaleExtension.processedCountry + "&af=" + PayScaleExtension.affiliateId + "&src=" + PayScaleExtension.srcId + "&t=" + (new Date).getTime() + "&cmPageId=" + PayScaleExtension.cmPageId;
        if (PayScaleExtension.jobListing) { PayScaleExtension.baseFrameLoc = PayScaleExtension.baseFrameLoc + "&joblistings=true" }
        PayScaleExtension.frameLoc = PayScaleExtension.baseFrameLoc;
        PayScaleExtension.html = '<div id="wizzySquare" style="width: 300px; height: 250px; border: 1px solid ' + s + '; overflow: hidden; font-family: Verdana; font-size: 12px">';
        PayScaleExtension.html = PayScaleExtension.html + '<div style="width: 300px; height: 24px;background-color: ' + s + '; font-family: Verdana; font-size: 14px;"><div style="padding: 2px; padding-left: 10px"><span style="color: ' + i + ';font-family: Verdana; font-size: 14px;">Salary Calculator</span></div>';
        if (a) { PayScaleExtension.html = PayScaleExtension.html + '<span style="color: ' + i + ';font-family: Verdana; font-size: 14px;cursor:pointer;position:absolute;top:2px;right:5px;float:right;" onClick="PayScaleExtension.cleanup()">x</span>' }
        PayScaleExtension.html = PayScaleExtension.html + "</div>";
        PayScaleExtension.html = PayScaleExtension.html + '<iframe src="' + PayScaleExtension.ServiceURL + '/syndication/loading.htm" id="innerFrame" scrolling="NO" frameborder="0" style="padding: 0; margin: 0px"></iframe></div>';
        if (document.getElementById("wizzyContainer")) { PayScaleExtension.container = document.getElementById("wizzyContainer") } else { PayScaleExtension.container = document.body.appendChild(document.createElement("div"));
            PayScaleExtension.container.id = "wizzyContainer" }
        PayScaleExtension.StartY = PayScaleExtension.y;
        PayScaleExtension.StartX = PayScaleExtension.x;
        PayScaleExtension.container.style["position"] = "absolute";
        PayScaleExtension.container.style["top"] = PayScaleExtension.StartY + "px";
        PayScaleExtension.container.style["left"] = PayScaleExtension.StartX + "px";
        PayScaleExtension.container.style["margin"] = "0";
        PayScaleExtension.container.style["padding"] = "0";
        PayScaleExtension.container.style.zIndex = "1000";
        PayScaleExtension.container.innerHTML = PayScaleExtension.html;
        PayScaleExtension.buttonClose = document.getElementById("wizzyClose");
        PayScaleExtension.innerFrame = document.getElementById("innerFrame");
        PayScaleExtension.innerFrame.style["width"] = PayScaleExtension.bubbleWidth + "px";
        PayScaleExtension.innerFrame.style["height"] = PayScaleExtension.bubbleHeight + "px";
        PayScaleExtension.innerFrame.style["font-family"] = "Verdana";
        setTimeout("PayScaleExtension.innerFrame.src = '" + PayScaleExtension.frameLoc + "'", 300);
        PayScaleExtension.wizzySquare = document.getElementById("wizzySquare");
        PayScaleExtension.wizzySquare.id = "wizzySquare";
        PayScaleExtension.wizzySquare.style["position"] = "relative";
        PayScaleExtension.wizzySquare.style["backgroundColor"] = "#fff" }, displaySalaryCalculatorV3R: function(e, t, n, r, i, s, o, u, a, f) {
        if (null == i) i = PayScaleExtension.textColor;
        if (null == s) s = PayScaleExtension.backgroundColor;
        if (null != u) PayScaleExtension.jobListing = u;
        if (null == e) e = "";
        if (null == t) t = "";
        if (null == n) n = "";
        if (null == r) r = "United States";
        var l = document.getElementById(o);
        var c = document.getElementById(a);
        PayScaleExtension.processedJob = encodeURIComponent(e);
        PayScaleExtension.processedCity = encodeURIComponent(t);
        PayScaleExtension.processedState = encodeURIComponent(n);
        PayScaleExtension.processedCountry = encodeURIComponent(r);
        PayScaleExtension.cmPageId = encodeURIComponent(PayScaleExtension.cmPageId);
        if (null != l && null != c) {
            var h = l.offsetWidth;
            var p = l.offsetHeight;
            var d = h - 20;
            l.style.display = "none";
            c.style.display = "block";
            c.innerHTML = '<iframe id="PayscaleSalaryCalculatorInnerFrame" frameborder="0" scrolling="no" style="padding: 0; margin: 0;" width=' + h + " height=" + p + ' src="' + 'http://' + PayScaleExtension.ServiceURL + '/syndication/loading.htm"' + "></iframe>";
            var v = document.getElementById(f);
            if (null != v) { v.style.display = "inline" }
            var m = document.getElementById("PayscaleSalaryCalculatorInnerFrame");
            var g = 'http://' + PayScaleExtension.ServiceURL + "/syndication/total_pay_chart.aspx?job=" + PayScaleExtension.processedJob + "&title=1&city=" + PayScaleExtension.processedCity + "&state=" + PayScaleExtension.processedState + "&country=" + PayScaleExtension.processedCountry + "&af=" + PayScaleExtension.affiliateId + "&src=" + PayScaleExtension.srcId + "&t=" + (new Date).getTime() + "&cmPageId=" + PayScaleExtension.cmPageId + "&width=" + d + "px&shownext=true";
            setTimeout(function() { m.src = g }, 300) } }, resetSalaryCalculatorV3R: function(e, t, n) {
        var r = document.getElementById(n);
        if (null != r) { r.style.display = "none" }
        var i = document.getElementById(e);
        var s = document.getElementById(t);
        if (null != i && null != s) { i.style.display = "block";
            s.style.display = "none" } }, displaySalaryCalculatorV3: function(e, t, n, r, i, s, o, u) {
        if (null == i) i = PayScaleExtension.textColor;
        if (null == s) s = PayScaleExtension.backgroundColor;
        if (null != u) PayScaleExtension.jobListing = u;
        if (null == e) e = "";
        if (null == t) t = "";
        if (null == n) n = "";
        if (null == r) r = "United States";
        PayScaleExtension.bubbleWidth = 300;
        PayScaleExtension.bubbleHeight = 230;
        if (null != o && "" != o) {
            var a = document.getElementById(o);
            if (null != a) { PayScaleExtension.x = PayScaleExtension.findPosX(a);
                PayScaleExtension.y = PayScaleExtension.findPosY(a) } } else { PayScaleExtension.setBubbleLocation() }
        PayScaleExtension.processedJob = encodeURIComponent(e);
        PayScaleExtension.processedCity = encodeURIComponent(t);
        PayScaleExtension.processedState = encodeURIComponent(n);
        PayScaleExtension.processedCountry = encodeURIComponent(r);
        PayScaleExtension.cmPageId = encodeURIComponent(PayScaleExtension.cmPageId);
        PayScaleExtension.baseFrameLoc = PayScaleExtension.ServiceURL + "/syndication/total_pay_chart.aspx?job=" + PayScaleExtension.processedJob + "&title=1&city=" + PayScaleExtension.processedCity + "&state=" + PayScaleExtension.processedState + "&country=" + PayScaleExtension.processedCountry + "&af=" + PayScaleExtension.affiliateId + "&src=" + PayScaleExtension.srcId + "&t=" + (new Date).getTime() + "&cmPageId=" + PayScaleExtension.cmPageId + "&width=290px&height=220px&shownext=true";
        if (PayScaleExtension.jobListing) { PayScaleExtension.baseFrameLoc = PayScaleExtension.baseFrameLoc + "&joblistings=true" }
        PayScaleExtension.frameLoc = PayScaleExtension.baseFrameLoc;
        PayScaleExtension.html = '<div id="wizzySquare" style="width: 300px; height: 43px; border-bottom: 1px solid #cecece; overflow: hidden; font-family: \'Open Sans\', sans-serif; font-size: 12px">';
        PayScaleExtension.html = PayScaleExtension.html + '<div style="width: 190px; float: left; background-color: #ffffff; color: ' + i + '; font-family: \'Open Sans\', sans-serif; font-size: 18px; font-weight: bold; line-height: 43px; margin-left: 15px; text-transform: uppercase;"><span style="cursor: pointer">&laquo;</span> Salary Research</div>';
        PayScaleExtension.html = PayScaleExtension.html + '<div style="width: 90px; float: right; margin-top: 5px;"><a href="' + PayScaleExtension.ServiceURL + '" target="_blank"><img src="' + PayScaleExtension.ServiceURL + '/images/powered-by-payscale.png" alt="PayScale" style="border: 0" width="82" height="28" /></a></div>';
        PayScaleExtension.html = PayScaleExtension.html + "</div>";
        PayScaleExtension.html = PayScaleExtension.html + '<iframe src="' + PayScaleExtension.ServiceURL + '/syndication/loading.htm" id="innerFrame" scrolling="NO" frameborder="0" style="padding: 0; margin: 0px"></iframe></div>';
        if (document.getElementById("wizzyContainer")) { PayScaleExtension.container = document.getElementById("wizzyContainer") } else { PayScaleExtension.container = document.body.appendChild(document.createElement("div"));
            PayScaleExtension.container.id = "wizzyContainer" }
        PayScaleExtension.StartY = PayScaleExtension.y;
        PayScaleExtension.StartX = PayScaleExtension.x;
        PayScaleExtension.container.style["position"] = "absolute";
        PayScaleExtension.container.style["top"] = PayScaleExtension.StartY + "px";
        PayScaleExtension.container.style["left"] = PayScaleExtension.StartX + "px";
        PayScaleExtension.container.style["margin"] = "0";
        PayScaleExtension.container.style["padding"] = "0";
        PayScaleExtension.container.style["background-color"] = '#fff';
        PayScaleExtension.container.style.zIndex = "1000";
        PayScaleExtension.container.innerHTML = PayScaleExtension.html;
        PayScaleExtension.buttonClose = document.getElementById("wizzyClose");
        PayScaleExtension.innerFrame = document.getElementById("innerFrame");
        PayScaleExtension.innerFrame.style["width"] = PayScaleExtension.bubbleWidth + "px";
        PayScaleExtension.innerFrame.style["height"] = PayScaleExtension.bubbleHeight + "px";
        PayScaleExtension.innerFrame.style["font-family"] = "'Open Sans',sans-serif";
        setTimeout("PayScaleExtension.innerFrame.src = '" + PayScaleExtension.frameLoc + "'", 300);
        PayScaleExtension.wizzySquare = document.getElementById("wizzySquare");
        PayScaleExtension.wizzySquare.id = "wizzySquare";
        PayScaleExtension.wizzySquare.style["position"] = "relative";
        PayScaleExtension.wizzySquare.style["backgroundColor"] = "#fff" }, displayMarketRateCalculator: function(e, t, n, r, i, s, o, u) { PayScaleExtension.cmPageId = "market_rate_calculator";
        if (null == i) i = PayScaleExtension.borderColor;
        if (null == s) s = PayScaleExtension.chartBgColor;
        if (null == o) o = PayScaleExtension.chartFgColor;
        if (null == e) e = "";
        if (null == t) t = "";
        if (null == n) n = "";
        if (null == r) r = "United States";
        PayScaleExtension.bubbleWidth = 700;
        PayScaleExtension.bubbleHeight = 300;
        var a = true;
        if (null != u && "" != u) {
            var f = document.getElementById(u);
            if (null != f) { a = false;
                PayScaleExtension.x = PayScaleExtension.findPosX(f);
                PayScaleExtension.y = PayScaleExtension.findPosY(f) } } else { PayScaleExtension.setBubbleLocation() }
        PayScaleExtension.processedJob = encodeURIComponent(e);
        PayScaleExtension.processedCity = encodeURIComponent(t);
        PayScaleExtension.processedState = encodeURIComponent(n);
        PayScaleExtension.processedCountry = encodeURIComponent(r);
        PayScaleExtension.cmPageId = encodeURIComponent(PayScaleExtension.cmPageId);
        PayScaleExtension.baseFrameLoc = PayScaleExtension.ServiceURL + "/syndication/market_rate_calculator.aspx?jobTitle=" + PayScaleExtension.processedJob + "&city=" + PayScaleExtension.processedCity + "&state=" + PayScaleExtension.processedState + "&country=" + PayScaleExtension.processedCountry + "&af=" + PayScaleExtension.affiliateId + "&cmpid=" + PayScaleExtension.campaignId + "&chartbg=" + s.replace("#", "") + "&chartfg=" + o.replace("#", "") + "&src=" + PayScaleExtension.srcId + "&t=" + (new Date).getTime() + "&cmPageId=" + PayScaleExtension.cmPageId;
        if (PayScaleExtension.jobListing) { PayScaleExtension.baseFrameLoc = PayScaleExtension.baseFrameLoc + "&joblistings=true" }
        PayScaleExtension.frameLoc = PayScaleExtension.baseFrameLoc;
        PayScaleExtension.html = '<div id="wizzySquare" style="width: ' + PayScaleExtension.bubbleWidth + "px; height: " + PayScaleExtension.bubbleHeight + "px; border: 5px solid " + i + '; overflow: hidden; font-family: Verdana; font-size: 12px;">';
        PayScaleExtension.html = PayScaleExtension.html + '<div style="width: ' + PayScaleExtension.bubbleWidth + 'px; height: 30px;background-color: #fff; font-family: Verdana; font-size: 15px;"><img src="' + PayScaleExtension.ServiceURL + '/images/payscale_logo_90x32.gif" height=32px width=90px style="float:left; margin-left:10px; margin-top:5px;"/><div style="padding: 14px 20px 10px 10px;"><span style="margin-left:3px;color: #999;font-family: Verdana; font-size: 15px;font-weight:bold;">MarketRate Summary</span></div>';
        if (a) { PayScaleExtension.html = PayScaleExtension.html + '<span style="color: #000;font-family: Verdana; font-weight:bold; font-size: 11px;cursor:pointer;position:absolute;top:10px;right:15px;float:right;" onClick="PayScaleExtension.cleanup()">Close Window [X]</span>' }
        PayScaleExtension.html = PayScaleExtension.html + "</div>";
        PayScaleExtension.html = PayScaleExtension.html + '<iframe src="' + PayScaleExtension.ServiceURL + '/syndication/loading.htm" id="innerFrame" scrolling="NO" frameborder="0" style="padding: 0; margin: 0px"></iframe></div>';
        if (document.getElementById("wizzyContainer")) { PayScaleExtension.container = document.getElementById("wizzyContainer") } else { PayScaleExtension.container = document.body.appendChild(document.createElement("div"));
            PayScaleExtension.container.id = "wizzyContainer" }
        PayScaleExtension.StartY = PayScaleExtension.y;
        PayScaleExtension.StartX = PayScaleExtension.x;
        PayScaleExtension.container.style["position"] = "absolute";
        PayScaleExtension.container.style["top"] = PayScaleExtension.StartY + "px";
        PayScaleExtension.container.style["left"] = PayScaleExtension.StartX + "px";
        PayScaleExtension.container.style["margin"] = "0";
        PayScaleExtension.container.style["padding"] = "0";
        PayScaleExtension.container.style["z-index"] = "1000";
        PayScaleExtension.container.innerHTML = PayScaleExtension.html;
        PayScaleExtension.buttonClose = document.getElementById("wizzyClose");
        PayScaleExtension.innerFrame = document.getElementById("innerFrame");
        PayScaleExtension.innerFrame.style["width"] = PayScaleExtension.bubbleWidth + "px";
        PayScaleExtension.innerFrame.style["height"] = PayScaleExtension.bubbleHeight + "px";
        PayScaleExtension.innerFrame.style["font-family"] = "Verdana";
        setTimeout("PayScaleExtension.innerFrame.src = '" + PayScaleExtension.frameLoc + "'", 300);
        PayScaleExtension.wizzySquare = document.getElementById("wizzySquare");
        PayScaleExtension.wizzySquare.id = "wizzySquare";
        PayScaleExtension.wizzySquare.style["position"] = "relative";
        PayScaleExtension.wizzySquare.style["backgroundColor"] = "#fff" }, getMouseXY: function(e) { PayScaleExtension.IE = document.all ? true : false;
        if (PayScaleExtension.IE) { PayScaleExtension.x = event.clientX;
            PayScaleExtension.y = event.clientY } else { PayScaleExtension.x = e.pageX;
            PayScaleExtension.y = e.pageY }
        if (PayScaleExtension.x < 0) { PayScaleExtension.x = 0 }
        if (PayScaleExtension.y < 0) { PayScaleExtension.y = 0 }
        return true }, setBubbleLocation: function() {
        var e = 0,
            t = 0;
        if (typeof window.innerWidth == "number") { e = window.innerWidth;
            t = window.innerHeight } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) { e = document.documentElement.clientWidth;
            t = document.documentElement.clientHeight } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) { e = document.body.clientWidth;
            t = document.body.clientHeight }
        var n = 0,
            r = 0;
        if (typeof window.pageYOffset == "number") { r = window.pageYOffset;
            n = window.pageXOffset } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) { r = document.body.scrollTop;
            n = document.body.scrollLeft } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) { r = document.documentElement.scrollTop;
            n = document.documentElement.scrollLeft }
        if (PayScaleExtension.IE) {
            if (t - PayScaleExtension.y < PayScaleExtension.bubbleHeight) { PayScaleExtension.y = PayScaleExtension.y + r - PayScaleExtension.bubbleHeight } else { PayScaleExtension.y = PayScaleExtension.y + r } } else {
            if (t + r - PayScaleExtension.y < PayScaleExtension.bubbleHeight) { PayScaleExtension.y = PayScaleExtension.y - PayScaleExtension.bubbleHeight } }
        if (e - PayScaleExtension.x < PayScaleExtension.bubbleWidth) { PayScaleExtension.x = PayScaleExtension.x - PayScaleExtension.bubbleWidth }
        if (PayScaleExtension.x < 0) { PayScaleExtension.x = 0 }
        if (PayScaleExtension.y < 0) { PayScaleExtension.y = 0 }
        return true }, fillFrame: function(e) { e.src = ps.frameLoc }, cleanup: function() {
        if (null != document.getElementById("wizzyContainer")) { document.body.removeChild(document.getElementById("wizzyContainer")) } }, findPosX: function(e) {
        var t = 0;
        if (e.offsetParent) {
            while (e.offsetParent) { t += e.offsetLeft;
                e = e.offsetParent } } else if (e.x) t += e.x;
        return t }, findPosY: function(e) {
        var t = 0;
        if (e.offsetParent) {
            while (e.offsetParent) { t += e.offsetTop;
                e = e.offsetParent } } else if (e.y) t += e.y;
        return t } }
