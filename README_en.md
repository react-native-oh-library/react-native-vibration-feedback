> Document Template: v0.4.2

<p align="center">
  <h1 align="center"> <code>react-native-vibration-feedback</code> </h1>
</p>

This project is based on [react-native-vibration-feedback](https://github.com/nascimentorafael/react-native-vibration-feedback).

The version correspondence details are as follows:

| Name | Version(Npm Address) | Release Information | Supported RN Version | Supported Autolink | Compile API Version | Community Baseline Version | Source code address |
| --- | --- | --- | --- | --- | --- | --- | --- |
| @react-native-ohos/react-native-vibration-feedback | [~ 1.1.0](https://www.npmjs.com/package/@react-native-ohos/react-native-vibration-feedback) | [AtomGit Releases](https://atomgit.com/CPF-RN/rntpc_react-native-vibration-feedback/releases) | 0.77.* | No | API12+ | 1.0.0 | [br_rnoh0.77](https://atomgit.com/CPF-RN/rntpc_react-native-vibration-feedback/tree/br_rnoh0.77) |

## Introduction

The react-native-vibration-feedback component is used in React Native to provide vibration feedback capability.<br/>
By passing in a specified id, you can trigger system preset vibration effects (Peek: weak short vibration; Pop: strong short vibration; Nope: three vibrations in a short interval), providing haptic feedback for interaction scenarios such as button taps and action confirmations.

## Installation

Go to the project directory and execute the following instruction:

**npm**

```bash
npm install @react-native-ohos/react-native-vibration-feedback
```

**yarn**

```bash
yarn add @react-native-ohos/react-native-vibration-feedback
```

## Link

|                                      | Supported Autolink | Supported RN Version |
|--------------------------------------|--------------------|----------------------|
| ~ 1.1.0                              | No                 | 0.77                 |

Projects using Autolink need to be configured according to this document, Autolink framework guide: https://atomgit.com/CPF-RN/ohos_react_native/blob/master/docs/zh-cn/Autolinking.md

If the version you are using supports Autolink and the project has integrated Autolink, you can skip the ManualLink configuration.

<details>
  <summary>ManualLink: This step provides guidance for manually configuring native dependencies.</summary>

Open the `harmony` directory of the OpenHarmony project in DevEco Studio.

### 1. Overrides RN SDK

To ensure the project relies on the same version of the RN SDK, you need to add an `overrides` field in the project's root `oh-package.json5` file, specifying the RN SDK version to be used. The replacement version can be a specific version number, a semver range, or a locally available HAR package or source directory.

For more information about the purpose of this field, please refer to the [official documentation](https://developer.huawei.com/consumer/en/doc/harmonyos-guides-V5/ide-oh-package-json5-V5#en-us_topic_0000001792256137_overrides).

```json
{
  "overrides": {
    "@rnoh/react-native-openharmony" : "~0.77.72" // ohpm version
    // "@rnoh/react-native-openharmony" : "./react_native_openharmony" // source code directory
  }
}
```

### 2. Introducing Native Code

Currently, two methods are available:

- Use the HAR file.
- Directly link to the source code.

Method 1 (recommended): Use the HAR file.

> [!TIP] The HAR file is stored in the `harmony` directory in the installation path of the third-party library.

Open `entry/oh-package.json5` file and add the following dependencies:

```json
"dependencies": {
    "@react-native-ohos/react-native-vibration-feedback": "file:../../node_modules/@react-native-ohos/react-native-vibration-feedback/harmony/vibration_feedback.har"
  }
```

Click the `sync` button in the upper right corner.

Alternatively, run the following instruction on the terminal:

```bash
cd entry
ohpm install
```

Method 2: Directly link to the source code.

> [!TIP] For details, see [Directly Linking Source Code](https://atomgit.com/CPF-RN/usage-docs/blob/master/en/link-source-code.md).

### 3. Configuring CMakeLists and Introducing ReactNativeVibrationFeedbackPackage

Open `entry/src/main/cpp/CMakeLists.txt` and add the following code:

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

Open `entry/src/main/cpp/PackageProvider.cpp` and add the following code:

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

### 4. Introducing RNVibrationFeedbackPackage to ArkTS

Open `entry/src/main/ets/RNPackagesFactory.ets` and add:

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

### Running

Click the `sync` button in the upper right corner.

Alternatively, run the following instruction on the terminal:

```bash
cd entry
ohpm install
```

Then build and run the code.

## Constraints

### Compatibility

This document is verified based on the following versions:

1. RNOH: 0.77.18; SDK: HarmonyOS 6.0.0 Release SDK; IDE: DevEco Studio 6.0.0.858; ROM: 6.0.0.112;

### Permission Requirements

- This library involves the vibration feature. To use the vibration API, the **ohos.permission.VIBRATE** permission (**normal** level) must be configured. Add it in `entry/src/main/module.json5`:

```json
requestPermissions: [
  {
    "name": "ohos.permission.VIBRATE",
  },
],
```

- Some permissions need to be requested from the user through an authorization dialog. For details about permission configuration, see [App Access Control](https://gitee.com/openharmony/docs/blob/master/en/application-dev/security/AccessToken/Readme-EN.md#/openharmony/docs/blob/master/en/application-dev/security/AccessToken/app-permission-mgmt-overview.md).

### API requirements

> [!TIP] All versions of the current third-party libraries have implemented version isolation, supporting compilation in `API12+` projects and execution on `API12+` ROMs.

> [!TIP] The following features depend on specific API versions. Compiling the project with an API version lower than specified or running the ROM with an API version lower than specified may result in limited functionality.

1. The `1521` (Nope) vibration type relies on system capabilities of `API18+`. This feature requires compilation in a project that supports `API18+` and must run on a ROM that supports `API18+` to take effect. On environments earlier than `API18`, it automatically degrades to the `1519` (Peek) vibration type.

## Example

The following code shows the basic use scenario of the repository:

> [!WARNING] The name of the imported repository remains unchanged.

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

## How to Use

**Trigger Vibration**

```js
import RNVibrationFeedback from 'react-native-vibration-feedback';

RNVibrationFeedback.vibrateWith(1519); // Peek: weak short vibration
RNVibrationFeedback.vibrateWith(1520); // Pop: strong short vibration
RNVibrationFeedback.vibrateWith(1521); // Nope: three vibrations in a short interval
```

## Available APIs

> [!TIP] The **Platform** column indicates the platform where the properties are supported in the original third-party library.

> [!TIP] If the value of **OpenHarmony Platform Support** is **yes**, it means that the OpenHarmony platform supports this property; **no** means the opposite; **partially** means some capabilities of this property are supported. The usage method is the same on different platforms and the effect is the same as that of iOS or Android.

### Static Methods

| Name | Parameter Type | Return Value | Required | Platform | OpenHarmony Platform Support | Description |
| --- | --- | --- | --- | --- | --- | --- |
| vibrateWith | id: number | void | Yes | iOS, Android | Yes | Triggers the vibration with the specified id. The id corresponds to a system preset vibration effect (1519/1520/1521) |

The id parameter provides the following three vibration types:

|  ID  | Name |           Description           |
|:----:|:----:|:-------------------------------:|
| 1519 | Peek | Weak short vibration |
| 1520 | Pop  | Strong short vibration |
| 1521 | Nope | Three vibrations in a short interval |

> [!TIP] The `1521` (Nope) vibration takes effect only on API18 or later. On versions earlier than API18, this vibration automatically changes to the `1519` (Peek) vibration type.

## Known Issues

None

## Other

None

## Directory Structure

```
/react-native-vibration-feedback  # Project root directory
├── harmony                       # adaptation code
│   ├─ vibration_feedback.har     # har package
│   └─ vibration_feedback         # adaptation core code
│       ├─ Index.ets              # adaptation code entry point
│       └─ src/main
│           ├─ cpp
│           │   ├─ ReactNativeVibrationFeedbackPackage.h  # C++ Package
│           │   └─ generated     # codegen generated code
│           └─ ets
│               ├─ RNVibrationFeedbackModule.ts   # vibration implementation
│               ├─ RNVibrationFeedbackPackage.ets # ArkTS Package
│               └─ generated     # codegen generated code
├── src                           # React Native code
│   └─ NativeVibrationFeedback.ts # TurboModule interface definition
├── index.js                      # React Native entry file
├── index.d.ts                    # type definition file
├── README.md                     # Chinese document
├── README_en.md                  # English document
```

## How to Contribute

If you find any problem when using react-native-vibration-feedback, submit an [issue](https://atomgit.com/CPF-RN/rntpc_react-native-vibration-feedback/issues) or a [PR](https://atomgit.com/CPF-RN/rntpc_react-native-vibration-feedback/pulls).

## License

The repository is based on [Apache License 2.0](https://atomgit.com/CPF-RN/rntpc_react-native-vibration-feedback/blob/br_rnoh0.77/LICENSE).
