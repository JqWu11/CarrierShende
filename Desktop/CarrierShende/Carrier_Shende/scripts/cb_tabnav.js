// JavaScript Document

/* This script and many more are available free online at
The JavaScript Source :: http://javascript.internet.com
Created by: Brian McAllister :: http://www.frequency-decoder.com/ */

/*
Animated miniTabs by frequency decoder
Further information on this script can be located
on the authors Web site http://www.frequency-decoder.com/

Based on an idea by Rob L Glazebrook
(http://www.rootarcana.com/test/smartmini/)
which was derived from the original idea of Stephen Clark
(http://www.sgclark.com/sandbox/minislide/)

Changes
=======
05/03/06 : Creation
08/03/06 : Added the cleanUp method to stop IE memory leaks.

This script is distributed under a "Attribution-NonCommercial-ShareAlike 2.0" license

You are free:
  1. to copy, distribute, display, and perform the work.
  2. to make derivative works.

Under the following conditions:

  1. **Attribution*: You must attribute the work in the manner specified
     by the author or licensor.
  2. Noncommercial*: You may not use this work for commercial purposes.*
  3. Share Alike*: If you alter, transform, or build upon this work,
     you may distribute the resulting work only under a license identical to this one.
*/


var miniTab = {
  currentTab:     0,
  activeTab:      0,
  destX:          0,
  destW:          0,
  t:              0,
  b:              0,
  c:              0,
  d:              20,
  animInterval:   null,
  sliderObj:      null,
  aHeight:        0,
  
  init: function() {
    if(!document.getElementById || !document.getElementById("miniflex")) return;
    
    var ul          = document.getElementById("miniflex");
    var liArr       = ul.getElementsByTagName("li");
    var aArr        = ul.getElementsByTagName("a");
    
    for(var i = 0, li; li = liArr[i]; i++) {
      liArr[i].onmouseover = aArr[i].onfocus = function(e) {
        var pos = 0;
        var elem = this.nodeName == "LI" ? this : this.parentNode;
        while(elem.previousSibling) {
          elem = elem.previousSibling;
          if(elem.tagName && elem.tagName == "LI") pos++;
        }
        miniTab.initSlide(pos);
      }
    }

    ul.onmouseout = function(e) {
      miniTab.initSlide(miniTab.currentTab);
    };
    
    for(var i = 0; i < aArr.length; i++) {
      if(document.location.href.indexOf(aArr[i].href)>=0) {
        miniTab.activeTab = miniTab.currentTab = i;
      }
      aArr[i].style.borderBottom  = "0px";
      aArr[i].style.paddingBottom = "6px";
    }

    miniTab.slideObj                = ul.parentNode.appendChild(document.createElement("div"));
    miniTab.slideObj.appendChild(document.createTextNode(String.fromCharCode(160)));
    miniTab.slideObj.id             = "animated-tab";
    miniTab.slideObj.style.top      = (ul.offsetTop + liArr[miniTab.activeTab].offsetTop + aArr[miniTab.activeTab].offsetTop) + "px";
    miniTab.slideObj.style.left     = (ul.offsetLeft + + liArr[miniTab.activeTab].offsetLeft + aArr[miniTab.activeTab].offsetLeft) + "px";
    miniTab.slideObj.style.width    = aArr[miniTab.activeTab].offsetWidth + "px";
    miniTab.aHeight                 = ul.offsetTop + liArr[miniTab.activeTab].offsetTop + aArr[miniTab.activeTab].offsetTop;
    
    miniTab.initSlide(miniTab.activeTab, true);
    
    var intervalMethod = function() { miniTab.slideIt(); }
    miniTab.animInterval = setInterval(intervalMethod,10);
  },

  cleanUp: function() {
    clearInterval(miniTab.animInterval);
    miniTab.animInterval = null;
  },
  
  initSlide: function(pos, force) {
    if(!force && pos == miniTab.activeTab) return;
    miniTab.activeTab = pos;
    miniTab.initAnim();
  },
  
  initAnim: function() {
    var ul          = document.getElementById("miniflex");
    var liArr       = ul.getElementsByTagName("li");
    var aArr        = ul.getElementsByTagName("a");
    miniTab.destX = parseInt(liArr[miniTab.activeTab].offsetLeft + liArr[miniTab.activeTab].getElementsByTagName("a")[0].offsetLeft + ul.offsetLeft);
    miniTab.destW = parseInt(liArr[miniTab.activeTab].getElementsByTagName("a")[0].offsetWidth);
    miniTab.t = 0;
    miniTab.b = miniTab.slideObj.offsetLeft;
    miniTab.c = miniTab.destX - miniTab.b;
    miniTab.bW = miniTab.slideObj.offsetWidth;
    miniTab.cW = miniTab.destW - miniTab.bW;
    miniTab.slideObj.style.top = (ul.offsetTop + liArr[miniTab.activeTab].offsetTop + aArr[miniTab.activeTab].offsetTop) + "px";
  },
  
  slideIt:function() {
    var ul          = document.getElementById("miniflex");
    var liArr       = ul.getElementsByTagName("li");
    var aArr        = ul.getElementsByTagName("a");
    
    // Has the browser text size changed?
    if(miniTab.aHeight != ul.offsetTop + liArr[miniTab.activeTab].offsetTop + aArr[miniTab.activeTab].offsetTop) {
      miniTab.initAnim();
      miniTab.aHeight = ul.offsetTop + liArr[miniTab.activeTab].offsetTop + aArr[miniTab.activeTab].offsetTop
    };
    
    if(miniTab.t++ < miniTab.d) {
      var x = miniTab.animate(miniTab.t,miniTab.b,miniTab.c,miniTab.d);
      var w = miniTab.animate(miniTab.t,miniTab.bW,miniTab.cW,miniTab.d);
      miniTab.slideObj.style.left = parseInt(x) + "px";
      miniTab.slideObj.style.width = parseInt(w) + "px";
    } else {
      miniTab.slideObj.style.left = miniTab.destX + "px";
      miniTab.slideObj.style.width = miniTab.destW +"px";
    }
  },

  animate: function(t,b,c,d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  }
}

window.onload = miniTab.init;
window.onunload = miniTab.cleanUp;