<script>
    import {format_date} from '$lib/utils'
</script>    
# Why you should not learn svelte
###### Date : <span use:format_date>2021-12-22</span> 
##### This tells you why you should not learn svelte.

Once you learn svelte , you will not enjoy writing react code after you find out how easy svelte is. It's just like writing html with extra features!

Let's see counter example in svelte

```
<script>
    let count = 0
</script>

<h1 >{count}</h1>
<button on:click={()=>count+=1}>Click</button>
```

You won't get the joy of choosing between multiple global store options as svelte has it ,inbuilt!

Now jobs are a real concern, svelte does have less job openings. :(

> BTW, use whatever library/framework get's the job done. :)

