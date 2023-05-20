// ==UserScript==
// @name	Automatic Site Refresher
// @namespace	https://github.com/Cowrod/userscript
// @match	*://*/*
// @match	*://*/
// @grant	GM_getValue
// @grant	GM_setValue
// @grant	GM_deleteValue
// @grant GM_registerMenuCommand
// @author	Cowrod
// @version	0.0.3
// @updateURL	https://raw.githubusercontent.com/Cowrod/userscript/main/auto_refresher.js
// @downloadURL	https://raw.githubusercontent.com/Cowrod/userscript/main/auto_refresher.js
// @run-at	document-end
// @description	Simple Site Refresher
// ==/UserScript==

var lastRenew = new Date().valueOf()
function formatTime($){let o=$/1e3;if(o<1)return $+" millisecond(s)";if(o<60)return o+" second(s)";if(o<3600){let r;return Math.floor(o/60)+" minute(s) and "+(o=Math.floor(o%60))+" second(s)"}if(o<86400){let e=Math.floor(o/3600),s;return e+" hour(s), "+Math.floor((o%=3600)/60)+" minute(s), and "+(o=Math.floor(o%60))+" second(s)"}if(o<2592e3){let l=Math.floor(o/86400),f=Math.floor((o%=86400)/3600),n=Math.floor((o%=3600)/60);return l+" day(s), "+f+" hour(s), "+n+" minute(s), and "+(o=Math.floor(o%60))+" second(s)"}else if(o<31536e3){let t=Math.floor(o/2592e3),u=Math.floor((o%=2592e3)/86400),d=Math.floor((o%=86400)/3600),i=Math.floor((o%=3600)/60);return t+" month(s), "+u+" day(s), "+d+" hour(s), "+i+" minute(s), and "+(o=Math.floor(o%60))+" second(s)"}else{let a=Math.floor(o/31536e3),m=Math.floor((o%=31536e3)/2592e3),c=Math.floor((o%=2592e3)/86400),h=Math.floor((o%=86400)/3600),_=Math.floor((o%=3600)/60);return a+" year(s), "+m+" month(s), "+c+" day(s), "+h+" hour(s), "+_+" minute(s), and "+(o=Math.floor(o%60))+" second(s)"}}
function betterRandom(min,max){if(min&&!max){var max=min;var min=0};var min=Number(min)||0;var max=Number(max)||1;const minmax=((n,m)=>{if(n>m){return[m,n]};if(n==m){return[n,m+1e-323]};return[n,m]})(((min==0||min==-0)&&1e-323||min),((max==0||max==-0)&&1e-323||max));if(minmax[0]>-0&&minmax[1]>-0){return(Math.random()*minmax[1])-minmax[0]}else{if(minmax[0]<0&&minmax[1]>-0){return(Math.random()*(minmax[1]+ -minmax[0]))+minmax[0]}else{if(minmax[0]<0&&minmax[1]<0){return(Math.random()*minmax[1])-minmax[0]}}}}


// Refresher
function Preload(){if(Number(GM_getValue(location.href))){if(GM_getValue("debug")){console.log("will refresh in "+formatTime(GM_getValue(location.href))+" if refresh still on")}setTimeout(()=>{if(GM_getValue(location.href)){if(GM_getValue("debug")){console.log("refreshed in "+formatTime(new Date().valueOf()-lastRenew))};lastRenew=new Date().valueOf();location.reload()}},betterRandom(GM_getValue("min")||0,GM_getValue("max")||1))}}

// Main Loop
function load(){var startData=GM_getValue(location.href);const loop=setInterval(()=>{if(!(GM_getValue(location.href)==startData)){clearInterval(loop);if(Number(GM_getValue(location.href))){if(GM_getValue("debug")){console.log("refreshed loop in "+formatTime(new Date().valueOf()-lastRenew))};lastRenew=new Date().valueOf();load()}}else{if(GM_getValue("debug")){console.log("fired refresh in "+formatTime(new Date().valueOf()-lastRenew))};Preload()}},startData)}

// Precheck
if (GM_getValue(window.location.href)){load();if(GM_getValue("debug")){console.log("Refresher Is Online "+formatTime(GM_getValue(location.href)))}}

// Toggle
GM_registerMenuCommand("Toggle Site Refresher",()=>{if(!Number(GM_getValue(location.href))){var delay=prompt("Set Auto Refresh Rate","1000 (1 second in milisecond)");if(Number(delay)){GM_setValue(location.href, delay);if(GM_getValue("debug")){console.log("started loop in "+formatTime(new Date().valueOf()-lastRenew))};lastRenew=new Date().valueOf();load()}}else{GM_deleteValue(location.href)}alert("Auto Site Refresher Is "+(GM_getValue(location.href)&&"Online And Set To "+GM_getValue(location.href)+"ms"||"Offline"))})
GM_registerMenuCommand("Toggle Debug Mode",()=>{GM_setValue("debug",!GM_getValue("debug"));alert("Auto Refresher Debug State: "+(GM_getValue("debug")&&"On"||"Off"))})
GM_registerMenuCommand("Change Minimum Value",()=>{var delay = prompt("Enter New Minimum Value [Min Value: "+GM_getValue("min")+"]", "1000 (1 second in milisecond)");if(Number(delay)){GM_setValue("min",delay)}alert("Minimum Is Set To "+GM_getValue("min")+"ms")})
GM_registerMenuCommand("Change Maximum Value",()=>{var delay=prompt("Enter New Maximum Value [Min Value: "+GM_getValue("max")+"]", "1000 (1 second in milisecond)");if(Number(delay)){GM_setValue("max",delay)}alert("Maximum Is Set To "+GM_getValue("max")+"ms")})
GM_registerMenuCommand("View Stats",()=>{alert("Refresher State: "+(GM_getValue(location.href)&&"Online\nRefresher Rate: "+GM_getValue(location.href)+"ms\n"||"Offline\n")+"Minimum Random Value: "+(Number(GM_getValue("min"))&&GM_getValue("min")+"ms"||"null")+"\nMaximum Random Value: "+(Number(GM_getValue("max"))&&GM_getValue("max")+"ms"||"null")+"\nDebugger State: "+(GM_getValue("debug")&&"On"||"Off"))})
