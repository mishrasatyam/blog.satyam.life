<svelte:head>
    <meta name="description" content="Authentication in svelte-kit app with jwt and cookies.">
</svelte:head>
<script>
    import {format_date} from '$lib/utils'
</script>    
# Svelte kit JWT auth
###### Date : <span use:format_date>2022-1-14</span> 
##### Authentication in svelte-kit app with jwt and cookies.

## Step 0 : *Environment*

Node js 14+

This article assumes you know the basics of [svelte kit](https://kit.svelte.dev/). 

I see a lot of doubt regarding authentication in svelte-kit's discord channel. This will give you a simple demonstration. Full project is on [github](https://github.com/mishrasatyam/svelte_kit_jwt_auth)

## Step 1 : *Login Endpoint*

> Endpoints are modules written in .js (or .ts) files that export functions corresponding to HTTP methods.

From your login.svelte send your username and password to the endpoint.

Verify user credentials. If user is not verifed return 
```svelte
return {
    status:401,
    body: {
        error : 'Incorrect username or password!'
    }
}
```
and show an error message on screen.

If user is verifed , sign a jsonwebtoken(JWT) , put it inside a cookie and return response with a set-cookie header.As you know signing a jwt requires a secret key, keep it in .env and import it

```javascript
const jwt = sign({username:user.username}, import.meta.env.VITE_JWT_PRIVATE_KEY)// add a private key in .env

    const cookie = createCookie({name:'jwt',value:jwt,origin:url.origin})
    return {
        status : 200,
        headers  :{
            'set-cookie':cookie
        },
    }
```
Here is the createCookie method:
```javascript
function createCookie({name,value,origin}){
    let expires = new Date()
    expires.setMonth(expires.getMonth()+6) //setting cookie to expire in 6 months
    let cookie_options = {httpOnly:true, path:'/',sameSite:true,expires}
    if(!dev){
        cookie_options.secure = true
        cookie_options.domain = origin
    }
    const cookie = serialize(name,value,cookie_options)
    return cookie
  }
``` 

This will set a cookie in your browser. Let's learn how to parse cookie in next step

## Step 2 : *Hooks*

Let's parse the cookie we set using handle function in src/hooks.js

> Handle function runs every time SvelteKit receives a request — whether that happens while the app is running, or during prerendering — and determines the response. 

In handle function we will parse jwt from cookie and check if it's valid.

```javascript
import {parse} from 'cookie';
import {verify} from 'jsonwebtoken'


export async function handle({ event, resolve }) {
    const {request,locals} = event
	const cookies = parse(request.headers.get('cookie') || '');
    //verify your jwt here, pass data to session object using locals
    try{
		locals.user = cookies.jwt && verify(cookies.jwt, import.meta.env.VITE_JWT_PRIVATE_KEY); //this will give decoded value of jwt eg : {username:xyz}		
	}catch(err){
		locals.user=undefined
	}
    const response = await resolve(event)
	return response;
}
```

Our cookie is server side , this is the safest way as client code (code running on browser) has no access to it.

Let's add value to our session store using getSession function. Content of request.locals can be passed to getSession. Make sure to return data which isn't sensitive and getSession data is exposed to client.

```javascript
export function getSession({ locals }) {
	return {
		user: locals.user && {
			...locals.user
		}
	};
}
```

But getSession only runs on server side rendering, this can cause empty session value in your load function.So I disable client side router on login page. This will cause server side rendering after authentication.

So, in login.svelte
```javascript
    <script context="module">
    export const router = false // disabling client side router to run handleSession in hooks, so use location.href instead of goto in this page
</script>
```

## Step 3 : *Logout Endpoint*

To logout return set-cookie with an older date.
```javascript
import {serialize} from 'cookie'
export async function get({url}){
    return {
        headers: {
			'set-cookie': serialize('jwt','deleted',{expires:new Date(0),path:'/',domain:url.origin}),
            location:'/auth/login'
        },
        status:302
    }
}
```
Remember , since new svelte-kit version (Not sure but I guess 229) , for an endpoint use 
```javascript
<a href="path" rel="external">
```

## Step 3 : *Protected content*

After authentication setup is done, you would want only authenticated users to visit your page. So , check if user is presesnt in session . If not redirect to login page.

```javascript
<script context="module">
    export async function load({session}){
        if(!session?.user){
            return {
                redirect : '/auth/login',
                status:302
            }
        }
        return {
            props  :{
                user : session?.user
            }
        }
    }
</script>
```


Good luck! Enjoy building apps with svelte kit.

