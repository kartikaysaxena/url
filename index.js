const axios = require('axios')
const express = require('express')
const path = require('path')
var S = require('string');
const app = express();
const url = require('url')
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
const port = process.env.PORT || 3000
app.get('/',(req,res)=> {
    res.render('home')
})
app.post('/',async(req,res)=> {

    axios.get(req.body.url)
    .then(data => {
        // https://maps.app.goo.gl/9ivZQ71CKMqRPDtQA
        const url = data.request.res.responseUrl

        var {pathname,host,hash,search,path} = new URL(url)
        console.log(url)
        console.log(host)
        var newUrl = pathname

        const array = newUrl.split('/')
        if (host==='www.google.com')
        {
            const path = pathname + search + hash
            console.log(path)
        
  
            if (path.startsWith('/maps?daddr=') || path.startsWith('/maps?saddr=') )
            {
                var address = path.split('=')[1]
                var link = 'om://search?query=' + address
                const regex = /\+/ig
                link = link.replace(regex,"%20")
                console.log(link)
                res.redirect(link)
            }
            else if(path.startsWith('/maps?q=loc:'))
            {
                var coord = path.split(':')[1]
                var link = 'geo:' + coord
                console.log(link)
                res.redirect(link)
            }
            else if(path.startsWith('/maps?ll='))
            {
                var coord = path.split('=')[1]
                var link = 'geo:' + coord
                console.log(link)
                res.redirect(link)
            }
            else if(path.startsWith('/maps?q=') || (path.startsWith('/search?q=')))
            {
                var address = path.split('=')[1]
                var link = 'om://search?query=' + address
                const regex = /\+/ig
                link = link.replace(regex,"%20")
                console.log(link)
                res.redirect(link)
            }
    
            else if (path.startsWith('/maps/search/?q='))
            {
                var address =  path.split('=')
                var link = 'om://search?query=' + address[address.length-1]
                console.log(link)
                const regex = /\+/ig
                link = link.replace(regex,"%20")
                res.redirect(link)
            }
            else if (path.startsWith('/maps/search/') )
            {
                var address = path.split('/')
                if (address[address.length-1].charAt(0)==='@')
                {
                    address[address.length-1] = address[address.length-1].substring(1)
                    console.log(address[address.length-1])
                }
               
                var link = 'om://search?query=' + address[address.length-1]
                console.log(link)
                const regex = /\+/ig
                link = link.replace(regex,"%20")
                res.redirect(link)
            }
            else if(path.startsWith('/maps/dir/'))
            {
                var address = path.split('/')
                var link = 'om://search?query=' + address[address.length-1]
                console.log(link)
                const regex = /\+/ig
                link = link.replace(regex,"%20")
                res.redirect(link)
            }
            else
            {
                try{
                    const array = pathname.split('@')[1].split(',')
                    const latitude = array[0]
                    const longitude = array[1]
                    const geo = new URL('geo:' + latitude + ',' + longitude)
              
                    res.redirect(geo.href)
                
                }
                catch
                {
                    console.log('here')
        
                    var om = 'om://search?query=' + array[3]
             
                    const regex = /\+/ig
                    om = om.replace(regex,"%20")
                
        
                    res.redirect(om)
                }
            }
            
        }
        else if(host==='www.openstreetmap.org')
        {
           
                var arr = hash.split('/')
                const latitude = arr[1]
                const longitude = arr[2]
                const geo = new URL('geo:' + latitude + ',' + longitude)
                res.redirect(geo.href);
         
        }
        else if (host==='captcha.2gis.ru')
        {
            const array = search.split('%2F')[7].split('%2C')
            var latitude = array[0]
            var longitude = array[1]
            //   console.log(latitude,longitude)
            const geo = new URL('geo:' + latitude + ',' + longitude)
            //   console.log(geo.href)
            res.redirect(geo.href)
        }
        
        
    })
})

app.listen(port,()=> {
    console.log(`SERVER RUNNING AT ${port}`)

})