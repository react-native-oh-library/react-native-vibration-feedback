> 文档模板：v0.4.2

<p align="center">
  <h1 align="center"> <code>react-native-vibration-feedback</code> </h1>
</p>

本项目基于 [react-native-vibration-feedback](https://github.com/nascimentorafael/react-native-vibration-feedback) 开发。

版本所属关系如下：

| 三方库名称 | 三方库版本（npm地址） | 发布信息 | 支持RN版本 | Autolink | 编译API版本 | 社区基线版本 | 源码地址 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| @react-native-ohos/react-native-vibration-feedback | [~ 1.0.1](https://www.npmjs.com/package/@react-native-ohos/react-native-vibration-feedback) | [AtomGit Releases](https://atomgit.com/CPF-RN/rntpc_react-native-vibration-feedback/releases) | 0.72.* | 否 | API12+ | 1.0.0 | [br_rnoh0.72](https://atomgit.com/CPF-RN/rntpc_react-native-vibration-feedback/tree/br_rnoh0.72) |

## 简介

react-native-vibration-feedback 组件用于 React Native，提供震动反馈能力。<br/>
通过传入指定 id 即可触发系统预置的震动效果（Peek 弱短震动、Pop 强烈短震动、Nope 短时间内三次震动），为按钮点击、操作确认等交互场景提供触觉反馈体验。

## 下载安装

进入到工程目录并输入以下命令：

**npm**

```bash
npm install @react-native-ohos/react-native-vibration-feedback
```

**yarn**

```bash
yarn add @react-native-ohos/react-native-vibration-feedback
```

## Link

|                                      | 是否支持Autolink | RN框架版本 |
|--------------------------------------|----------------|-----------|
| ~ 1.0.1                              | 否             |  0.72     |

使用 Autolink 的工程需要根据该文档配置，Autolink 框架指导文档：https://atomgit.com/CPF-RN/ohos_react_native/blob/master/docs/zh-cn/Autolinking.md

如您使用的版本支持 Autolink，并且工程已接入 Autolink，可跳过 ManualLink 配置。

<details>
  <summary>ManualLink: 此步骤为手动配置原生依赖项的指导</summary>

首先需要使用 DevEco Studio 打开项目里的 OpenHarmony 工程 `harmony`。

### 1. Overrides RN SDK

为了让工程依赖同一个版本的 RN SDK，需要在工程根目录的 `oh-package.json5` 添加 overrides 字段，指向工程需要使用的 RN SDK 版本。替换的版本既可以是一个具体的版本号，也可以是一个模糊版本，还可以是本地存在的 HAR 包或源码目录。

关于该字段的作用请阅读[官方说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/ide-oh-package-json5-V5#zh-cn_topic_0000001792256137_overrides)。

```json
{
  "overrides": {
    "@rnoh/react-native-openharmony" : "~0.72.142" //ohpm 在线版本
    // "@rnoh/react-native-openharmony" : "./react_native_openharmony" // 指向源码路径
  }
}
```

### 2. 引入原生端代码

目前有两种方法：

- 通过 har 包引入。
- 直接链接源码。

方法一：通过 har 包引入（推荐）

> [!TIP] har 包位于三方库安装路径的 `harmony` 文件夹下。

打开 `entry/oh-package.json5`，添加以下依赖：

```json
"dependencies": {
    "@react-native-ohos/react-native-vibration-feedback": "file:../../node_modules/@react-native-ohos/react-native-vibration-feedback/harmony/vibration_feedback.har"
  }
```

点击右上角的 `sync` 按钮

或者在命令行终端执行：

```bash
cd entry
ohpm install
```

方法二：直接链接源码

> [!TIP] 如需使用直接链接源码，请参考[直接链接源码说明](https://atomgit.com/CPF-RN/usage-docs/blob/master/zh-cn/link-source-code.md)。

### 3. 配置 CMakeLists 和引入 ReactNativeVibrationFeedbackPackage

打开 `entry/src/main/cpp/CMakeLists.txt`，添加：

```diff
project(rnapp)
cmake_minimum_required(VERSION 3.4.1)
set(RNOH_APP_DIR "${CMAKE_CURRENT_SOURCE_DIR}")
+ set(OH_MODULES "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules")
set(RNOH_CPP_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../../../../react-native-harmony/harmony/cpp")

add_subdirectory("${RNOH_CPP_DIR}" ./rn)

# RNOH_BEGIN: manual_package_linking_1
add_subdirectory("../../../../sample_package/src/main/cpp" ./sample-package)
+ add_subdirectory("${OH_MODULES}/@react-native-ohos/react-native-vibration-feedback/src/main/cpp" ./vibration-feedback)
# RNOH_END: manual_package_linking_1

add_library(rnoh_app SHARED
    "./PackageProvider.cpp"
    "${RNOH_CPP_DIR}/RNOHAppNapiBridge.cpp"
)

target_link_libraries(rnoh_app PUBLIC rnoh)

# RNOH_BEGIN: manual_package_linking_2
target_link_libraries(rnoh_app PUBLIC rnoh_sample_package)
+ target_link_libraries(rnoh_app PUBLIC rnoh_vibration_feedback)
# RNOH_END: manual_package_linking_2
```

打开 `entry/src/main/cpp/PackageProvider.cpp`，添加：

```diff
#include "RNOH/PackageProvider.h"
#include "generated/RNOHGeneratedPackage.h"
#include "SamplePackage.h"
+ #include "ReactNativeVibrationFeedbackPackage.h"

using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
    return {
      std::make_shared<RNOHGeneratedPackage>(ctx),
      std::make_shared<SamplePackage>(ctx),
+     std::make_shared<ReactNativeVibrationFeedbackPackage>(ctx)
    };
}
```

### 4. 在 ArkTs 侧引入 RNVibrationFeedbackPackage

打开 `entry/src/main/ets/RNPackagesFactory.ets`，添加：

```diff
  ...
+ import {RNVibrationFeedbackPackage} from '@react-native-ohos/react-native-vibration-feedback/ts';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    new SamplePackage(ctx),
+   new RNVibrationFeedbackPackage(ctx)
  ];
}
```
</details>

### 运行

点击右上角的 `sync` 按钮

或者在命令行终端执行：

```bash
cd entry
ohpm install
```

然后编译、运行即可。

## 约束与限制

### 兼容性

本文档内容基于以下版本验证通过：

1. RNOH: 0.72.96; SDK: HarmonyOS 6.0.0 Release SDK; IDE: DevEco Studio 6.0.0.858; ROM: 6.0.0.112;

### 权限要求

- 此库涉及振动功能，使用振动接口时需要配置 **ohos.permission.VIBRATE** 权限（**normal** 级别），在 `entry/src/main/module.json5` 中添加：

```json
requestPermissions: [
  {
    "name": "ohos.permission.VIBRATE",
  },
],
```

- 部分权限需弹窗向用户申请授权，具体权限配置见文档：[程序访问控制](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/security/AccessToken/Readme-CN.md#/openharmony/docs/blob/master/zh-cn/application-dev/security/AccessToken/app-permission-mgmt-overview.md)。

### 编译运行API要求

> [!TIP] 当前三方库所有版本均已实现版本隔离，支持在 `API12+` 工程编译，及 `API12+` ROM 运行。

> [!TIP] 以下功能依赖特定版本的 API，使用 `低于指定API版本的工程编译` 或 `低于指定API版本的ROM运行` 均可能导致部分功能受限。

1. `1521`（Nope）震动类型的实现依赖 `API18+` 的系统能力，此功能需要在支持 `API18+` 的工程编译，并在支持 `API18+` 的 ROM 上运行，方可生效；在低于 `API18` 的环境下使用时，会自动降级为 `1519`（Peek）震动类型。

## 使用示例

下面的代码展示了这个库的基本使用场景：

> [!WARNING] 使用时 import 的库名不变。

```js
import React from "react";
import { View, Button } from "react-native";
import RNVibrationFeedback from 'react-native-vibration-feedback';

const App = (props) => {
  return (
    <View style={{ margin: 50, flexDirection: "column", justifyContent: "space-between" }}>
      <View>
        <Button
          title="Peek"
          onPress={() => RNVibrationFeedback.vibrateWith(1519)}
        />
        <Button
          title="Pop"
          onPress={() => RNVibrationFeedback.vibrateWith(1520)}
        />
        <Button
          title="Nope"
          onPress={() => RNVibrationFeedback.vibrateWith(1521)}
        />
      </View>
    </View>
  );
};

export default App;
```

## 使用说明

**触发震动**

```js
import RNVibrationFeedback from 'react-native-vibration-feedback';

RNVibrationFeedback.vibrateWith(1519); // Peek：弱短震动
RNVibrationFeedback.vibrateWith(1520); // Pop：强烈的短震动
RNVibrationFeedback.vibrateWith(1521); // Nope：短时间内三次震动
```

## 接口说明

> [!TIP] "平台"列表示该属性在原三方库上支持的平台。

> [!TIP] "OpenHarmony平台支持"列为 "是" 表示 OpenHarmony 平台支持该属性；"否" 则表示不支持；partially 表示部分支持。使用方法跨平台一致，效果对标 iOS 或 Android 的效果。

### 静态方法

| 名称 | 参数类型 | 返回值 | 必填 | 平台 | OpenHarmony平台支持 | 描述 |
| --- | --- | --- | --- | --- | --- | --- |
| vibrateWith | id: number | void | 是 | iOS, Android | 是 | 触发指定 id 的震动，id 对应系统预置的震动效果（1519/1520/1521）|

id参数提供以下三种振动类型:

|  ID  | Name |           Description           |
|:----:|:----:|:-------------------------------:|
| 1519 | Peek | 弱短震动 |
| 1520 | Pop  | 强烈的短震动 |
| 1521 | Nope | 短时间内三次震动 |

> [!TIP] `1521`（Nope）这个震动需要在 API18 以上才会生效，API18 以下使用该震动，会自动变为 `1519`（Peek）的震动类型。

## 遗留问题

无

## 其他

无

## 目录结构

```
/react-native-vibration-feedback  # 项目根目录
├── harmony                       # 适配代码
│   ├─ vibration_feedback.har     # har包
│   └─ vibration_feedback         # 适配核心代码
│       ├─ Index.ets              # 适配代码入口
│       └─ src/main
│           ├─ cpp
│           │   ├─ ReactNativeVibrationFeedbackPackage.h  # C++ Package
│           │   └─ generated     # codegen 生成代码
│           └─ ets
│               ├─ RNVibrationFeedbackModule.ts   # 振动功能实现
│               ├─ RNVibrationFeedbackPackage.ets # ArkTS Package
│               └─ generated     # codegen 生成代码
├── src                           # RN 代码
│   └─ NativeVibrationFeedback.ts # TurboModule 接口定义
├── index.js                      # RN 侧入口文件
├── index.d.ts                    # 类型定义文件
├── README.md                     # 中文安装使用方法
├── README_en.md                  # 英文安装使用方法
```

## 贡献代码

使用过程中发现任何问题都可以提交 [Issue](https://atomgit.com/CPF-RN/rntpc_react-native-vibration-feedback/issues)，当然，也非常欢迎提交 [PR](https://atomgit.com/CPF-RN/rntpc_react-native-vibration-feedback/pulls)。

## 开源协议

本项目基于 [Apache License 2.0](https://atomgit.com/CPF-RN/rntpc_react-native-vibration-feedback/blob/br_rnoh0.72/LICENSE)，请自由地享受和参与开源。
