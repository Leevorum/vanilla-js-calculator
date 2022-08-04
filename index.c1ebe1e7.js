const{calculator:t,container:e,calculatorNumbers:n,calculatorFunctions:o,calcFirstNumber:r,calcSecondNumber:i,calcSign:c,calculatorViewWrapper:a}={container:document.querySelector(".container"),calculator:document.querySelector(".calculator"),calcFirstNumber:document.querySelector(".calculator-first-number"),calcSecondNumber:document.querySelector(".calculator-second-number"),calcSign:document.querySelector(".calculator-sign"),calculatorNumbers:document.querySelector(".calculator-numbers"),calculatorFunctions:document.querySelector(".calculator-functions"),calculatorViewWrapper:document.querySelector(".view-wrapper")},l=["1","2","3","4","5","6","7","8","9","0","."],u=["Clear","Enter","=","/","*","-","+","%"];let s="",d="",x="",C="",m="";function f(t){return Function(` return (${t})`)()}const g=t=>{if("BUTTON"!==t.target.nodeName)return;const e=t.target.textContent.trim();if(s.length+d.length+C.length>7&&a.classList.add("large-font"),s.length+d.length+C.length>20&&(a.classList.add("medium-font"),a.classList.remove("large-font")),s.length+d.length+C.length>28&&(a.classList.add("small-font"),a.classList.remove("medium-font")),""!==C&&""===x&&S(),""===d&&""===x){if(""===s&&"."===e&&(s="0."),"0"===s&&"."!==e&&(s=""),""===s&&(r.textContent=""),"0"===s&&"0"===e)return;if("."===e&&r.textContent.indexOf(".")>=0)return;s+=e,r.textContent+=e}else{if("0"===d&&"."!==e)return d=e,void(i.textContent=d);if(""===d&&"."===e)return d="0.",void(i.textContent+=d);if("0"===d&&"0"===e)return;if("."===e&&i.textContent.indexOf(".")>=0)return;d+=e,i.textContent+=e,""!==m&&(m+=x,m+=d)}},v=t=>{if("BUTTON"!==t.target.nodeName)return;const e=t.target.textContent.trim();if("+/-"===e)return""!==s&&""!==d?-1===Math.sign(f(d))?(d=String(Math.abs(f(d))),void(i.textContent=d)):(d=`(${String(-d)})`,void(i.textContent=d)):void(-1===Math.sign(f(s))?(s=String(Math.abs(f(s))),r.textContent=s):(s=`(${String(-s)})`,r.textContent=s));if("%"===e)return""!==s&&""===d?-1===Math.sign(f(s))?(s=`(${1*f(s)/100})`,void(r.textContent=s)):(r.textContent=1*f(s)/100,void(s=r.textContent)):-1===Math.sign(f(d))?(d=`(${1*f(d)/100})`,void(i.textContent=d)):(i.textContent=1*f(d)/100,void(d=i.textContent));if("="!==e&&"AC"!==e&&"+/-"!==e)return""!==s&&""!==d&&""!==x&&(m=s+x+d,s=s+x+d,d="",r.textContent=s,i.textContent=""),x=e,void(c.textContent=x);if("AC"===e&&(S(),c.textContent="0"),(""!==s&&"0"!==s||""===x||""!==d)&&(""===s||""!==x||""!==d)){if("="===e){if(""===d&&(d=s),""===s&&(s="0"),""!==m)return C=f(m),C===1/0||C===-1/0?(C="Error",r.textContent=C,s="0",m="",d="",i.textContent="",x="",void(c.textContent="")):(!Number.isInteger(C)&&String(C).length>7&&(C=parseFloat(C.toFixed(5))),r.textContent=C,s=r.textContent,m=r.textContent,d="",i.textContent="",x="",void(c.textContent=""));if(C=f(s+x+d),C===1/0||C===-1/0)return C="Error",r.textContent=C,s="0",m="",d="",i.textContent="",x="",void(c.textContent="");!Number.isInteger(C)&&String(C).length>7&&(C=parseFloat(C.toFixed(5))),r.textContent=C,s=r.textContent,m=r.textContent,d="",i.textContent="",x="",c.textContent=""}d="",i.textContent="",x="",c.textContent=""}},y=t=>{if(l.includes(t.key))if(document.querySelector(`[data-action="${t.key}"]`)&&document.querySelector(`[data-action="${t.key}"]`).classList.add("btn-active"),s.length+d.length+C.length>7&&a.classList.add("large-font"),s.length+d.length+C.length>20&&(a.classList.add("medium-font"),a.classList.remove("large-font")),s.length+d.length+C.length>28&&(a.classList.add("small-font"),a.classList.remove("medium-font")),""!==C&&""===x&&S(),""===d&&""===x){if(""===s&&"."===t.key&&(s="0."),"0"===s&&"."!==t.key&&(s=""),""===s&&(r.textContent=""),"0"===s&&"0"===t.key)return;if("."===t.key&&r.textContent.indexOf(".")>=0)return;s+=t.key,r.textContent+=t.key}else{if("0"===d&&"."!==t.key)return d=t.key,void(i.textContent=d);if(""===d&&"."===t.key)return d="0.",void(i.textContent+=d);if("0"===d&&"0"===t.key)return;if("."===t.key&&i.textContent.indexOf(".")>=0)return;d+=t.key,i.textContent+=t.key,""!==m&&(m+=x,m+=d)}},k=t=>{if(u.includes(t.key)){if("Enter"===t.key?document.querySelector('[data-action="="]').classList.add("btn-active"):document.querySelector(`[data-action="${t.key}"]`).classList.add("btn-active"),"%"===t.key)return""!==s&&""===d?-1===Math.sign(f(s))?(s=`(${1*f(s)/100})`,void(r.textContent=s)):(r.textContent=1*f(s)/100,void(s=r.textContent)):-1===Math.sign(f(d))?(d=`(${1*f(d)/100})`,void(i.textContent=d)):(i.textContent=1*f(d)/100,void(d=i.textContent));if("="!==t.key&&"Clear"!==t.key&&"Enter"!==t.key)return""!==s&&""!==d&&""!==x&&(m=s+x+d,s=s+x+d,d="",r.textContent=s,i.textContent=""),x=t.key,void(c.textContent=x);if("Clear"===t.key&&S(),(""===s||"0"===s)&&""!==x&&""===d||""!==s&&""===x&&""===d)return;if("="===t.key||"Enter"===t.key){if(""===d&&(d=s),""===s&&(s="0"),""!==m)return C=f(m),C===1/0||C===-1/0?(C="Error",r.textContent=C,s="0",m="",d="",i.textContent="",x="",void(c.textContent="")):(!Number.isInteger(C)&&String(C).length>7&&(C=parseFloat(C.toFixed(5))),r.textContent=C,s=r.textContent,m=r.textContent,d="",i.textContent="",x="",void(c.textContent=""));if(C=f(s+x+d),C===1/0||C===-1/0)return C="Error",r.textContent=C,s="0",m="",d="",i.textContent="",x="",void(c.textContent="");!Number.isInteger(C)&&String(C).length>7&&(C=parseFloat(C.toFixed(5))),r.textContent=C,s=r.textContent,m=r.textContent,d="",i.textContent="",x="",c.textContent=""}d="",i.textContent="",x="",c.textContent=""}},h=t=>{if(l.includes(t.key)||u.includes(t.key)){if("Enter"===t.key)return void document.querySelector('[data-action="="]').classList.remove("btn-active");document.querySelector(`[data-action="${t.key}"]`).classList.remove("btn-active")}},S=()=>{s="",d="",x="",C="",m="",r.textContent="0",i.textContent="",c.textContent="",a.classList.remove("large-font"),a.classList.remove("medium-font"),a.classList.remove("small-font")};!function(e){let n=0,o=0,r=0,i=0;t.onmousedown=c;function c(t){(t=t||window.event).preventDefault(),r=t.clientX,i=t.clientY,document.onmouseup=l,document.onmousemove=a}function a(t){(t=t||window.event).preventDefault(),n=r-t.clientX,o=i-t.clientY,r=t.clientX,i=t.clientY,e.style.top=e.offsetTop-o+"px",e.style.left=e.offsetLeft-n+"px"}function l(){document.onmouseup=null,document.onmousemove=null}}(e),n.addEventListener("click",g),o.addEventListener("click",v),document.addEventListener("keydown",y),document.addEventListener("keydown",k),document.addEventListener("keyup",h);
//# sourceMappingURL=index.c1ebe1e7.js.map
