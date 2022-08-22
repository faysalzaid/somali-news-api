// import { json } from 'body-parser'
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const _ = require('lodash')


const app = express()




app.get('',(req,res)=>{
    res.send('working')
})

const articles =[]
app.get('/war',(req,res)=>{
    axios.get('https://www.bbc.com/somali')
    .then((response)=>{
        const html =response.data
        const $ = cheerio.load(html)
        $('.bbc-1sk5sm2',html).each(function(){
            const title = $(this).text()
            const link = $(this).find('a').attr('href')
            const time = $(this).find('.bbc-idwms3').text()
            const fulllink = 'https://www.bbc.com'+link
            articles.push({
                title,
                fulllink,
                time
            })

            // console.log(title);
        })
        res.send(articles)
    }).catch(err=>console.log(err))
})


app.get('/war/:detail',async(req,res)=>{
    const details = _.trim(req.params.detail)
    const detailUrl = articles.filter((news)=> _.trim(news.title) == details)[0].fulllink
    console.log(detailUrl);
    axios.get(detailUrl)
    .then((response)=>{
        const data = response.data
        console.log(data);
    }).catch(err=>console.log(err))
})


app.listen(3000,()=>{
    console.log('Server Working');
})

