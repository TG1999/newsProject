const express=require('express')
app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const NewsAPI = require('newsapi');
const {key}=require('./exports')
const newsapi = new NewsAPI(key);
const port=process.env.PORT||3000
app.set('view engine','hbs');
app.get('/',(req,res)=>{
    res.redirect('/india')
})
app.get('/:q',(req,res)=>{
    newsapi.v2.topHeadlines({
        q:req.params.q,
        language:'en'
      }).then((response)=>{
          console.log(response)
          articles=response['articles'];
          for(i in articles){
              title=articles[i]['title']
          des=articles[i]['description']
          console.log(title)
          console.log(des)    
      }
      res.render('newsfeed',{articles:articles})
      })      
})
app.listen(port,()=>{
    console.log('http://localhost:3000')
})
