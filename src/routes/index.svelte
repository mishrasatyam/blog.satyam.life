<script>
    export let blog_list = [{
        params:'pwa-to-android-app',
        heading: 'Generate Android app from a PWA',
        date:'2nd December 2021',
        short_description:'This tells you steps to generate a TWA(trusted web activity) / android app from a PWA.'
    }]

    import { color_mode } from "$lib/utils";

</script>
<div>
{#each blog_list as blog}
    <div class="{$color_mode=='light'?'text-black':'text-white'}">
        <a href="/blog/{blog.params}">
            <header class="font-bold text-xl">{blog.heading}</header>
            <h3 class="text-xs text-gray-500">{blog.date}</h3>
            <p>{blog.short_description}</p>
        </a>
    </div>
{/each}
</div>