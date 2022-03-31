<script context="module">
    export const router=false
    export const hydrate = false
</script>
<script>
    import {dev} from '$app/env'
    import "../app.css";
</script>
<nav class="shadow-lg bg-blue-200 dark:text-gray-300 p-5 flex justify-between bg-gradient-to-r from-indigo-500 to-purple-400">
    <a href="/">
        <header class="font-semibold text-2xl">Satyam's blog</header>
    </a>
</nav>
<div class="p-10 mx-auto sm:mx-50 ">
    <slot>
</slot>
</div>
