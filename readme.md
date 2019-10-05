npm install apollo-cache-inmemory@1.4.1!
ionic cordova plugin add cordova-plugin-file-transfer
ionic cordova plugin add cordova-plugin-document-viewer
ionic cordova plugin add cordova-plugin-inappbrowser
ionic cordova plugin add cordova-plugin-file
npm install @ionic-native/document-viewer
npm install @ionic-native/file

npm install --save @ionic-native/in-app-browser@4

npm install --save @ionic-native/file-transfer@4

#Requirements
node 11
ionic 3


# BUILD NATIVE IONIC IOS ONLINE

loguearse: https://dashboard.ionicframework.com/

user: juanber2.0@gmail.com

password: IONICpassword2019

1. Seguir los pasos

https://dashboard.ionicframework.com/app/d82064ff/getting-started/package



# BUILD PRODUCTION ANDROID

ionic cordova build --release android

cd /home/jb/ionic/sanatorio/platforms/android/app/build/outputs/apk/release/

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore xionict.keystore app-release-unsigned.apk xionict

zipalign -v 4 app-release-unsigned.apk sbarbara.apk

rm sbarbara.apk
 
zipalign -v 4 app-release-unsigned.apk sbarbara.apk


