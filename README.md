# CryptoCoins

## Description

It is a mobile application, which consumes a cryptocurrency api that allows you to see its prices, appreciations or depreciations in real time. This application was only tested on Android, although it should work similarly on iOS.

I want to clarify that it is my first big project in react native, so there may be code that is not so optimized or readable. Soon I will make another restaurant application using react native and best programming practices.

* expo version: "47.0.13"

* firebase: "9.17.1"

* react: "18.1.0"

* react native: "0.70.5"

* react navigation/native: "6.1.6"

* Lenguage support: English

View package.json for more details the project

## Use

IMPORTANT:

This app consumes a "free" database in firebase, so when you try it it probably won't work. For this, my recommendation is that you first create a project in firebase that has "Authentication" enabled and "Cloud Firestore" compatible with the "web app" format. You will also need to replace the credentials in the "src/config/firebase-config.js" file with the credentials obtained from your firebase.

Run with "expo go":

* install dependences

        npm install

* start local server

        npx expo start

* scan the qr code from a mobile

Create apk:

To generate an apk, you must create an account at "https://expo.dev" and execute the following command from your project's terminal:

        eas build -p android --profile preview

If you have any other problem I recommend reading this guide: "https://docs.expo.dev/development/create-development-builds/"


## Links of interest

* Repo

        https://github.com/duemarfra/cryptoCoins.git

* Hosted apk on Expo 

        https://expo.dev/accounts/duemarfra/projects/CryptoCoins/builds/7a1149b2-a523-4260-94fd-ca78f6cd7810

Note:

My firebase server will only last a month or two from today so this app may not work properly.
