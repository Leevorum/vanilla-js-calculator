const{calculatorNumbers:t,calculatorFunctions:e,calcFirstNumber:n,calcSecondNumber:o,calcSign:r}={calcFirstNumber:document.querySelector(".calculator-first-number"),calcSecondNumber:document.querySelector(".calculator-second-number"),calcSign:document.querySelector(".calculator-sign"),calculatorNumbers:document.querySelector(".calculator-numbers"),calculatorFunctions:document.querySelector(".calculator-functions")};let c="",a="",u="",x="";const C=t=>{"BUTTON"===t.target.nodeName&&("."===t.target.textContent&&n.textContent.indexOf(".")>=0&&o.textContent.indexOf(".")>=0||(""!==x&&s(),""===a&&""===u?(""===c&&(n.textContent=""),c+=t.target.textContent,n.textContent+=t.target.textContent):(a+=t.target.textContent,o.textContent+=t.target.textContent)))},l=t=>{if("BUTTON"===t.target.nodeName)if("+/-"!==t.target.textContent){if("="!==t.target.textContent&&"AC"!==t.target.textContent)return u=t.target.textContent,void(r.textContent=u);if("AC"===t.target.textContent&&(s(),r.textContent="0"),"="===t.target.textContent)switch(""===a&&(a=c),""===c&&(c="0"),u){case"+":n.textContent=Number(c)+Number(a),x=n.textContent;break;case"-":n.textContent=Number(c)-Number(a),x=n.textContent;break;case"*":n.textContent=Number(c)*Number(a),x=n.textContent;break;case"%":n.textContent=Number(c)*Number(a)/100,x=n.textContent;break;case"/":if("0"===a)return void(n.textContent="Error");n.textContent=Number(c)/Number(a),x=n.textContent;break;default:console.log("Sorry, we are no support this functions")}console.log(x),a="",o.textContent="",u="",r.textContent=""}else-1===Math.sign(c)?(c=Math.abs(c),n.textContent=c,r.textContent=""):(c=-c,n.textContent=c,r.textContent="")},s=()=>{c="",a="",u="",x="",n.textContent="0",o.textContent="",r.textContent=""};t.addEventListener("click",C),e.addEventListener("click",l);
//# sourceMappingURL=index.58790c12.js.map
