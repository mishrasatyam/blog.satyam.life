<script>
    import 'prism-themes/themes/prism-pojoaque.css'
    // @import 'npm_package/path/file.scss'
</script>
```js
async function handleSubmit(){
        error = undefined
        const method = 'post'
        const url = `/auth/api/login`
        const body = JSON.stringify({username,password})
        const headers = {'content-type':'application/json'}
        const res = await fetch(url,{method,body,headers})
        if(res.status==200){
            location.href='/'
        }else if(res.status==401){
            error = 'Invalid username or password'
        }
    }
```
>defef

   