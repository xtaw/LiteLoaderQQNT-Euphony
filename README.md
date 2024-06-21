# 一. 什么是 Euphony
**Euphony** 是一个为 **LiteLoaderQQNT** 插件提供基础功能的依赖。通过 **Euphony**，你可以简单快速地实现你需要的功能。
# 二. 使用方法
请注意，**Euphony** 的代码均应运行在 `renderer.js` 中，而不是 `main.js` 或 `preload.js`。

你可以通过以下两种方式在你的插件中使用 **Euphony** 所提供的 API：
## 1. 直接使用 window 中的对象
**Euphony** 插件会在本身被加载时向 **window** 中导出一个名为 **euphony** 的对象，其中包含所有 API。你可以直接使用它来访问你所需要的 API。
### 示例
```js
const friend = euphony.Friend.fromUin(10000);
friend.sendMessage(new euphony.PlainText('Hello World!'));
```
这段代码会向 **qq号** 为 **10000** 的好友发送一条内容为 **Hello World!** 的纯文本消息。
## 2. 添加至项目依赖 (推荐)
**Euphony** 本身可作为依赖导入你的项目。你可以将 **Euphony** 插件文件夹放入到你的项目中并导入，该方法可避免因依赖更新造成的插件bug。

例如你的项目文件夹为 `LiteLoaderQQNT-Plugin`，`renderer.js` 位于 `LiteLoaderQQNT-Plugin/src/renderer.js`，你可以将 **Euphony** 复制到 `LiteLoaderQQNT-Plugin/LiteLoaderQQNT-Euphony`。

若你觉得这样会使你的项目体积增大，你可以自行删减 **Euphony**，只保留你需要的 API。

现在，你可以直接在你的代码中使用 `import` 语句来导入 API：
```js
import { Friend, PlainText } from '../LiteLoaderQQNT-Euphony/src/index.js';
```
具体有哪些可用的 API 可以在下文查看。
### 示例
```js
import { Group, AtAll, PlainText, MessageChain } from '../LiteLoaderQQNT-Euphony/src/index.js';
const group = Group.make(10000);
group.sendMessage(new MessageChain().append(new AtAll('Content')).append(new PlainText('Hello World!')));
```
这段代码会向 **群号** 为 **10000** 的群发送一条消息，其中包含一个显示为 **Content** 的@全体成员，以及一个内容为 **Hello World!** 的纯文本。
## 说明
无论使用以上哪种方法，都必须添加 **Euphony** 本身至 **LiteLoaderQQNT** 中作为插件加载。
# 三. API介绍
你可以在这里查看所有API介绍：[API文档](https://xtaw.github.io/LiteLoaderQQNT-Euphony/)

请注意，由于 **Euphony** 目前正处于开发初期，各 API 并不稳定，很可能在将来发生很大变化。
## 1. Native
**Euphony** 在 `preload.js` 中导出了 `euphonyNative` 对象用于一些与 qq 底层交互的操作。
你可以在 [API文档](https://xtaw.github.io/LiteLoaderQQNT-Euphony/) 中的 **Global** 部分查看详情介绍。
## 2. 封装事件
###  示例
```js
import { EventChannel } from '../LiteLoaderQQNT-Euphony/src/index.js';
const eventChannel = EventChannel.withTriggers();
eventChannel.subscribeEvent('receive-message', (message, source) => {
    console.log(message.contentToString());
    console.log(source.getContact().getId());
});
```
上面这段代码会监听 **receive-message** 事件，并输出消息的字符串形式及消息发送者的 **id**。
### (1). receive-message
该事件触发于当qq接收到新消息时。

事件会传入 `MessageChain` 和 `MessageSource` 作为参数，表示接收到的新消息及消息来源。
### (2). send-message
该事件触发于当qq发送出新消息时。

事件会传入 `MessageChain` 和 `MessageSource` 作为参数，表示发送出的新消息及消息来源。

请注意，该事件在本地消息显示发出后便会触发，而不是服务器收到发送请求后触发，可能存在消息发送失败依然触发该事件的情况，或消息还未发送出去便提前触发了该事件。因此，你无法直接在该事件触发后就去调用 `MessageChain.getSource().recall()` 等函数，因为此时消息还未被真正发送出去。