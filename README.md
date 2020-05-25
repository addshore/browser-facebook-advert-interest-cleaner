# Facebook advert interest cleaner

![Icon](https://github.com/addshore/browser-facebook-advert-interest-cleaner/blob/master/app/images/icon128.png)

A browser extension that provides a small button to easily clear all of your Facebook advert interests.

## How to install?

Download it from:
 - 

## How it works?

 1) Install the extension from the browser store
 2) Navigate to your Facebook advert interests page
 3) Click the button to clear your interests

An example:

![](https://github.com/addshore/browser-facebook-advert-interest-cleaner/blob/master/media/screenshot.png)

## Icon

The Icon was created using some GPL licensed icons:
 - https://www.iconfinder.com/icons/1054970/layers_stack_icon
 - https://www.iconfinder.com/icons/1055074/block_denied_no_no_symbol_stop_universal_no_icon
 - https://www.iconfinder.com/icons/1055113/bicycle_bike_biker_icon
 - https://www.iconfinder.com/icons/1055073/coding_programming_tags_icon
 - https://www.iconfinder.com/icons/1055063/heel_high_heel_shoe_icon

The SVG for the icon can be found in the media directory.

## Development

This extension uses [webextension-toolbox](https://github.com/HaNdTriX/webextension-toolbox)

    $ npm install

### While developing

    npm run dev chrome
    npm run dev firefox
    npm run dev opera
    npm run dev edge

### For builds

    npm run build chrome
    npm run build firefox
    npm run build opera
    npm run build edge

### Environment

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. 
