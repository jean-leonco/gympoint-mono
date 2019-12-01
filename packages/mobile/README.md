# Table of contents

- [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Running](#running)
    - [Configuration](#configuration)
    - [App](#app)

## Getting Started

### Prerequisites

Ensure you have the following resources to use properly the app:

- [GymPoint api](https://github.com/jean-leonco/gympoint-mono/tree/master/packages/api)
- [Yarn](https://yarnpkg.com/) or npm
- [React Native CLI](https://github.com/react-native-community/cli/tree/master/packages/global-cli)
- [Android SDK](https://developer.android.com/studio)
- Android device

> You can use an Android physical or virtual device. Check [React Native getting started](https://facebook.github.io/react-native/docs/0.60/getting-started), for device configuration.

## Running

First, certify that the API is running while exploring the system.

### Configuration

If you are using a physical device connected to the computer or virtual device, it is only necessary to run `adb reverse tcp:3333 tcp:3333`.

Otherwise, go to `src/services/api.js` and change `const api` to:

```js
const api = axios.create({
  baseURL: 'http://YOUR_MACHINE_IP:3333',
});
```

### App

Open android device and install the app by running `react-native run-android`.

Sometimes, react-native does not open metro bundler terminal. In this case, run `react-native start`.

**THE APP WAS ONLY TESTED IN ANDROID ENVIRONMENT.**

**ENSURE TO USE ONE.**
