<script>
    import 'virtual:windi.css'
    import {color_mode} from '$lib/utils'
    import Sun from "$lib/icons/Sun.svelte";
    import Moon from '$lib/icons/Moon.svelte';    
    import {browser} from '$app/env'

    if(browser){
        console.log($color_mode)
        if($color_mode=='dark'){
            document.body.classList.add('black')
        }else{
            document.body.classList.remove('black')
        }
    }
</script>
<nav class="shadow-lg bg-blue-200 p-5 flex justify-between">
    <a href="/">
        <header class="font-semibold text-2xl">Satyam's blog</header>
    </a>
    {#if $color_mode =='light'}
        <div class="cursor-pointer" on:click={()=>{$color_mode='dark';localStorage.setItem('color_mode','dark');document.body.classList.add('black')}}>
            <Sun size="2rem"/>
        </div>
    {:else}
        <div class="cursor-pointer" on:click={()=>{$color_mode='light';localStorage.setItem('color_mode','light');document.body.classList.remove('black')}}>
            <Moon size="2rem"/>
        </div>
    {/if}
</nav>
<div class="p-10 mx-5 sm:mx-50">
    <slot/>
</div>