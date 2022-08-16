(function(){"use strict";var e={1469:function(e,t,n){var o=n(9242),r=n(3396),i=n(7139);const s={class:"flex"},l={class:"flex"};function c(e,t,n,o,c,u){const a=(0,r.up)("PiecesContainer"),f=(0,r.up)("BoardLetters"),d=(0,r.up)("BoardNumbers"),p=(0,r.up)("HistoryTable");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",s,[(0,r.Wm)(a,{color:"WHITE"}),(0,r._)("div",null,[(0,r.Wm)(f),(0,r._)("div",l,[(0,r.Wm)(d),(0,r._)("div",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.gameBoard,((t,n)=>((0,r.wg)(),(0,r.iD)("div",{key:t[0],class:"row"},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t,((t,o)=>((0,r.wg)(),(0,r.iD)("div",{key:t,class:"cell"},(0,i.zw)(e.getPieceNaming([n,o])),1)))),128))])))),128))]),(0,r.Wm)(d)]),(0,r.Wm)(f)]),(0,r.Wm)(a,{color:"BLACK"})]),(0,r._)("button",{onClick:t[0]||(t[0]=(...t)=>e.onRestartGame&&e.onRestartGame(...t))},"new simulation"),(0,r._)("button",{onClick:t[1]||(t[1]=(...t)=>e.onStartHandler&&e.onStartHandler(...t))},"start"),(0,r._)("button",{onClick:t[2]||(t[2]=(...t)=>e.onPauseHandler&&e.onPauseHandler(...t))},"pause"),(0,r.Wm)(p,{onOnPauseHandler:e.onPauseHandler},null,8,["onOnPauseHandler"])],64)}var u,a=n(4870),f=n(65);(function(e){e["SETUP_PIECES_ON_BOARD"]="SETUP_PIECES_ON_BOARD",e["START_GAME"]="START_GAME",e["UNDO_HISTORY"]="UNDO_HISTORY",e["RESTART_GAME"]="RESTART_GAME"})(u||(u={}));const d=["A","B","C","D","E","F","G","H"],p=()=>({piecePosition:{},history:[],currentHistory:[]}),P=8,h={class:"flex board_part"};function _(e,t,n,o,s,l){return(0,r.wg)(),(0,r.iD)("div",h,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.boardLetters,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e},(0,i.zw)(e),1)))),128))])}var m=(0,r.aZ)({name:"BoardLetters",setup(){return{boardLetters:d}}}),v=n(89);const g=(0,v.Z)(m,[["render",_]]);var H=g;const y={class:"board_part"};function E(e,t,n,o,s,l){return(0,r.wg)(),(0,r.iD)("div",y,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(Array.from({length:e.BOARD_LENGTH},((e,t)=>t+1)),(e=>((0,r.wg)(),(0,r.iD)("div",{key:e},(0,i.zw)(e),1)))),128))])}var w=(0,r.aZ)({name:"BoardNumbers",setup(){return{BOARD_LENGTH:P}}});const D=(0,v.Z)(w,[["render",E]]);var O=D;const T={class:"pieces-container"};function b(e,t,n,o,s,l){return(0,r.wg)(),(0,r.iD)("div",T,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.getUserPieces(e.color),(e=>((0,r.wg)(),(0,r.iD)("div",{key:e},(0,i.zw)(e),1)))),128))])}const B=(e,t)=>t[e].every((e=>null!==e)),A=(e,t)=>Object.keys(e).filter((n=>e[n].every((e=>null!==e))&&n.includes(t))),S=e=>{const t=A(e,"WHITE");return t[t.length*Math.random()<<0]},R=e=>{const t=A(e,"BLACK");return t[t.length*Math.random()<<0]},N=([e,t])=>{const n=[],o=[{cellDiff:1,rowDiff:-2},{cellDiff:2,rowDiff:-1},{cellDiff:1,rowDiff:2},{cellDiff:2,rowDiff:1},{cellDiff:-1,rowDiff:2},{cellDiff:-2,rowDiff:1},{cellDiff:-2,rowDiff:-1},{cellDiff:-1,rowDiff:-2}];return o.forEach((({cellDiff:o,rowDiff:r})=>{t+o<P&&t+o>=0&&e+r<P&&e+r>=0&&n.push([e+r,t+o])})),n},I=([e,t],n,o)=>{let r=t+1,i=t-1;const s=[];while(e+o<P&&e+o>=0)r<P&&(s.push([e+o,r]),n.some((t=>t[0]===e+o&&t[1]===r))?r=P:r++),i>=0&&(s.push([e+o,i]),n.some((t=>t[0]===e+o&&t[1]===i))?i=-1:i--),o>0?o++:o--;return s},C=([e,t],n)=>{const o=[...I([e,t],n,1),...I([e,t],n,-1)];return o},k=([e,t],n,o=!1)=>{const r=[];let i=t+1,s=t-1;while(i<P&&s>=0){const l=[o?[i,t]:[e,i],o?[s,t]:[e,s]];r.push(...l),n.some((e=>e[0]===l[0][0]&&e[1]===l[0][1]))?i=P:i++,n.some((e=>e[0]===l[1][0]&&e[1]===l[1][1]))?s=-1:s--}return r},G=([e,t],n)=>{const o=[...C([e,t],n),...k([e,t],n),...k([e,t],n,!0)];return o},M=e=>e[Math.floor(Math.random()*e.length)],K=({pieceName:e,piecePosition:t})=>{const n=t[e];let o=[];const r=Object.keys(t).filter((t=>t!==e)).map((e=>t[e]));return e.includes("KNIGHT")&&(o=N(n)),e.includes("BISHOP")&&(o=C(n,r)),e.includes("QUEEN")&&(o=G(n,r)),M(o)};var U={getPiecesByColor:A},W=(0,r.aZ)({name:"PiecesContainer",props:{color:String},setup(e){const{state:t}=(0,f.oR)(),n=(0,r.Fl)((()=>t.piecePosition)),o=e=>U.getPiecesByColor(n.value,e);return{getUserPieces:o,...e}}});const j=(0,v.Z)(W,[["render",b]]);var L=j;const x=(0,r._)("thead",null,[(0,r._)("th",null,"Piece"),(0,r._)("th",null,"from"),(0,r._)("th",null,"to")],-1),Y=["onClick"];function Z(e,t,n,o,s,l){return(0,r.wg)(),(0,r.iD)("table",null,[x,(0,r._)("tbody",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.history,((t,n)=>((0,r.wg)(),(0,r.iD)("tr",{key:t.piece+t.prev+t.to,onClick:t=>e.undoHistory(n)},[(0,r._)("td",null,(0,i.zw)(t.piece),1),(0,r._)("td",null,(0,i.zw)(e.gameBoard[t.from[0]][t.from[1]]),1),(0,r._)("td",null,(0,i.zw)(e.gameBoard[t.to[0]][t.to[1]]),1)],8,Y)))),128))])])}var z;(function(e){e["W_KNIGHT"]="WHITE_KNIGHT",e["W_BISHOP"]="WHITE_BISHOP",e["W_QUEEN"]="WHITE_QUEEN",e["B_KNIGHT"]="BLACK_KNIGHT",e["B_BISHOP"]="BLACK_BISHOP",e["B_QUEEN"]="BLACK_QUEEN"})(z||(z={}));const F=[];for(let ne=0;ne<P;ne++){const e=[];for(let t=0;t<P;t++)e[t]=d[t]+(ne+1);F.push(e)}var Q=(0,f.MT)({state:p(),getters:{getPieceByCellPosition:e=>([t,n])=>{const o=Object.keys(e.piecePosition).find((o=>e.piecePosition[o][0]===t&&e.piecePosition[o][1]===n));if(!o)return"-";const r=o.split("_");return r[0][0]+r[1][0]}},mutations:{[u.SETUP_PIECES_ON_BOARD](e){const t=Array.from(Object.values(z));let n=0;while(6!==n){const o=Math.floor(Math.random()*P),r=Math.floor(Math.random()*P);if(!Object.values(e.piecePosition).find((e=>e[0]===o&&e[1]===r))){const i=t.pop();e.piecePosition[i]=[o,r],n++}}},[u.START_GAME](e){e.history=[...e.history.slice(0,e.currentHistory.length)];const t=Object.keys(e.piecePosition).filter((t=>B(t,e.piecePosition)));if(t.length>1&&0!==t.filter((e=>e.includes("WHITE"))).length&&0!==t.filter((e=>e.includes("BLACK"))).length){const t=e.history.length%2===0?S(e.piecePosition):R(e.piecePosition),n=K({pieceName:t,piecePosition:e.piecePosition}),o=Object.keys(e.piecePosition).find((t=>e.piecePosition[t][0]===n[0]&&e.piecePosition[t][1]===n[1]))||null,r={piece:t,from:e.piecePosition[t],to:n,capturedPiece:o,capturedPiecePosition:o?e.piecePosition[o]:[null,null]};e.history.push(r),e.currentHistory.push(r),e.piecePosition[t]=n,o&&(e.piecePosition[o]=[null,null])}},[u.UNDO_HISTORY](e,t){const n=e.history,o=t.idx>e.currentHistory.length-1,r=o?e.currentHistory.length:e.currentHistory.length-1;for(let i=r;o?i<=t.idx:i>=t.idx;o?i++:i--){const t=n[i],{to:r,from:s,piece:l,capturedPiece:c,capturedPiecePosition:u}=t;e.piecePosition[l]=o?r:s,o?e.currentHistory.push(t):e.currentHistory.pop(),c&&(e.piecePosition[c]=o?[null,null]:u)}},[u.RESTART_GAME](e){Object.assign(e,p())}},actions:{},modules:{}}),q=(0,r.aZ)({name:"HistoryTable",emits:["onPauseHandler"],setup(e,{emit:t}){const{state:n,commit:o}=(0,f.oR)(),i=(0,r.Fl)((()=>n.history)),s=e=>{t("onPauseHandler"),o(u.UNDO_HISTORY,{idx:e})};return{history:i,undoHistory:s,gameBoard:F}}});const J=(0,v.Z)(q,[["render",Z]]);var V=J,X=(0,r.aZ)({name:"App",components:{BoardLetters:H,BoardNumbers:O,PiecesContainer:L,HistoryTable:V},setup(){const{commit:e,getters:t}=(0,f.oR)();(0,r.wF)((()=>{e(u.SETUP_PIECES_ON_BOARD)}));const n=(0,a.iH)(),o=()=>{n.value||(n.value=setInterval((()=>{e(u.START_GAME)}),200))},i=()=>{n.value&&(clearInterval(n.value),n.value=0)},s=()=>{i(),e(u.RESTART_GAME),e(u.SETUP_PIECES_ON_BOARD)};return{gameBoard:F,history:history,boardLetters:d,getPieceNaming:t.getPieceByCellPosition,onStartHandler:o,onPauseHandler:i,onRestartGame:s}}});const $=(0,v.Z)(X,[["render",c]]);var ee=$;const te=(0,o.ri)(ee);te.use(Q).mount("#app")}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,i){if(!o){var s=1/0;for(a=0;a<e.length;a++){o=e[a][0],r=e[a][1],i=e[a][2];for(var l=!0,c=0;c<o.length;c++)(!1&i||s>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[c])}))?o.splice(c--,1):(l=!1,i<s&&(s=i));if(l){e.splice(a--,1);var u=r();void 0!==u&&(t=u)}}return t}i=i||0;for(var a=e.length;a>0&&e[a-1][2]>i;a--)e[a]=e[a-1];e[a]=[o,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,s=o[0],l=o[1],c=o[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(r in l)n.o(l,r)&&(n.m[r]=l[r]);if(c)var a=c(n)}for(t&&t(o);u<s.length;u++)i=s[u],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(a)},o=self["webpackChunkvue_chess"]=self["webpackChunkvue_chess"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(1469)}));o=n.O(o)})();
//# sourceMappingURL=app.a8c0c604.js.map