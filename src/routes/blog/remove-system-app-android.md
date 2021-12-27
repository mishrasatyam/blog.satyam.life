<svelte:head>
    <meta name="description" content="This will tell how you can remove any app on your android phone.">
</svelte:head>
<script>
    import {format_date} from '$lib/utils'
</script>    
# Remove system app on android
###### Date : <span use:format_date>2021-12-27</span> 
##### This will tell how you can remove any app on your android phone.

## Step 1 : *Install ADB*

Check this [article](https://www.xda-developers.com/install-adb-windows-macos-linux/) to install adb on windows, mac os or linux.

## Step 2 : *Enable USB debugging*

Found section in settings where you have information about your phone's build number.

Tap that until you see "You are a developer"

In my phone build number is at : 

```
Settings > About Phone > Baseband & kernel
```

![Build Info](/build_info.jpeg)

Now , since you are a developer , find your developer settings.

In my phone developer settings is at : 

```
Settings > Additional Settings > Developer options
```
Connect your phone to your laptop with USB.

Inside developer options , find USB debugging option and turn it on, you might see a warning : 

![Allow USB debugging](/allow_usb_debugging.jpeg)

Goto your terminal and type adb devices, this will prompt your phone with : 

![Allow USB debug from this computer](/allow_computer.jpeg)

Select Always allow and click on ALLOW.

Now check adb devices and you should have output like : 
```
List of devices attached
b5e2c7cb	device
```

If you don't allow usb debug from computer, you will get :
```
List of devices attached
b5e2c7cb	unauthorized
```

Now I assume your computer is authorised for usb debugging.

## Step 3 : *Find app's package name*

You need to find package name for the app you want to remove.
It's like
```
com.abc.app
```

I use this [app](https://play.google.com/store/apps/details?id=com.jgba.appinspector) to find package name.

But you can use any other way to find package name.

## Step 4 : *Remove app*

> Please be sure to not remove any app which may be crucial for your system to run.

Open adb shell
```
adb shell
```
Google podcast app came pre-installed in my phone. It's package name is 
```
com.google.android.apps.podcasts
```

Let's remove it : 
```
pm uninstall -k --user 0 com.google.android.apps.podcasts
```
Output: 
```
Success
```

If you enter wrong package name which is not installed in your phone you will see : 
```
Failure [not installed for 0]
```

Remove apps bloating your phone!!

<style>
    img{ height : 450px; }
</style>    