const axios = require('axios')
const express = require('express')
const path = require('path')
var S = require('string');
const app = express();
const url = require('url')
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/',(req,res)=> {
    res.render('home')
})
app.post('/',async(req,res)=> {
    console.log(req.body)
    axios.get(req.body.url)
    .then(data => {
        // https://maps.app.goo.gl/9ivZQ71CKMqRPDtQA
        const url = data.request.res.responseUrl
        console.log(url)
        var {pathname,host} = new URL(url)
        console.log(pathname)
        var newUrl = pathname

        const array = newUrl.split('/')
        console.log(array)
        try{
            const array = pathname.split('@')[1].split(',')
            const latitude = array[0]
            const longitude = array[1]
            const geo = new URL('geo://' + latitude + ',' + longitude)
            console.log(geo.href)
            res.redirect(geo.href)
        
        }
        catch
        {
            console.log(array[3])
            var om = 'om://search?query=' + array[3]
            console.log((om))
            om = S(om).replaceAll('+', '%20').s
        
            console.log(om)
            res.redirect(om)
        }
        
    })
})

app.listen(3000,()=> {
    console.log('SERVER RUNNING AT 3000')

})