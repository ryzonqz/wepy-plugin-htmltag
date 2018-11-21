const transform = require('../dist/transform')

let style = 'section{color:white} .div>p{ font-size: .2rem } h1{line-height:2} li+li{float: left}'
let html =
'<section submit :style="{{margin-top:\'.2rem\'}}" text="hahah<div></div>1213">\
  <!-- some comment -->\
  <div v-html="content"></div>\
  <p class="title"><span>some word</span></p>\
  <div class="desc">\
    <img hidden src="">\
    <img @click="show"/>\
  </div>\
  <hr>\
</section>'

let html2 = 
'<div>\
  <div id="box">\
    <div class="div">\
      <div>\
        <img src="" alt="img1">\
        <img src="" alt="img2" />\
      </div>\
    </div>\
  </div>\
  <p class="p" data-id="12" @click="p">\
    <span id>\
      &nbsp;\
    </span>\
    <a href="">1<img id="img" src="" alt="">123123</a>\
  </p>\
  <ul>\
    <li>\
      <!-- <div><span><img src="" alt=""></span></div> -->\
    </li>\
  </ul>\
</div>\
'

console.log(transform.transformCss(style))
console.log('\n')
console.log(transform.transformHtml(html))
console.log('\n')
console.log(transform.transformHtml(html2))
