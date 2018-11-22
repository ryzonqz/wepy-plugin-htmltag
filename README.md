# wepy-plugin-htmltag

[wepy](https://github.com/Tencent/wepy) 插件，转化html标签为view, text, image标签, 并修改wxss内标签选择器

# 示例

test.wpy
```
<template>
  <div class="container">
    <ul>
      <li class="item"><span>Item 1</span></li>
    </ul>
  </div>
</template>

<style lang="scss">
  div.container ul li:first-of-type{
    span{
      float: left;
    }
    img{
      float: right;
    }
  }
</style>
```

转化后test.wxml
```
<view class="_div container">
  <view class="_ul">
    <view class="_li item"><text class="_span">Item 1</text><image class="_img" src=""></image></view>
  </view>
</view>
```

test.wxss
```
._div.container ._ul ._li:first-of-type ._span {
  float: left;
}

._div.container ._ul ._li:first-of-type ._img {
  float: right;
}
```

# 安装

```
  $ npm i -D wepy-plugin-tag
```

# 使用

wepy.config.js
```javascript
module.exports.plugins = {
  htmltag: {
    filter: /\.(wxml|wxss)$/,
    config: {
      /* block: [...], */
      /* inline: [...], */
    }
  }
}
```

# 配置

* filter 监听的文件后缀<br>
  默认: `/\.(wxml|wxss)$/`

* config 具体配置

  * config.block 块元素数组，转化为`view` 标签<br>
    默认: ['div'....]

  * config.inline 内联元素数组，转化为`text` 标签<br>
    默认: ['span'....]

\*注意：`img`固定转化为`image`, `<br>`固定转化为`<text>\n</text>`
