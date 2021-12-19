import {readdir,writeFile} from 'fs/promises'
import {createReadStream} from 'fs'
import {createInterface} from 'readline'
import {dev} from '$app/env'
export async function handle({ request, resolve }) {
    let blog_folder_path = dev?'src/routes/blog':'pages/blog'
    console.log(blog_folder_path)
    let blog_list = await readdir(blog_folder_path)
    let detailed_blog_list = []
    blog_list.forEach(el => {
        let json = {}
        if(el.endsWith('.md')){
            json.params = el.replace('.md','')
            const full_path = blog_folder_path + '/'+el
            const rl = createInterface({
                input: createReadStream(full_path),
                output: process.stdout,
                terminal: false
            });
            let i=0
            rl.on('line', (line) => {
                i+=1
                if(i==1){
                    json.heading = line.replace('# ','')
                    
                }else if(i==2){
                    json.date = line.replace('###### Date : ','')
                }else if(i==3){
                    json.short_description = line.replace('##### ','')
                    rl.close()
                    rl.removeAllListeners()
                    detailed_blog_list.push(json)
                    if(el == blog_list[blog_list.length-1]){
                        writeFile(blog_folder_path+'/content.json',JSON.stringify(detailed_blog_list,null,4))
                    }
                }
            });
        }
    })        
	const response = await resolve(request)
	return response;
}