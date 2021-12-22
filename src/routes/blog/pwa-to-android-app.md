<script>
    import {format_date} from '$lib/utils'
</script>    
# PWA to android app
###### Date : <span use:format_date>2021-12-02</span> 
##### This tells you steps to generate a TWA(trusted web activity) / android app from a PWA.

## Step 0 *Environment*

Node js 12+
```
npm i -g @bubblewrap/cli
```

Android Studio not must,can use emulator for testing app

## Step 1 : *Have a running PWA website*

You can read more about PWA [here](https://web.dev/progressive-web-apps/) . This blog makes an assumption that your website is a PWA. For a svelte kit example you can check [github repo](https://github.com/mishrasatyam/satyam.life) hosted on [satyam.life](https://satyam.life).

## Step 2 : *Use bubblewrap cli*

[Bubblewrap cli](https://github.com/GoogleChromeLabs/bubblewrap) takes your app's manifest.json as input , asks a few questions. For example, I am generating app from satyam.life website . I have attached commands and terminal screenshots below.

```
bubblewrap init --manifest https://satyam.life/manifest.json
```
followed by 
```
bubblewrap build
```
You don't have to worry about java and android dependencies , as bubblewrap will install them

It will also generate signing key for your app, if you can't provide one. Don't forget passwords!

In the end you will get a android app with apk format and aab format which you can upload on play store.

Use 
```
bubblewrap install
``` 
command to install app on your connected device or open emulator device.
![Bubblewrap init](/terminal/1.png)
  
![app details](/terminal/2.png)
![launcher icons](/terminal/3.png)
![OPtional features](/terminal/4.png)
![Signing key](/terminal/5.png)
![Bubblewrap build](/terminal/6.png)
![App creates](/terminal/7.png)

## Step 3 : *Verify that you are owner of website*

Anyone can grab manifest.json and try the above method to create an app. So what happens then?

So, if it is not verified that your app and website have same owner, your app will look like a chrome tab

![Unverified App](/unverified_app.png)

Verify Steps :

Generate a sha256_cert_fingerprint from your signing key with 
```
keytool -list -v -keystore <your_key>
```

You will have to install some dependencies and enter password for your key. Your output will look like below:

![Keytool output](/keytool_output.png)

Copy the SHA256 value starting after SHA256: and paste it somewhere
Now go back to you web app , find the folder which has your static files . For svelte kit it is static folder and create a file 
```
.well-known/assetlinks.json
``` 
inside 
```
static
``` 
folder.

Add 
```
[
    {
        "relation": [
            "delegate_permission/common.handle_all_urls"
        ],
        "target": {
            "namespace": "android_app",
            "package_name": "com.your.package_name",
            "sha256_cert_fingerprints": [
                "XX:XX:XX:..."
            ]
        }
    }
]
```
Replace com.your.package_name with your package_name value and XX:XX:XX:... with SHA256 value you had copied earlier
You can view for satyam.life at 
```
https://satyam.life/.well-known/assetlinks.json
```

Now app looks like :
![Verified App](/verified_app.png)

Remember for production in google play store, you have to add play store's key's SHA256 to .well-known/assetlinks.json
You can add multiple SHA256 cert sha256 cert fingerprints like
```
[
    {
        "relation": [
            "delegate_permission/common.handle_all_urls"
        ],
        "target": {
            "namespace": "android_app",
            "package_name": "com.your.package_name",
            "sha256_cert_fingerprints": [
                "your_dev_key"
            ]
        }
    },
    {
        "relation": [
            "delegate_permission/common.handle_all_urls"
        ],
        "target": {
            "namespace": "android_app",
            "package_name": "com.your.package_name",
            "sha256_cert_fingerprints": [
                "play_store_key"
            ]
        }
    }
]
```

Good luck! Check <a href="/app-release-signed.apk" download>APK</a> here.
<style>
    img[alt="Unverified App"] { height : 250px; }

    img[alt="Verified App"] { height: 250px}
</style>    