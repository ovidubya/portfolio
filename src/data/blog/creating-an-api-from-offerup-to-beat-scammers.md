---
title: How I created an API from Offerup to beat Scammers
description: It's no secret that everyone wants to get the best deal when they buy stuff. But how do we know if we are getting scammed and wasting our time?
category: React Native
date: 6/22/2020
---

# 1. Introduction

![Offerup Image](/offerup/offerup.jpg)

Like any other marketplace, there are scammers to watch out for and Offerup is no exception to this. The app is crawling with scammers. One scammer asked me to pay him for a product via cashapp before we meet to confirm that I was a 'serious' buyer. This was asked of me after a couple of hours of talking and setting a time to meet.

This has got me thinking...there needs to be a way for me to avoid having these pointless conversations with scammers and just be notified when a particular item (PS4 in this case) is posted.

And then it occurred to me.... 💡 There was a way

I'll show you how I created a mobile app that will shows you all the deals from offerup that are most likely not posted by scammers.

Final Product:

![Deals app final ](/offerup/app_example.png)

How does this new app help beat scammers?

Well..

1. It tells you how many reviews and average rating of the seller
2. It tells you if the seller is [TruYou](https://help.offerup.com/hc/en-us/articles/360032336151-About-TruYou) verified.
3. It tells you when the product was poste **and** when the seller joined (really important)

All of which is not able with the current Offerup app

![Orginal App](/offerup/offerup_app.jpg)

# 2. Getting product data

First things first, I needed the data of all their posting. Unfortunately they don't have a public API that they expose that will allow me to have access to their live inventory. This means we need to create our own.

One really easy way is by scrapping their website with some [Scrapping tool](https://www.google.com/search?q=ScrappingTool)

I tried use some of my favorite scrappers like Webdriver.IO, Cypress, Puppeter but none of them worked. When navigating to their site, good ol Cloudflare blocked me.

![Clouldflare blocked request](/offerup/cloudflare.png)

This made sense, in fact its really common for web apps to use Cloudflare for this exact reason. Imagine running the script below without Cloudflare ... yeah probably gonna crash your site

```js
for (let i = 0; i < 99999999999; i++) {
  browser.url("https://your-site");
}
```

I stumbled upon one library that did not get blocked called [Playwright](https://github.com/microsoft/playwright). It's library developed by Microsoft that was recently open sourced. It has one of the best documentation I have ever seen in any library, its really fast and simple to use. And for some odd reason, its not blocked by Cloudflare ¯\\\_(ツ)\_/¯

Great we have our scrapper library chosen, how should we write this?

Well there are two choices:

- We scrape the DOM and create our data through that
- We intercept network responses that contain our data

I choose Choice 2. Choice 1 is a good choice but in this case, its not since the DOM on Offerup is hard to scape. Most of the DOM has class names that aren't exactly `words` here is an example of what it looks like:

(this was most likely done at build time by hashing the props passed to components and setting the hash as the classname... pretty clever, and very efficient)

```html
<a
  class="_109rpto _1anrh0x"
  style="width: 231px; min-width: 231px; display: block;"
  ><div class="_b31be13">
    <div class="_178faes" style="background-color: rgb(216, 216, 216);">
      <div class="_1pq2f04" style="padding-top: 133.333%;">
        <div class="_14rpfee"></div>
      </div>
      <div class="_absx0nb _1r5r9qh">
        <span class="_1r0z77nm">...</span>
      </div>
    </div>
    <div class="_1g9xn5a">
      <span class="_nn5xny4 _y9ev9r">...</span>
      <div class="_1ndiotn"><span class="_s3g03e4">...</span></div>
      <span class="_19rx43s2">...</span>
    </div>
  </div></a
>
```

Choice 2 it is. But weirdly enough, when I navigated to [https://offerup.com/search/](https://offerup.com/search/), there were **no** network requests fetching the data, data was being populated as a global JS var embedded in the html response of the initial page load. This was a interesting approach, it suggests the pages are built at runtime for faster performance.

![Page source of offerup.com](/offerup/pagesource.png)

Well that makes it a whole lot easier, all we need to do is access

```js
window.__OU_PROPS__.searchResponse.feedItems;
```

Great we have our data. Now the fun begins.

# 3. The server

You can clone the repo here for reference

```sh
$ git clone https://github.com/ovidubya/offerup-deals-server.git
```

So I went with creating a Express server that can run CRON jobs that will auto fetch my data from offerup. I also went ahead and created a dockerfile to build an image since one I wanted to be able to run this server on my Raspberry PI.

One important decision I made was not to use a Database for this server, everything is managed on the filesystem through json file. This had some drawbacks but one nice benefit is thats one less dependency on the server.

The server has 5 routes all of which have basic CRUD functionality

```css
/offerup/data
/offerup/blacklist
/offerup/extract
/offerup/jobs
/offerup/settings
/offerup/token
```

`/data` will return offerup data if it exists on the file system

`/blacklist` is used to blacklist certain items to never show on the app

`/extract` will auto run the cron job to extract data from offerup

`/jobs` toggle the 15 minute cron job for extracting data

`/settings` used to define the search criteria and filtering when the job extracts from offerup

`/token` used to update the token so that the server can send push notifications

Now all the routes are set up, lets dive into the app

# 4. The app

I had no prior experience with React Native before starting this project, but to my surprise that really wasn't needed. React Native statement on their website

> Learn once, write anywhere.

Is truly the most accurate thing I have heard.

Now there are two ways to create a React native application, one with expo and one without. The advantage with Expo is it gives you rich set of components, services and tools to build your app but the disadvantage is that you can't run native code. Ability to run Native code is powerful but React native doesn't have any built support for push notifications whereas Expo does, Expo was the no brainier on this one.

Setting up the push notifications was stupidly easy, here is the function that gets called on mount and thats all is needed:

```js
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    setExpoToken(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("default", {
      name: "default",
      sound: true,
      priority: "max",
      vibrate: [0, 250, 250, 250],
    });
  }
};
```

With `setExpoToken`, now the token is part of the global state and saved on the device's memory using SessionManagement. All I needed to do is post it to the server and the server will use that token to ping the app when new arrivals show up that are not on the blacklist.

Pretty simple, and very clean.

# So how did I beat the scammers?

Well, one day 2 weeks ago I got notification on my phone for a PS4 that was posted 7 minutes ago for 200 dollars by an Author who joined in 2015, is TruYou verified, has 10 Reviews and accepts shipping.

Wanna know what I did?

![](/offerup/accepted.jpg)

Instantly grabbed it off his hands for and now waiting for delivery 😊
