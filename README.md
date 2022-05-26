# WXRMP.com

## WebXR Media Player

Import and position Images and Videos into a custom VR space in your Browser. Export the scene to JSON.

## Site Map
MVP
/ : index : features / about
/about : about the site
/contact : send me an email, see out socials
/s/[sid] : app, make a scene, save it, fork it

MVP$
/u/[uid] : user page and list of published scenes
/publish/[sid] : upload, pay to display, set costs
/view/[sid] : view a scene without being able to edit it
/buy/[sid] : get access to a scene

## TODO
App
- Store
- Items render
- Items edit
- Export JSON

Firebase
- metamask integration
- database of scenes
- database of images and videos
- payment from user to publisher
- payment split

Payment split
- publisher - get rich
- platform - be greedy
- gas - be low

Socials
- Tiktok
- twitter - wxrmp_offical
- Subreddit
- Discord
- Instagram

## Development Files
/src/pages/_app : Top level, header and balancer
/src/layout/ : wrappers, dom and canvas
/src/config : next/head
/src/pages/_document.jsx : include in each page

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
./adb devices
./adb reverse tcp:3000 tcp:3000

chrome://inspect/#devices

## Assets

Icons : (Google Material)[https://fonts.google.com/icons?icon.query=image]


# type-wxrmp

This project was bootstrapped with [`create-r3f-app`](https://github.com/utsuboco/create-r3f-app)
