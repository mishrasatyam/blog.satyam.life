<script>
import blog_list from './blog/content.json'
import {format_date} from '$lib/utils'

</script>
<div class="dark:text-white  space-y-5 mx-auto prose prose-a:text-blue-600 prose-a:hover:text-blue-500">
{#each blog_list as blog}
    <div class="shadow-lg p-4 rounded-lg shadow-blue-400 dark:shadow-blue-200 dark:bg-slate-700">
        <a href="/blog/{blog.params}">
            <header class="font-bold text-blue-400 text-xl">{blog.heading}</header>
        </a>    
        <h3 use:format_date class="text-xs text-gray-500">{blog.date}</h3>
        <p>{blog.short_description}</p>
    </div>
{/each}
</div>
