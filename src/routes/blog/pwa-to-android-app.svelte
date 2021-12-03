<script>
    import ShowCommand from "$lib/ShowCommand.svelte";
    import { color_mode } from "$lib/utils";
</script>
<div class="leading-9">
    <header class="font-bold text-xl {$color_mode=='light'?'text-black':'text-white'}">Generate Android app from a PWA</header>
    <h3 class="text-xs text-gray-500">2nd December 2021</h3>
    <div>
        <header class="">This tells you steps to generate a TWA(trusted web activity) / android app from a PWA.</header>
        <div>
          <header class="font-bold shadow-lg text-white bg-blue-500 p-4 rounded-lg">Step 0 : Environment</header>
          <div class="bg-purple-200 mt-5 p-4 rounded-lg shadow-lg">
            <ul>
              <li class="text-green-500">Node js 12+</li>
              <li class="">
                <ShowCommand command="npm i -g @bubblewrap/cli"/>
              </li>
              <li class="text-red-500">Android Studio not must,can use emulator for testing app</li>
            </ul>    
          </div>
        </div>
        <div class="mt-5">
          <header class="font-bold shadow-lg text-white bg-blue-500 p-4 rounded-lg">Step 1 : Have a running PWA website</header>
          <div class="bg-purple-200 mt-5 p-4 rounded-lg shadow-lg">
            <p>You can read more about PWA <a class="text-blue-500 underline" href="https://web.dev/progressive-web-apps/">here</a> . This blog makes an assumption that your website is a PWA. For a svelte kit example you can check <a class="text-blue-500 underline" href="https://github.com/mishrasatyam/satyam.life">github repo</a> hosted on <a class="text-blue-500 underline" href="https://satyam.life">satyam.life</a> .</p>
          </div>
        </div>
        <div class="mt-5">
          <header class="font-bold shadow-lg text-white bg-blue-500 p-4 rounded-lg">Step 2 : Use bubblewrap cli</header>
          <div class="bg-purple-200 mt-5 p-4 rounded-lg shadow-lg">  
            <p><a class="text-blue-500 underline" href="https://github.com/GoogleChromeLabs/bubblewrap">Bubblewrap cli</a> takes your app's manifest.json as input , asks a few questions. For example, I am generating app from satyam.life website . I have attached commands and terminal screenshots below.

            </p>
            <p><ShowCommand command ='bubblewrap init --manifest https://satyam.life/manifest.json
              '/> followed by <ShowCommand command ='bubblewrap build'/></p>
            
            <p>You don't have to worry about java and android dependencies , as bubblewrap will install them</p>
            <p>It will also generate signing key for your app, if you can't provide one. Don't forget passwords!</p>
            <p>In the end you will get a android app with apk format and aab format which you can upload on play store.  </p>
            <p>Use <ShowCommand command ='bubblewrap install'/> command to install app on your connected device or open emulator device</p>
    
            {#each [1,2,3,4,5,6,7] as el}
              <img src="/terminal/{el}.png" alt="Terminal {el} image" class="mt-3">
            {/each}
          </div>  
        </div>
        <div class="mt-5">
          <header class="font-bold shadow-lg text-white bg-blue-500 p-4 rounded-lg">Step 3 : Verify that you are owner of website</header>
          <div class="bg-purple-200 mt-5 p-4 rounded-lg shadow-lg">  
            <p>Anyone can grab manifest.json and try the above method to create an app. So what happens then?</p>
            <p>So, if it is not verified that your app and website have same owner, your app will look like a chrome tab</p>
            <img src="/unverified_app.png" alt="unverified" class="h-90">
            <p>Verify Steps : </p>
            <ol>
              <li>Generate a sha256_cert_fingerprint from your signing key <ShowCommand command="keytool -list -v -keystore <your_key>"/>
                You will have to install some dependencies and enter password for your key. Your output will look like below:
                <img src="/keytool_output.png" alt="keytool output">
                Copy the SHA256 value starting after SHA256: and paste it somewhere 
              </li>
              <li>Now go back to you web app , find the folder which has your static files . For svelte kit it is static folder and create a file <ShowCommand command=".well-known/assetlinks.json"/>  inside <ShowCommand command="static"/> folder</li>
              <li>Add <ShowCommand command={[
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
              ]}/></li>
              <li>Replace com.your.package_name with your package_name value and XX:XX:XX:... with SHA256 value you had copied earlier</li>
              <li>You can view for satyam.life at <ShowCommand command="https://satyam.life/.well-known/assetlinks.json"/> </li>  
              <li>Now app looks like : 
                <img src="/verified_app.png" alt="verified app" class="h-90">          
              </li>
              <li>Remember for production in google play store, you have to add play store's key's SHA256 to .well-known/assetlinks.json</li>
              <li>You can add multiple SHA256 cert sha256 cert fingerprints like 
                <ShowCommand command={[
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
              }/>
              </li>
              <li>Good luck! Check <a class="text-blue-500" href="/app-release-signed.apk" download>APK</a> here. </li>
            </ol>
          </div>  
        </div>
      </div>
</div>