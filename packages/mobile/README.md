# Overview

GymPoint is a modern app to manage your gym. You can have control of everything in just one place. This is the Mobile version, built with React Native.

## Table of contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [Running](#running)
  - [Configuration](#configuration)
  - [App](#app)

## Getting Started

Choose a folder to save the project and clone the repository:

```sh
git clone https://github.com/jean-leonco/gympoint-mobile
```

### Prerequisites

Ensure you have the following resources to use properly the app:

- [GymPoint api](https://github.com/jean-leonco/gympoint-api)
- [Yarn](https://yarnpkg.com/) or npm
- [React Native CLI](https://github.com/react-native-community/cli/tree/master/packages/global-cli)
- [Android SDK](https://developer.android.com/studio)
- Android device

> You can use an Android physical or virtual device. Check [React Native getting started](https://facebook.github.io/react-native/docs/0.60/getting-started), for device configuration.

### Installing

Access the project folder in your terminal and run `yarn install` or `npm install`.

## Running

First, ensure that the gympoint-api is running while exploring the system.

### Configuration

If you are using a physical device or virtual device, it is only necessary to run `adb reverse tcp:3333 tcp:3333`.

Otherwise, you need to go back to gympoint-api configuration and change the app url declared in .env file to `APP_URL=http://YOUR_MACHINE_IP:3333`.

After that, get back and go to `src/services/api.js`. Change `const api` to:

```js
const api = axios.create({
  baseURL: 'http://YOUR_MACHINE_IP:3333',
});
```

### App

First, open android device and install the app by running `react-native run-android`.

Sometimes, react-native does not open metro bundler terminal. In this case, run `react-native start`.

**THE APP WAS ONLY TESTED IN ANDROID ENVIRONMENT.  
ENSURE TO USE ONE.**
