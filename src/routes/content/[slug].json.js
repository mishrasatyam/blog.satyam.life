export async function get({params}){
    let blog
    if(params.slug=='all'){
        blog = blog_list
    }else{
        console.log(44,params.slug)
        blog = blog_list.find(el => el.params ==params.slug)
    }
    if(blog){
        return {
            body : {
                blog
            },
            status : 200
        }
    }
    return {
        status : 404
    }
}

const blog_list = [
    {
        params:'svelte-kit-to-android-app',
        heading: 'Generate Android app from a svelte kit website',
        date:'15th November 2021',
        body: `<div>
            
        </div>`    
    }
]