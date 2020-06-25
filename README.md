# SZFE MUI

移动端 UI 库

## 安装

```bash
yarn add szfe-ui
# 或者
npm install szfe-ui --save
```

## 用法示例

```javascript
import { ScrollView } from 'szfe-ui'
```

## 按需加载

配合 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 实现按需加载，需将 `camel2DashComponentName` 配置关闭

```js
// babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'szfe-ui',
        camel2DashComponentName: false,
        style: (name) => `${name}/style.less`
      },
    ],
  ],
}
```

## 全部导出如下

```javascript
export {
  Animate, // 动画组件
  Breadcrumb, // 面包屑
  Button, // 按钮
  Card, // 卡片
  Cascader, // 级联选择器
  CountDown, // 倒计时
  Empty, // 空 UI
  ErrorBoundary, // 错误边界
  ErrorPage, // 错误页
  Header, // 顶栏
  Icon, // 图标
  List, // 列表
  Modal, // 弹层
  NotFound, // 404 页
  Picker, // 选择器
  PickerView, // 选择区域
  Portal, // Poral
  ReminderBar, // 提示栏
  RouterSwitch, // 路由切换
  ScrollView, // 滚动区域
  SearchBar, // 搜索栏
  Skeleton, // 骨架
  Spin, // 等待动画
  Stepper, // 计步器
  Steps, // 步骤条
  Switch, // 切换动画
  View, // 视图区域
  WhiteSpace, // 间隔
  loading, // loading 控制器
  toast, // 弹窗控制器
}
```
