# WXRMP.com

## WebXR Media Player

Import and position Images and Videos into a custom VR space in your Browser. Export the scene to JSON.

## TODO

## Development

### Links and Resources

https://developer.oculus.com/documentation/oculus-browser/browser-remote-debugging/

### Steps for wireless

adb devices
adb shell ip route

> > 192.168.1.0/24 dev wlan0 proto kernel scope link src 192.168.1.4
> > adb tcpip 5555
> > adb connect 192.168.1.4:5555
> > disconnect cord
> > adb devices
> > adb reverse tcp:3000 tcp:3000

### steps for wired dev

cd android-sdk
adb devices
adb reverse tcp:3000 tcp:3000

chrome://inspect/#devices

## Assets

Icons : (Google Material)[https://fonts.google.com/icons?icon.query=image]


# type-wxrmp

This project was bootstrapped with [`create-r3f-app`](https://github.com/utsuboco/create-r3f-app)