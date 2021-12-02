<script context="module">
    export async function load({fetch,page}){
        console.log(22,page.path)
        const path_val = page.path.replace('/blog','/content')
        console.log(page.path,path_val)
        const url = `${path_val}.json`
        
        const res = await fetch(url)
        console.log(res.status,url)
        const {blog} = await res.json()
        return {
            props : {
                blog
            }
        }
    }
</script>
<script>
    export let blog
    console.log(blog)
</script>
<div class="leading-9">
    <header class="font-bold text-xl">{blog.heading}</header>
    <h3 class="text-xs text-gray-500">{blog.date}</h3>
    <!-- {@html blog?.body} -->
    <div>
        <header class="font-semibold">This blog tells you how to convert any PWA (with svelte kit example) to an android app using node js.</header>
        <div>
          <header class="font-bold shadow-lg text-white bg-blue-500 p-4 rounded-lg">Step 0 : Environment</header>
          <div class="bg-purple-200 mt-5 p-4 rounded-lg shadow-lg font-medium">
            <ul>
              <li class="text-green-500">Node js 12+</li>
              <li class="text-green-500">npm i -g @bubblewrap/cli / pnpm i -g @bubblewrap/cli</li>
              <li class="text-red-500">Android Studio not must,can use emulator for testing app</li>
            </ul>    
          </div>
        </div>
        <div class="mt-5">
          <header class="font-bold shadow-lg text-white bg-blue-500 p-4 rounded-lg">Step 1 : Have a running PWA website</header>
          <div class="bg-purple-200 mt-5 p-4 rounded-lg shadow-lg font-medium">
            <p>You can read more about PWA <a class="text-blue-500 underline" href="https://web.dev/progressive-web-apps/">here</a> . This blog makes an assumption that your website is a PWA. For a svelte kit example you can check <a class="text-blue-500 underline" href="https://github.com/mishrasatyam/blog.satyam.life">github repo</a> hosted on <a class="text-blue-500 underline" href="https://blog.satyam.life">blog.satyam.life</a> .</p>
          </div>
        </div>
        <div class="mt-5">
          <header class="font-bold shadow-lg text-white bg-blue-500 p-4 rounded-lg">Step 2 : Use bubblewrap cli</header>
          <div class="bg-purple-200 mt-5 p-4 rounded-lg shadow-lg font-medium">
            
            <p><a class="text-blue-500 underline" href="https://github.com/GoogleChromeLabs/bubblewrap">Bubblewrap cli</a> takes your app's manifest.json as input , asks a few questions  
        
            </p>
        </div>
      </div>
      </div>
</div>