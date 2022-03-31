<svelte:head>
    <meta name="description" content="Authenticate svelte kit app with a backend server using jwt.">
</svelte:head>
<script>
    import {format_date} from '$lib/utils'
</script>    
# Svelte kit auth with a backend server
###### Date : <span use:format_date>2021-12-20</span> 
##### This tells you how to authenticate svelte kit app with a backend server using jwt.

## Step 0 : *Environment*

Node js 14+

This article assumes you know the basics of [svelte kit](https://kit.svelte.dev/). For backend I am using [fastify](https://www.fastify.io).

## Step 1 : *Backend*

We will use http only cookie to send our jwt. We will use [fastify-jwt](https://github.com/fastify/fastify-jwt) and [fastify-cookie](https://github.com/fastify/fastify-cookie) which are part of fastify ecosystem.

Let's see login response after verifying user's credentials.

```javascript
//body is whatever information you want to send to your logged in user
const token = fastify.jwt.sign(body)
let cookie_options = {signed: true,httpOnly:true,path:'/'}
//check your environment type
if(env=='prod'){
    cookie_options.secure = true
    cookie_options.domain = 'my_domain'
}
return reply.setCookie('jwt',token,cookie_options).code(200).send()
```

For protected routes use onRequest hook to check if requests cookies your jwt, if yes then verify it . Return appropriate response.

```javascript
fastify.addHook('onRequest', (request, reply, done) => {
        let signed_jwt = request.cookies.jwt
        console.log(signed_jwt)
        let jwt;
        try{
            jwt = request.unsignCookie(signed_jwt)?.value;
        }catch(err){           }
        const error = 'Invalid jwt!'
        if(jwt){
            fastify.jwt.verify(jwt, (err, decoded) => {
                if (err || !decoded) {
                    fastify.log.error(error)
                    return reply.code(401).send({error})
                }
                fastify.log.info(`jwt verified. User is ${decoded?.username}`)  
                return request.user = decoded // you can access this in your routes
            })
        }else{
            //no jwt received
            return reply.code(401).send({error})
        }
        done()
    })
```

## Step 2 : *Frontend*

In svelte-kit, you will have a login.svelte with function like below.  
```javascript
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

And we will have an endpoint named login.js at routes/auth/api . Here we send username and password to your fastify app, get a set-cookie header. Just return this header and you will see the cookie jwt in your Browser Network Tab> Application > Cookies . 

```javascript
import {api_url} from '$lib/util' //api-url is your backend server url

export async function post({body}){
    const url = `${api_url}/login/`
    const method = 'post'
    const headers = {'content-type':'application/json'}
    body = JSON.stringify(body)
    const res = await fetch(url,{method,headers,body})
    const status  = res.status
    if(status==200){
        return {
            headers  :{
                'set-cookie':res.headers.get('set-cookie')
            },
            status:200
        }    
    }
    return {
        status:401
    }
}
```

Now goto src/hooks.js or create it. Here we parse cookies , decode jwt and take out information which you want your client aka browser to see and add that to locals . (It is not advised to make sensitive data like tokens, passswords visible to client.) getSession runs on server side rendering .getSession will populate sesssion in your load function.

```javascript
import * as cookie from 'cookie';

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');
	const jwt = cookies.jwt && Buffer.from(cookies.jwt.split('.')[1], 'base64');
	request.locals.user = jwt ? JSON.parse(jwt) : undefined;	
	const response = await resolve(request)
	return response;
}

export function getSession({ locals }) {
	return {
		user: locals.user && {
			username: locals.user.username,
		}
	};
}
```

I add router = false to login.svelte to disable client side rendering for all links in the page. This causes getSession to run after you run login.js endpoint.
```javascript
<script context="module">
    export const router = false
</script>
```
Then I check session in protected routes (which only authenticated users should see) layout by : 
```javascript
<script context="module">
    export async function load({session}){
        if(!session?.user){ 
            return {
                redirect : '/auth/login/',
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

Also all request you make , make sure they have . In older version of svelte kit I didn't have to add credentials for request in load function but in latest version I had to.
```javascript
 const res = await fetch(url,{credentials:'include')
 ```

 Also your backend url should be sub domain of your frontend url for fetch in load function to work. For example if your website is at 
 ```
 satyam.contact
 ```
your backend should be at
```
api.satyam.contact
```

From svelte kit docs: 
```
Cookies will only be passed through if the target host is the same as the SvelteKit application or a more specific subdomain of it.
```

## Step 3 : *Example Code*


All code is in [frontend repo](https://github.com/mishrasatyam/expense_frontend/) and [backend repo](https://github.com/mishrasatyam/expense_backend).