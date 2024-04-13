# 一. 什么是 Euphony
**Euphony** 是一个为 **LiteLoaderQQNT** 插件提供基础功能的依赖。通过 **Euphony**，你可以简单快速地实现你需要的功能。
# 二. 使用方法
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
**Euphony** 本身可作为依赖导入你的项目。你可以通过以下命令将其添加至你的项目依赖：
```bash
npm install git@github.com:xtaw/LiteLoaderQQNT-Euphony.git
```
现在，你可以直接在你的代码中使用 `import` 语句来导入 API：
```js
import { Friend, PlainText } from "liteloaderqqnt-euphony";
```
具体有哪些可用的 API 可以在下文查看。
### 示例
```js
import { Group, AtAll, PlainText, MessageChain } from "liteloaderqqnt-euphony";
const group = new Group(10000);
group.sendMessage(new MessageChain().append(new AtAll('Content')).append(new PlainText('Hello World!')));
```
这段代码会向 **群号** 为 **10000** 的群发送一条消息，其中包含一个显示为 **Content** 的@全体成员，以及一个内容为 **Hello World!** 的纯文本。
## 说明
无论使用以上哪种方法，都必须添加 **Euphony** 本身至 **LiteLoaderQQNT** 中作为插件加载。如果你想让你的插件脱离 **Euphony** 插件独立运行，你可以手动在 `preload.js` 中导出相关对象，并在 `renderer.js` 中添加事件处理，具体实现可参考 `./src/main/preload.js` 与 `./src/main/renderer.js`。
# 三. API介绍
请注意，由于 **Euphony** 目前正处于开发初期，各 API 并未完全实现，也并不稳定，很可能在将来发生很大变化。
## 1. Native
**Euphony** 在 `preload.js` 中导出了 `euphonyNative` 对象用于一些与 qq 底层交互的操作。

其中包含的函数有：
### I. invokeNative
```js
invokeNative(eventName, cmdName, registered, ...args)
```
该函数用于调用qq底层函数，其中各参数含义可自行抓取qq事件查看。
### II. subscribeEvent
```js
subscribeEvent(cmdName, handler)
```
该函数用于为 **cmdName** 为 `cmdName` 的qq底层事件添加 `handler` 监听器，并返回一个新的 `listener` 监听器，代表该事件监听器。
### III. unsubscribeEvent
```js
unsubscribeEvent(listener)
```
该函数用于移除qq底层事件的 `listener` 监听器。`listener` 参数并不是传入 `subscribeEvent` 的 `handler`，而是其返回的 `listener`。
### IV. convertUinToUid
```js
convertUinToUid(uin)
```
该参数接收一个 **qq号**，并返回该 **qq号** 代表的 **uid**。
### V. convertUidToUin
```js
convertUidToUin(uid)
```
该参数接收一个 **uid**，并返回该 **uid** 代表的 **qq号**。
## 2. 联系人
**Euphony** 中拥有两种联系人 `Friend` 与 `Group`，它们都继承于 `Contact` 。
### I. Contact
`Contact` 类型代表所有的联系人。
#### 属性
##### (1). #id
该私有属性在 `Friend` 中表示好友的 **qq号**，在 `Group` 中表示群聊的 **群号**。
#### 函数
##### (1). sendMessage
```js
async sendMessage(message)
```
该函数向该联系人发送一条消息。它接收一个 `SingleMessage` 或一个 `MessageChain` 作为参数，代表发送的消息。
##### (2). getId
```js
getId()
```
该函数返回该联系人的 `#id` 属性。
##### (3). toPeer
```js
toPeer()
```
该函数返回该联系人所代表的 **peer** 对象。
### II. Friend
`Friend` 类型代表好友。
#### 属性
##### (1). #uid
该私有属性代表好友的 **uid**。
#### 函数
##### (1). fromUin
```js
static fromUin(uin)
```
该静态函数接收一个 **qq号**，返回一个 `Friend` 对象，代表该 **qq号** 的好友。若该好友不存在则会返回 `null`。
##### (2). fromUid
```js
static fromUid(uid)
```
该静态函数接收一个 **uid**，返回一个 `Friend` 对象，代表该 **uid** 的好友。若该好友不存在则会返回 `null`。
##### (3). getUid
```js
getUid()
```
该函数返回该好友的 `#uid` 属性。
#### 构造器
##### (1). (uin, uid)
```js
constructor(uin, uid)
```
该构造器接收好友的 **qq号** 与 **uid**，构造出的对象代表该 **qq号** 和 **uid** 的好友。
### III. Group
`Group` 类型代表群聊。
#### 构造器
##### (1). (id)
```js
constructor(id)
```
该构造器接收群聊的 **群号**，构造出的对象代表该 **群号** 的群聊。
## 3. 消息
**Euphony** 中的各种消息类型均继承于 `SingleMessage`，多个 `SingleMessage` 可组合形成 `MessageChain`。
### I. SingleMessage
`SingleMessage` 类型代表一个消息元素。
#### 函数
##### (1). getElementType
```js
static getElementType()
```
该静态函数返回该消息元素所对应的 **elementType**。
##### (2). toElement
```js
toElement()
```
该函数返回该消息元素所代表的 **element** 对象。
### II. MessageChain
`MessageChain` 类型代表一条完整的消息，由多个 `SingleMessage` 组成。
#### 属性
##### (1). #messages
该私有属性代表构成该消息的所有元素。
#### 函数
##### (1). append
```js
append(value)
```
该函数接收一个 `SingleMessage`，将其添加至该消息链中。
##### (2). pop
```js
pop()
```
该函数移除该消息链中最后一条消息。
##### (3). remove
```js
remove(index)
```
该函数移除该消息链中指定位置的消息。
##### (4). toElements
```js
async toElements()
```
该函数返回该消息链所代表的 **elements** 对象。
### III. PlainText
`PlainText` 类型代表一个纯文本消息元素。
#### 属性
##### (1). #content
该私有属性代表消息内容。
#### 函数
##### (1). getContent
```js
getContent()
```
该函数返回该消息元素的 `#content` 属性。
#### 构造器
##### (1). (content)
```js
constructor(content)
```
该构造器接收一个消息内容，构造出的对象代表内容为 `content` 的纯文本消息。
### IV. At
`At` 类型代表一个@群聊成员元素。
#### 属性
##### (1). #uin
该私有属性代表@的群聊成员的 **qq号**。
##### (2). #uid
该私有属性代表@的群聊成员的 **uid**。
#### 函数
##### (1). fromUin
```js
static fromUin(uin)
```
该静态函数接收一个 **qq号**，返回一个 `At` 对象，代表@该 **qq号** 的群聊成员。若该成员不存在则会返回 `null`。
##### (2). fromUid
```js
static fromUid(uid)
```
该静态函数接收一个 **uid**，返回一个 `At` 对象，代表@该 **uid** 的群聊成员。若该成员不存在则会返回 `null`。
##### (3). getUin
```js
getUin()
```
该函数返回该消息元素的 `#uin` 属性。
##### (4). getUid
```js
getUid()
```
该函数返回该消息元素的 `#uid` 属性。
#### 构造器
##### (1). (uin, uid)
```js
constructor(uin, uid)
```
该构造器接收 **qq号** 和 **uid**，构造出的对象代表@该 **qq号** 与 **uid** 的群聊成员。
### V. AtAll
`AtAll` 类型代表一个@全体成员元素。
#### 属性
##### (1). #content
该私有属性代表@全体成员的显示内容。
#### 函数
##### (1). getContent
```js
getContent()
```
该函数返回该消息元素的 `#content` 属性。
#### 构造器
##### (1). (content)
```js
constructor(content = '@全体成员')
```
该构造器接收一个显示内容，构造出的对象代表显示内容为 `content` 的@全体成员。
### VI. Image
`Image` 类型代表一个图片元素。
#### 属性
##### (1). #path
该私有属性代表图片的路径。
#### 函数
##### (1). getPath
```js
getPath()
```
该函数返回该消息元素的 `#path` 属性。
#### 构造器
##### (1). (path)
```js
constructor(path)
```
该构造器接收一个路径，构造出的对象代表路径为 `path` 的图片。
### VII. Audio
`Audio` 类型代表一个语音元素。
#### 属性
##### (1). #path
该私有属性代表语音音频的路径。
##### (2). #duration
该私有属性代表语音音频的持续时长。
#### 函数
##### (1). getPath
```js
getPath()
```
该函数返回该消息元素的 `#path` 属性。
##### (2). getDuration
```js
getDuration()
```
该函数返回该消息元素的 `#duration` 属性。
#### 构造器
##### (1). (path, duration)
```js
constructor(path, duration)
```
该构造器接收路径和持续时长，构造出的对象代表语音音频路径为 `path`，持续时长为 `duration` 的语音。
若在构造时不传入 `duration`，则 `toElement` 函数会自动尝试获取语音时长（可能并不准确）。
## 4. 事件
**Euphony** 中所有事件操作均由 `EventChannel` 完成，其中的 `#GLOBAL` 是整个插件公共的事件通道，所有基础事件均由该通道处理。

目前可用的基础事件有：
1. receive-message 接收到新消息
2. send-message 发送出新消息

### I. EventChannel
`EventChannel` 是 **Euphony** 完成事件操作的通道。
#### 属性
##### (1). #GLOBAL
该私有静态属性代表整个插件公共的事件通道。
##### (2). #registry
该私有属性代表该事件通道所注册的所有监听器。
#### 函数
##### (1). global
```js
static global()
```
该函数返回 `#GLOBAL`。
##### (2). subscribeEvent
```js
subscribeEvent(eventName, handler)
```
该函数为事件 `eventName` 添加一个 `handler` 监听器，并返回该监听器。
##### (3). unsubscribeEvent
```js
unsubscribeEvent(eventName, handler)
```
该函数移除事件 `eventName` 的 `handler` 监听器。
##### (4). call
```js
call(eventName, ...args)
```
该函数触发事件 `eventName` 并传入参数 `args`。
