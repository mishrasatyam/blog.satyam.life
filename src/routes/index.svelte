<script context="module">
    export async function load({fetch,page}){
        console.log(22,page.path)
        const url = `/content/all.json`
        const res = await fetch(url)
        const {blog} = await res.json()
        return {
            props:{
                blog_list : blog
            }
            
        }
    }
</script>
<script>
    export let blog_list
</script>
<div>
{#each blog_list as blog}
<div>
    <a href="/blog/{blog.params}">
        <header class="font-bold text-xl">{blog.heading}</header>
        <h3 class="text-xs text-gray-500">{blog.date}</h3>
    </a>
</div>
{/each}
</div>