(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,t,n){},31:function(e,t,n){e.exports=n.p+"static/media/crm.db70d5c8.png"},36:function(e,t,n){e.exports=n(75)},42:function(e,t,n){},75:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),l=n(15),i=n.n(l),r=(n(42),n(2)),c=n(3),s=n(6),u=n(4),g=n(5),m=n(7),h=n(31),d=n.n(h),p=(n(23),n(12)),v=n.n(p),f=function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(c.a)(t,[{key:"sendCall",value:function(e){console.log("Attempting to call "+e);var t={"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")},n=localStorage.getItem("selectedLineID"),a=JSON.stringify({dialString:e,from:{lineId:n}});v.a.post("https://api.jive.com/calls/v2/calls",a,{headers:t}).then(function(e){console.log(e)}).catch(function(e){console.log(e),alert("An error occurred, Call request failed. Please try again later or logout from Jive")})}},{key:"validateDialString",value:function(e){return!!e.match(/^(\([0-9]{3}\)|[0-9]{3})\s?-?[0-9]{3}\s?-?[0-9]{4}\b/)||!!e.match(/^\+?[0-9]{3,15}$/)}},{key:"render",value:function(){var e,t=this;return e=this.props.fromCallBox?localStorage.getItem("selectedLine")&&localStorage.getItem("token")?this.validateDialString(this.props.dialString)?o.a.createElement("button",{title:"Click to Call",className:"call",onClick:function(){return t.sendCall(t.props.dialString)},type:"button"}):o.a.createElement("button",{className:"nocall",type:"button",title:"Invalid DialString"}):o.a.createElement("button",{className:"nocall",type:"button",title:"Calling Disabled, Check Settings"}):localStorage.getItem("selectedLine")&&localStorage.getItem("token")?o.a.createElement("button",{title:"Click to Call",className:"call",onClick:function(){return t.sendCall(t.props.dialString)},type:"button"}):o.a.createElement("button",{className:"nocall",type:"button",title:"Calling Disabled, Check Settings"}),o.a.createElement("div",{className:"callbtn"},e)}}]),t}(o.a.Component),b={contacts:[{contactId:0,firstname:"Ben",lastname:"Solo",phone:"801-373-9120"},{contactId:1,firstname:"John",lastname:"Smith",phone:"385-440-0115"},{contactId:2,firstname:"Sally",lastname:"Jones",phone:"877-548-3003"}],all:function(){return this.contacts},get:function(e){return this.contacts.find(function(t){return t.contactId===e})}},S=function(e){var t=b.get(parseInt(e.match.params.number,10));return t?o.a.createElement("div",{className:"contact"},o.a.createElement("h3",null,"Contact Info"),o.a.createElement("p",null,t.firstname," ",t.lastname),o.a.createElement("div",{className:"callbox"},o.a.createElement("div",{className:"left"},t.phone),o.a.createElement("div",{className:"right"},o.a.createElement(f,{dialString:t.phone})))):o.a.createElement("div",{className:"contact"},"Sorry, but no contact was not found")},k=n(79),I=n(78),O=n(76),E=function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"allContacts"},o.a.createElement("h3",null,"Contacts"),o.a.createElement("ul",null,b.all().map(function(e){return o.a.createElement("li",{key:e.contactId},o.a.createElement(O.a,{to:"/contact/".concat(e.contactId)},e.lastname,", ",e.firstname))})))}}]),t}(o.a.Component),y=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={multipleLines:!1},n.subscribeLine=n.subscribeLine.bind(Object(m.a)(Object(m.a)(n))),n.changeLine=n.changeLine.bind(Object(m.a)(Object(m.a)(n))),n}return Object(g.a)(t,e),Object(c.a)(t,[{key:"subscribeLine",value:function(e,t){var n=localStorage.getItem("subscriptions"),a=localStorage.getItem("token"),o=localStorage.getItem("selectedLine"),l=e,i=t;console.log("Attempting to subscribe to line "+l);var r={"Content-Type":"application/json",Authorization:"Bearer "+a},c=JSON.stringify([{id:o,type:"dialog",entity:{id:l,type:"line",account:i}}]);v.a.post(n,c,{headers:r}).then(function(e){console.log(e.data)}).catch(function(e){console.log(e)})}},{key:"getSession",value:function(){console.log("Getting session info...");var e={Authorization:"Bearer "+localStorage.getItem("token")};return v.a.post("https://realtime.jive.com/v2/session",null,{headers:e}).then(function(e){return console.log(e),e.data}).catch(function(e){return console.log(e),alert("An error occurred, Session request failed. Please try again later or logout from Jive"),e.response.status})}},{key:"changeLine",value:function(){var e,t,n="",a=document.getElementById("lineSelect").value,o=document.getElementById("lineSelect").selectedIndex,l=localStorage.getItem("subscriptions");localStorage.setItem("selectedLineID",a),console.log("LineID changed to "+a),localStorage.setItem("optionID",o-1),n=localStorage.getItem("lines"),e=(n=JSON.parse(n)).items[o-1].organization.id,t=n.items[o-1].number,localStorage.setItem("organizationID",e),localStorage.setItem("selectedLine",t),l&&this.subscribeLine(a,e)}},{key:"buildOptions",value:function(){if(localStorage.getItem("lines")){var e=localStorage.getItem("lines");(e=JSON.parse(e)).items.length>1&&this.setState({multipleLines:!0},function(){var t=document.getElementById("lineSelect");t.options.add(new Option("Choose your extension","",!0,!0)),t.options[0].disabled=!0;for(var n=0,a=e.items.length;n<a;n++){var o=e.items[n];n.toString()===localStorage.getItem("optionID")?t.options.add(new Option(o.name+" "+o.number+" on "+o.organization.name,o.id,!0,!0)):t.options.add(new Option(o.name+" "+o.number+" on "+o.organization.name,o.id))}})}}},{key:"componentDidMount",value:function(){this.buildOptions()}},{key:"render",value:function(){if(this.state.multipleLines)return localStorage.setItem("multipleLines",!0),o.a.createElement("div",null,o.a.createElement("select",{id:"lineSelect",onChange:this.changeLine}),o.a.createElement("br",null));var e=localStorage.getItem("lines");return e=JSON.parse(e),o.a.createElement("p",null,e.items[0].name," ",e.items[0].number," on ",e.items[0].organization.name)}}]),t}(o.a.Component),j=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).token=localStorage.getItem("token"),n.username=localStorage.getItem("username"),n.userInfo="",n.organization="",n.state={showLineSelect:!1},n}return Object(g.a)(t,e),Object(c.a)(t,[{key:"getLineInfo",value:function(){var e={Authorization:"Bearer "+this.token};return v.a.get("https://api.jive.com/users/v1/users/"+this.username+"/lines",{headers:e}).then(function(e){return e.data}).catch(function(e){return alert("An error occurred, Request for Line Info failed. Please login to Jive again."),localStorage.clear(),e.response.status})}},{key:"componentWillMount",value:function(){var e=this;localStorage.getItem("token")&&!localStorage.getItem("lines")&&(this.props.toggleLogin(),console.log("Getting user info..."),this.getLineInfo().then(function(t){401!==t?(localStorage.setItem("lines",JSON.stringify(t)),1===t.items.length&&(e.userInfo=t.items[0].id,e.organization=t.items[0].organization.id,localStorage.setItem("selectedLineID",e.userInfo),localStorage.setItem("organizationID",e.organization),localStorage.setItem("selectedLine",t.items[0].number)),e.setState({showLineSelect:!0})):e.setState({showLineSelect:!1})})),localStorage.getItem("lines")&&this.setState({showLineSelect:!0})}},{key:"render",value:function(){var e;return e=this.state.showLineSelect?o.a.createElement(y,null):o.a.createElement("p",null,"Loading..."),localStorage.getItem("token")?o.a.createElement("div",{className:"settings"},o.a.createElement("p",null,"Jive Settings"),e,o.a.createElement("br",null),o.a.createElement(O.a,{to:"/logout"},"Logout")):o.a.createElement("div",{className:"settings"},o.a.createElement(O.a,{to:"/login"},"Login to Jive"))}}]),t}(o.a.Component),C=function(){return o.a.createElement("div",{className:"home"},o.a.createElement("h1",null,"Welcome to the CRM Demo"),o.a.createElement(O.a,{to:"/settings"},"Click here or navigate to Settings to get started"))},L=function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){if(!1===this.props.isLoggedIn){var e,t,n="";n=(n=(e=this.props.location.hash.split("="))[1]).replace("&type",""),t=e[4],localStorage.setItem("token",n),localStorage.setItem("username",t),this.props.toggleLogin()}}},{key:"render",value:function(){return o.a.createElement("div",{className:"test"},o.a.createElement("p",null,"We have received our token successfully!"))}}]),t}(o.a.PureComponent),w=n(80),N=function(e){function t(e){var n;return Object(r.a)(this,t),n=Object(s.a)(this,Object(u.a)(t).call(this,e)),console.log("Logout hit"),localStorage.clear(),n.props.toggleLogin(),n.props.socketOpen&&n.props.toggleSocket(),n}return Object(g.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"logout"},o.a.createElement(w.a,{to:"/settings"}))}}]),t}(o.a.Component),D=n(35),M=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).containerEl=document.createElement("div"),n.externalWindow=null,n}return Object(g.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.externalWindow=window.open("http://localhost:3000/jiveauth.php#access_token=eyJhbGciOiJIUzUxMiJ9.eyJzY3AiOiJjYWxscy52Mi5pbml0aWF0ZSB1c2Vycy52MS5saW5lcy5yZWFkIGNyLnYxLnJlYWQiLCJzdWIiOiJzaGllbGRzZXJpYzI1QGdtYWlsLmNvbSIsImlzcyI6ImRlZmF1bHQiLCJ0eXAiOiJhY2Nlc3MiLCJnbnQiOiJlY2Y1ZmM3YS1jMzI3LTQ0M2YtYWIwYi1lMjQ5MWRiNWY3M2EiLCJleHAiOjE1NjAzNzc2NDMsImp0aSI6IjZjZjNjOTc0LWVlZTYtNGMxZi1iOTA1LTIyNDUxZDU2NDY1YiIsImNpZCI6ImY3MDM1OWE5LWNiMDAtNDAxZC05YWQyLWIxZmE4OTY1N2E2OSJ9.tKev6Tk1hb78r7shDXdCByxCGaM8lpe6C4EPYFLtSFgf-vMnqJhdgQXdw3T3CGW_WCRrf6PaJC3sge_ZpqnAOw&type=bearer&expires_in=2592000000&username=shieldseric25@gmail.com","window","toolbar=no,menubar=no,resizable=no,height=550,location=no,width=400"),this.externalWindow.document.body.appendChild(this.containerEl)}},{key:"componentWillUnmount",value:function(){console.log("closing login window...."),this.externalWindow&&this.externalWindow.close()}},{key:"render",value:function(){return localStorage.getItem("token")?o.a.createElement(w.a,{to:"/settings"}):i.a.createPortal(this.props.children,this.containerEl)}}]),t}(o.a.PureComponent),A=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={showWindowPortal:!0},n.toggleWindowPortal=n.toggleWindowPortal.bind(Object(m.a)(Object(m.a)(n))),n.timerID=null,n}return Object(g.a)(t,e),Object(c.a)(t,[{key:"checkForLogin",value:function(){console.log("Check login hit"),localStorage.getItem("token")&&this.toggleWindowPortal()}},{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval(function(){return e.checkForLogin()},2e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"toggleWindowPortal",value:function(){this.setState(function(e){return Object(D.a)({},e,{showWindowPortal:!1})})}},{key:"render",value:function(){return this.state.showWindowPortal?(console.log("Login Portal rendered..."),localStorage.clear(),o.a.createElement("div",{className:"login"},o.a.createElement("p",null,"Logging in..."),o.a.createElement("div",{className:"test"},o.a.createElement(M,null)))):(console.log("Login Redirecting to settings..."),o.a.createElement(w.a,{to:"/settings"}))}}]),t}(o.a.Component),W=n(32),J=n.n(W),T=n(34),x=n(20),P=n.n(x),z=n(33),Y=n.n(z),F=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={timer:0,counterActive:!1},n.interval=null,n.setTimer=n.setTimer.bind(Object(m.a)(Object(m.a)(n))),n.incrementTime=n.incrementTime.bind(Object(m.a)(Object(m.a)(n))),n}return Object(g.a)(t,e),Object(c.a)(t,[{key:"setTimer",value:function(){var e=this;this.setState({counterActive:!0}),this.interval=setInterval(function(){return e.incrementTime()},1e3)}},{key:"toHHMMSS",value:function(e){var t=parseInt(e,10);return[Math.floor(t/3600)%24,Math.floor(t/60)%60,t%60].map(function(e){return e<10?"0"+e:e}).filter(function(e,t){return"00"!==e||t>0}).join(":")}},{key:"incrementTime",value:function(){this.setState({timer:this.state.timer+1}),this.props.callEnded&&this.stopTimer()}},{key:"stopTimer",value:function(){clearInterval(this.interval)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"componentDidMount",value:function(){this.setTimer()}},{key:"render",value:function(){return o.a.createElement("div",null,"Call Length: ",this.toHHMMSS(this.state.timer))}}]),t}(o.a.Component),B=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={isPaneOpen:!1,callComplete:!1,callStarted:!1,callCount:0},n.interval=null,n}return Object(g.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){P.a.setAppElement(this.el)}},{key:"chackForCallEnd",value:function(){this.props.callEnded&&(this.setState({callComplete:!0,callStarted:!1}),clearInterval(this.interval))}},{key:"openPane",value:function(){var e=this;console.log("Open pane called"),this.state.isPaneOpen&&this.setState({isPaneOpen:!0},function(){this.props.clearPop()}),this.setState({isPaneOpen:!0,callStarted:!0,callComplete:!1,callCount:this.state.callCount+1}),this.interval=setInterval(function(){return e.chackForCallEnd()},1e3)}},{key:"closePane",value:function(){this.setState({isPaneOpen:!1},function(){this.props.clearPop()}),this.setState({callComplete:!1,callCount:0}),clearInterval(this.interval)}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{ref:function(t){return e.el=t}},o.a.createElement(Y.a,{closeIcon:o.a.createElement("div",{className:"closePop"}),isOpen:this.state.isPaneOpen,closeTimeoutMS:"500",title:"Call Information",from:"bottom",width:"500px",onRequestClose:function(){return e.closePane()}},o.a.createElement("div",{className:"callInfo"},this.props.callData," ",o.a.createElement(F,{key:this.state.callCount,callEnded:this.state.callComplete,callStarted:this.state.callStarted}))))}}]),t}(o.a.Component),q=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={frames:[],keepalivesCount:0,callEnded:!1},n.clearFrames=n.clearFrames.bind(Object(m.a)(Object(m.a)(n))),n}return Object(g.a)(t,e),Object(c.a)(t,[{key:"timeConverter",value:function(e){var t=new Date(e),n=t.getFullYear(),a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],o=t.getDate(),l=t.getHours(),i="0"+t.getMinutes(),r="0"+t.getSeconds();return o+" "+a+" "+n+" "+l+":"+i.substr(-2)+":"+r.substr(-2)}},{key:"clearFrames",value:function(){console.log("Clear frames called"),this.setState({frames:[]},function(){console.log("Frames cleared")})}},{key:"processSocketMessage",value:function(e,t,n){var a,o,l="";switch(e.data&&(o=e.data.display,a=e.data.created),e.type){case"announce":a&&t-1e5<a&&(this.state.frames.length>0&&this.clearFrames(),this.setState({callEnded:!1}),this.popref.openPane(),l="recipient"===e.data.direction?"New call incoming from "+o+" @ "+n:"Calling out to "+o+" started @ "+n);break;case"replace":switch(e.data.state){case"trying":l="recipient"===e.data.direction?"Call incoming from "+o+" is trying to connect":"Call out to "+o+" is trying to connect";break;case"early":l="Call is ringing";break;case"confirmed":l="Call Connected @ "+n;break;default:l="An error occurred"}break;case"withdraw":console.log("Withdraw hit"),this.setState({callEnded:!0},function(){console.log("callEnded state set to true")}),l="Call ended @ "+n;break;case"keepalive":l="keep alive received";break;default:console.log("An error occurred"),l=""}return l}},{key:"handleData",value:function(){console.log("Message parser handling data");var e,t=(new Date).getTime(),n=this.timeConverter(t),a=JSON.parse(this.props.newMessage);e=this.processSocketMessage(a,t,n),console.log("Message is "+e),""===e?console.log("Socket message discarded"):"keep alive received"!==e?(this.setState({frames:[].concat(Object(T.a)(this.state.frames),[e])}),this.state.frames.length>10&&this.clearFrames()):this.state.keepalivesCount>100?this.setState({keepalivesCount:0}):this.setState({keepalivesCount:this.state.keepalivesCount+1})}},{key:"render",value:function(){var e=this,t=this.state.frames.map(function(e){return o.a.createElement("li",{key:e.toString()},e)});return this.props.socketopen&&localStorage.getItem("ws")?o.a.createElement("div",{className:"callpop"},"Socket Status: Connected",o.a.createElement(B,{ref:function(t){e.popref=t},callData:t,clearPop:this.clearFrames,callEnded:this.state.callEnded})):o.a.createElement("p",null,"Socket Status: Not Connected")}}]),t}(o.a.PureComponent),R=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={showSocket:!1,socketConnected:!1,currentMessage:"",lineSubscribed:!1,url:""},n.timer=null,n.keepAliveTimer=null,n}return Object(g.a)(t,e),Object(c.a)(t,[{key:"subscribeLine",value:function(){var e=this,t=localStorage.getItem("subscriptions"),n=localStorage.getItem("token"),a=localStorage.getItem("selectedLineID"),o=localStorage.getItem("organizationID"),l=localStorage.getItem("selectedLine");if(a){console.log("Attempting to subscribe to line "+a);var i={"Content-Type":"application/json",Authorization:"Bearer "+n},r=JSON.stringify([{id:l,type:"dialog",entity:{id:a,type:"line",account:o}}]);v.a.post(t,r,{headers:i}).then(function(t){console.log(t.data),e.setState({lineSubscribed:!0})}).catch(function(e){return console.log(e),e.response?e.response:e})}}},{key:"getSession",value:function(){console.log("Getting session info...");var e={Authorization:"Bearer "+localStorage.getItem("token")};return v.a.post("https://realtime.jive.com/v2/session",null,{headers:e}).then(function(e){return console.log(e),e.data}).catch(function(e){return console.log(e),e.response?e.response:e})}},{key:"handleData",value:function(e){clearInterval(this.keepAliveTimer),this.setState({currentMessage:e,socketConnected:!0},function(){var e=this;this.mpref.handleData(),this.keepAliveTimer=setInterval(function(){return e.websocketError()},6e4)})}},{key:"connectSocket",value:function(){var e=this;console.log("Attempting to connect to websocket..."),localStorage.removeItem("ws"),localStorage.removeItem("subscriptions"),localStorage.removeItem("session"),localStorage.getItem("selectedLineID")?this.getSession().then(function(t){t.ws&&(localStorage.setItem("ws",t.ws),localStorage.setItem("subscriptions",t.subscriptions),localStorage.setItem("session",t.self),console.log("Session info saved on reconnect"),e.setState({socketConnected:!0,showSocket:!0,url:t.ws},function(){this.subscribeLine(),this.props.toggleSocket()}))}):console.log("No line selected, unable to connect to socket")}},{key:"checkForWS",value:function(){console.log("CheckForWS called");var e=localStorage.getItem("ws"),t=localStorage.getItem("selectedLineID");t&&!e?(this.connectSocket(),this.toggleSocket()):t&&e?this.toggleSocket():console.log("No line selected")}},{key:"websocketError",value:function(){console.log("No frames for 60 seconds, requesting new session"),this.setState({socketConnected:!1,showSocket:!1,url:"",lineSubscribed:!1},function(){this.props.toggleSocket(),localStorage.getItem("token")&&this.connectSocket()})}},{key:"toggleSocket",value:function(){var e=this;console.log("Toggle Socket called"),this.setState(function(e){return{showSocket:!0,retryCount:0,socketConnected:!0}}),this.state.lineSubscribed||this.subscribeLine(),clearInterval(this.timer),this.props.toggleSocket(),this.keepAliveTimer=setInterval(function(){return e.websocketError()},6e4)}},{key:"componentDidMount",value:function(){var e=this;this.timer=setInterval(function(){return e.checkForWS()},5e3),localStorage.getItem("ws")&&this.setState({url:localStorage.getItem("ws")})}},{key:"componentWillUnmount",value:function(){console.log("WebSock will unmount called"),this.timer&&clearInterval(this.timer),this.keepAliveTimer&&clearInterval(this.keepAliveTimer)}},{key:"render",value:function(){var e=this;return this.props.socketOpen&&this.state.url?o.a.createElement("div",{className:"callpop"},o.a.createElement(J.a,{url:this.state.url,onMessage:this.handleData.bind(this)}),o.a.createElement(q,{ref:function(t){e.mpref=t},newMessage:this.state.currentMessage,socketopen:this.state.showSocket})):localStorage.getItem("token")&&localStorage.getItem("selectedLineID")?o.a.createElement("p",null,"Trying to connect socket..."):o.a.createElement("span",null)}}]),t}(o.a.PureComponent),Z=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={dialString:"none"},n}return Object(g.a)(t,e),Object(c.a)(t,[{key:"updateInputValue",value:function(e){""===e.target.value?this.setState({dialString:"none"}):this.setState({dialString:e.target.value})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"callbox"},o.a.createElement("div",{className:"left"},o.a.createElement("input",{type:"search",pattern:"[0-9]*",maxLength:"15",placeholder:"Enter number to call...",onChange:function(t){return e.updateInputValue(t)}})),o.a.createElement("div",{className:"right"},o.a.createElement(f,{dialString:this.state.dialString,fromCallBox:!0})))}}]),t}(o.a.Component),G=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={username:"",startDate:"",endDate:"",data:"",error:""},n.submitRequest=n.submitRequest.bind(Object(m.a)(Object(m.a)(n))),n}return Object(g.a)(t,e),Object(c.a)(t,[{key:"handleNameChange",value:function(e){this.setState({username:e.target.value})}},{key:"handleStartTimeChange",value:function(e){this.setState({startDate:e.target.value})}},{key:"handleEndTimeChange",value:function(e){this.setState({endDate:e.target.value})}},{key:"submitRequest",value:function(e){var t=this;e.preventDefault();var n=localStorage.getItem("username");if(console.log("Submit request called"),localStorage.getItem("token")){console.log("Attempting to get call report...");var a={Authorization:"Bearer "+localStorage.getItem("token")},o=localStorage.getItem("organizationID");v.a.get("https://api.jive.com/call-reports/v1/reports/user-activity?organizationId="+o+"&startTime=2019-05-01T00%3A00%3A00&endTime=2019-05-14T23%3A59%3A59&userIds[0]="+n,{headers:a}).then(function(e){console.log(e);var n=JSON.stringify(e.data.items);t.setState({data:n})}).catch(function(e){console.log(e);var n="An error occurred, Call Report request failed"+JSON.stringify(e);t.setState({error:n})})}else console.log("Not logged in, unable to process request"),this.setState({error:"Not logged in, unable to process request"})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement("form",{onSubmit:this.submitRequest},o.a.createElement("label",null,"JiveID:",o.a.createElement("input",{type:"text",value:this.state.username,onChange:function(t){return e.handleNameChange(t)}})),o.a.createElement("br",null),o.a.createElement("label",null,"Start date:",o.a.createElement("input",{type:"text",value:this.state.startDate,onChange:function(t){return e.handleStartTimeChange(t)}})),o.a.createElement("br",null),o.a.createElement("label",null,"End dare:",o.a.createElement("input",{type:"text",value:this.state.endDate,onChange:function(t){return e.handleEndTimeChange(t)}})),o.a.createElement("br",null),o.a.createElement("input",{type:"submit",value:"Submit Request"})),o.a.createElement("br",null),this.state.data,this.state.error)}}]),t}(o.a.Component),H=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={loggedIn:!1,socketOpen:!1},n.toggleLogin=n.toggleLogin.bind(Object(m.a)(Object(m.a)(n))),n.toggleSocket=n.toggleSocket.bind(Object(m.a)(Object(m.a)(n))),n}return Object(g.a)(t,e),Object(c.a)(t,[{key:"toggleLogin",value:function(){this.setState({loggedIn:!this.state.loggedIn},function(){})}},{key:"toggleSocket",value:function(){this.setState({socketOpen:!this.state.socketOpen},function(){})}},{key:"componentWillMount",value:function(){localStorage.getItem("token")&&this.setState({loggedIn:!0})}},{key:"render",value:function(){var e,t=this;return this.state.loggedIn&&(e=o.a.createElement("footer",{className:"websocket"},o.a.createElement(R,{toggleSocket:this.toggleSocket,socketOpen:this.state.socketOpen}))),o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement(Z,null),o.a.createElement("img",{src:d.a,className:"App-logo",alt:"logo"}),o.a.createElement("div",{className:"links"},o.a.createElement(O.a,{to:"/"},"Home"),o.a.createElement("div",{className:"divider"}),o.a.createElement(O.a,{to:"/contacts"},"Contacts"),o.a.createElement("div",{className:"divider"}),o.a.createElement(O.a,{to:"/settings"},"Settings"))),o.a.createElement("div",{className:"main"},o.a.createElement(k.a,null,o.a.createElement(I.a,{exact:!0,path:"/",component:C}),o.a.createElement(I.a,{exact:!0,path:"/contacts",component:E}),o.a.createElement(I.a,{exact:!0,path:"/settings",render:function(e){return o.a.createElement(j,Object.assign({},e,{isLoggedIn:t.state.loggedIn,toggleLogin:t.toggleLogin}))}}),o.a.createElement(I.a,{exact:!0,path:"/login",render:function(e){return o.a.createElement(A,Object.assign({},e,{isLoggedIn:t.state.loggedIn}))}}),o.a.createElement(I.a,{path:"/contact/:number",component:S}),o.a.createElement(I.a,{path:"/logout",render:function(e){return o.a.createElement(N,Object.assign({},e,{toggleLogin:t.toggleLogin,toggleSocket:t.toggleSocket,socketOpen:t.state.socketOpen}))}}),o.a.createElement(I.a,{path:"/jiveauth.php",render:function(e){return o.a.createElement(L,Object.assign({},e,{isLoggedIn:t.state.loggedIn,toggleLogin:t.toggleLogin}))}}),o.a.createElement(I.a,{exact:!0,path:"/reports",render:function(e){return o.a.createElement(G,Object.assign({},e,{isLoggedIn:t.state.loggedIn,toggleLogin:t.toggleLogin}))}}))),e)}}]),t}(a.Component),Q=function(){return o.a.createElement("div",{className:"mainapp"},o.a.createElement(H,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var U=n(77);i.a.render(o.a.createElement(U.a,null,o.a.createElement(Q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[36,2,1]]]);
//# sourceMappingURL=main.2e4ab178.chunk.js.map