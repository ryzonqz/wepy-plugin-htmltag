# wepy-plugin-tag
> 自动转化html标签为view, text, image标签, 并修改wxss内标签选择器

## 效果
`test.wpy`
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

转化后
test.wxml
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

## 用法
1. 安装`wepy-plugin-tag`
```bash
  $ npm i wepy-plugin-tag -D
```

2. `wepy.config.js`中`plugins`项中添加 `iview:{}`
```javascript
  plugins: {
    // ...
    htmltag: {}
    // ...
  }
```

3. 运行项目`wepy build --watch`

##配置
可以配置块元素和内联元素名称, 分别转化为`view`, `text`, 但`img`只会转成`image`
```javascript
    htmltag: {
      block: [/* block elements */],
      inline: [/* inline elements */]
    }
```
