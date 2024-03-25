import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import authRouter from './routes/authRoute.js';
import usersRouter from './routes/usersRoute.js'
import postsRouter from './routes/postsRoute.js';
import commentsRouter from './routes/commentsRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import { errorHandler, notFound } from './middlewares/errors.js';
import passwordRouter from './routes/passwordRoute.js';
import xss from 'xss-clean'
import  rateLimit from 'express-rate-limit' 
import helmet from 'helmet'
import hpp from 'hpp'
const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(rateLimit({
    windowMs:10*60*1000,
    max:200
}));

app.use(cors({
    origin:'http://localhost:3000'
}));


app.use('/api/auth',authRouter);
app.use('/api/users',usersRouter);
app.use('/api/posts',postsRouter);
app.use('/api/comments',commentsRouter);
app.use('/api/categories',categoryRouter);
app.use('/api/password',passwordRouter);

//not found middleware
app.use(notFound);


//error handler middleware
app.use(errorHandler);

const port=process.env.PORT || 3002;

mongoose.connect(process.env.MONGO_URI)
    .then(()=> app.listen(port,()=>console.log(`http://localhost:${port}`)))
    .catch((err)=> console.log(err.message));

