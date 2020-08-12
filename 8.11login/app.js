const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors');
const app = new Koa()
const router = new Router()

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')

const session = require('koa-session')//session的实现

const config = require('./config')
const routes = require('./routes')

const { SSL_OP_EPHEMERAL_RSA } = require('constants')
const { resolve } = require('path')
const { rejects } = require('assert')

const port = process.env.PORT || config.port

// error handler
onerror(app)

app.keys=['banyuan'];
const CONFIG = {
  key:'koa.sess'
};

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(cors({
    credentials: true,
  }))
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'njk': 'nunjucks'},
    extension: 'njk'
  }))
  .use(session(CONFIG,app))
  .use(router.routes())
  .use(router.allowedMethods())




// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})




//8.10
router.get('/', async (ctx, next) => {

  const {name} = ctx.request.query

  // ctx.body = 'Hello World'
  // let {user} = ctx.request.query
  // console.log(user);

  let news=[{
    name:'这是新闻1',
    id:'1'
  },
  {
    name:'这是新闻2',
    id:'2'
  },
  {
    name:'这是新闻3',
    id:'3'
  },
  {
    name:'这是新闻4',
    id:'4'
  }]
  
  ctx.state = {
    title: 'Koa2',
    // test:'test',
    test:['test1','test2'],
    flag:true,
    gender:0,
    news:news

  }

  // ctx.session.user = {name:'tom'};
  ctx.session.user = {name};
  ctx.session.password = '123';
  // console.log('password',ctx.session.password)
  console.log('user',ctx.session.user)


  await ctx.render('index', ctx.state)
})








//8.10
let tasks=[{
  name:'任务1',
  checked:false
},
{
  name:'任务2',
  checked:false
},
{
  name:'任务3',
  checked:true
},
{
  name:'任务4',
  checked:false
},
{
  name:'任务5',
  checked:false
},
{
  name:'任务6',
  checked:true
}]


router.get('/todoList', async (ctx, next) => {
  
  ctx.state = {
    tasks

  }
  await ctx.render('todoList', ctx.state)
})



router.post('/checkTask', (ctx, next) => {
  
  const {name,checked} = ctx.request.body;
  tasks.forEach((item)=>{
    if(item.name === name){
      item.checked = !item.checked
      // item.checked = checked==='true'?true:false
    }
  })

  console.log(tasks);

  ctx.response.body = {status:'success'}
 
})

router.post('/addTask', (ctx, next) => {
  
  const {name} = ctx.request.body;
  tasks.push({
    name,
    checked:false
  })

  console.log(tasks);
  ctx.response.body = {status:'success'}
 
})


// router.post('/closeTask', (ctx, next) => {
  
//   const {name} = ctx.request.body;
//   tasks.remove({
//     tasks,name
//   })

//   console.log(tasks);
//   ctx.response.body = {status:'success'}
 
// })



router.post('/closeTask', (ctx, next) => {
  
  const {name} = ctx.request.body;
  let i = search(tasks,name);

  tasks.splice(i,1);
  // console.log(tasks)
  ctx.response.body={status:'success'}

 
})

function search(tasks,name){
  let i = tasks.length;
  while(i-=1){
    console.log(tasks[i].name);
    console.log('name',name);
    if(tasks[i].name===name){
      console.log('in');
      return i;
    }
  }
  return false;

}


router.post('/deleteTask', (ctx, next) => {
  
  const {name} = ctx.request.body;
  let index;
  tasks.forEach((item,i)=>{
    if(item.name === name){
      index = i;
      item.checked = !item.checked
    }
  })
  ;tasks.splice(index,1); 

  console.log(tasks);

  ctx.response.body = {status:'success'}
 
})














//8.07

// router.get('/add', async (ctx, next) => {
  
//   let {a,b} = ctx.request.query
//   console.log(a);
//   console.log(b);
//   ctx.response.body={
//     sum:Number(a)+Number(b)
//   }
  
// })

// router.post('/isPrime', async (ctx, next) => {
  
//   let {number} = ctx.request.body
//   number = Number(number);
//   const flag = isPrime(Number(number))
//   let data = {}
//   if(flag){
//     data.isPrime = true
//   }
//   else{
//     data.isPrime = false;
//     number++;
//     while(!isPrime(number)){
//       number++;
//     }
//   }
//   ctx.response.body = data;
  
// })
// function isPrime(n){
//   for(var i=2;i<n;i++){
//     if(num%i==0){
//       return  false;
//     }     
//   }
//   return true;
// }

// router.get('/', async (ctx, next) => {
  
//     let {name,password} = ctx.request.query
  
//   let obj = {
//     name:123,
//     password:234
//   }
//     ctx.response.body=obj
//   })

// router.post('/post', async (ctx, next) => {
  
//     let {name,password} = ctx.request.body
//     ctx.response.body = {
//       name:111,
//       password:222
//     }
// })









// router.post('/banyuan/ajax',async function(ctx,next){
//   const query = ctx.request.body;

//   if(query.status==='time'){
//     await sleep(5000);
//   }
//   ctx.response.body={status:'success'}
// })

// //延时
// function sleep(time){
//   return new Promise((resolve,rejects)=>{
//     setTimeout(()=>{
//       resolve();
//     },time)
//   })
// }



// router.post('/form',(ctx,next)=>{
//   const {name,password} = ctx.request.body;
//   console.log('name==>',name);
//   console.log('password==>',password);
//   ctx.response.body = {status:success};
// })


//8.07
// router.post('/checkName',(ctx,next)=>{
//   const {name} = ctx.request.body;
//   const names = ['123','456','789'];
//   let data = {};
//   if(names.indexOf(name) === -1){
//     data.include = false;
//   }else{
//     data.include = true;
//   }
//   console.log(data);
//   ctx.response.body = data;
// })




// router.post('/checkName',(ctx,next)=>{
//   const {name} = ctx.request.body;

//   let data = checkName(name);

//     ctx.response.body = data;//==>{flag : true/false,message:''}
// })


// router.post('/sendMessage',(ctx,next)=>{

//   let data = { status:'success'}

//   const {name,password} = ctx.request.body;

//   let nameResult = checkName(name);

//   if(nameResult.flag){
//     let passwordResult = checkPassword(password);

//     if(!passwordResult){
//       data.status = 'failed';
//       data.message = '密码格式错误，password的长度不小于8位，不大于15位'

//     }
//   }else{
//     data.status = 'failed';
//     data.message = nameResult.message;

//   }

//     ctx.response.body = data;//==>{flag : true/false,message:''}
// })



//8.08
// function checkName(name){
//   let data={
//     flag:true
//   }
//   //正则
//   var partten = /^[a-zA-Z0-9_-]{4,16}$/;
//   let flag = partten.test(name);

//   if(flag){
//     const names = ['isen','lucy','tom'];

//     if(names.indexOf(name) === -1){
//       // data.include = false;
//     }else{
//       // data.include = true;
//       data.flag = false;
//       data.message = '用户名重复'
//     }
//   }else{
//     data.flag = false;
//     data.message = '用户名输入错误，4到16位，字母，数字，下划线，减号'
//   }
//   return data;

  
// }

// function checkPassword(password){

//   var partten = /^\w{8,15}$/;
//   return partten.test(password);
// }






//8.11==>login

router.get('/login',async(ctx,next)=>{
  await ctx.render("login");
})


//
router.post('/login', async (ctx, next) => { 

      const{name,password} = ctx.request.body;

      // let data = JSON.stringify({name,gender:1});

      let data = {name}
      // console.log(data);

      //过期时间
      // ctx.cookies.set('user',data,{maxAge:4*1000});

      ctx.session.user = data;
      console.log(ctx.session.user)

      ctx.response.body={
        status :'success',
        // name,
        // password
      }
})


router.get('/loginTest',async(ctx,next)=>{

  // ctx.state = {
  //       title: 'Koa2',
  //       test:['test1','test2'],
  //       flag:true,
  //       gender:0,
  // }
  // const user = JSON.parse(ctx.cookies.get('user'));
  // console.log(user.name);


  // let user;

  let user = ctx.session.user;


  //cookie方式
  // if(ctx.cookies.get('user')){
  //   user = JSON.parse(ctx.cookies.get('user'));
  // }
  if(user){
    await ctx.render("test");
  }
  else{
   ctx.redirect("/login");
  }
 
})







routes(router)
app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
