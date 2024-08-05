import express from "express";
import bodyParser from "body-parser";
import { title } from "process";
import { timeLog } from "console";

const app = express();
const port = 4000;


let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/posts", (req,res)=>
{
    res.json(posts);
})


app.get("/posts/:id",(req,res) =>{
  const id = parseInt(req.params.id);
  const search_idx = posts.findIndex((post)=> post.id===id);
  if(search_idx>-1)
  {
    res.json(posts[search_idx]);
    res.status(200).send("success");
  }
  else res.status(404).send(`id: ${id} not Found`);
  
})


app.post("/posts",(req,res)=>{
  const post_blog = {
    id :posts.length+1,
    title:req.body.title,
    content:req.body.content,
    author:req.body.author,
    date:new Date(),
  }
  posts.push(post_blog);
  console.log(posts)
  res.status(201).json(post_blog);
})


app.patch("/posts/:id",(req,res)=>{
  const existing_post = posts.find((post)=> post.id===parseInt(req.params.id));
  const updated_post = {
    id:parseInt(req.params.id),
    title : req.body.title || existing_post.title,
    content : req.body.content|| existing_post.content,
    author: req.body.author || existing_post.author 
  }
  let search_idx = posts.findIndex((post)=> post.id===parseInt(req.params.id));
  posts[search_idx] = updated_post
  res.json(updated_post);
  
})

app.delete("/posts/:id",(req,res)=>
{
  let search_idx = posts.findIndex((post)=> post.id===parseInt(req.params.id));
  if(search_idx>-1)
  {
     posts.splice(search_idx,1);
     res.json(posts);
  }
  else {
    res
      .status(404)
      .json({ error: `Joke with id: ${id} not found. No jokes were deleted.` });
  }

})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
