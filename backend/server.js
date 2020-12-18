import express from 'express';
import mongoose from 'mongoose';
import Team from './teamSchema.js';
import data from './file.json';
import cors from 'cors';
import bodyParser from 'body-parser';

require("babel-polyfill");


const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());

const connection_url = "mongodb+srv://admin:abcd1234@cluster0.veidu.mongodb.net/teamsDB?retryWrites=true&w=majority";
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
});
const db=mongoose.connection;
db.once('open',() =>{
    console.log('db connected');
})
//console.log('outside',data[0]);
app.post('/teams', (req,res) => {
    console.log(data[0]);
    data.map( async (eachTeam) => {
        await new Team({
            name:eachTeam.team_name,
            wins:eachTeam.wins,
            lose:eachTeam.losses,
            tie:eachTeam.ties,
            score:eachTeam.score
        },).save()
        .then(items => {
            res.send('items created succesfully');
            console.log('created');
        })
        .catch(err => {
            res.status(500).send(err,'error saving data ');
        });
    })
        

    
    /*
    Team.insert({
        name:data[1].team_name,
        wins:data[1].wins,
        lose:data[1].losses,
        tie:data[1].ties,
        score:data[1].score
    },(err,response)=>{
            if (err){
                res.status(500).send(err);
            }
            else{
                res.status(201).send(`new message created succesfully ${response}`);
            }
        })
        */
})
app.get('/teams',async (req,res) => {
    await Team.find((err,data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
})

app.put('/teams/update', async(req,res) => {
    console.log(req.body.name);
    await Team.findOneAndUpdate(
        {name: req.body.name},
        {$set: {name: req.body.name,
            wins : req.body.wins,
             lose: req.body.lose,
             tie: req.body.tie,
             score: req.body.score}
            },
        {useFindAndModify: false}
        
            /*
        {
        conditions:{ name : req.body.name },
        update: {name: req.body.name,
                wins : req.body.wins,
                 lose: req.body.lose,
                 tie: req.body.tie,
                 score: req.body.score
                }
    }*/,(err,response) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(response);
        }
    })
})

const port = process.env.PORT || 9000;

app.listen(port,() => {
    console.log('app started on port 9000');
});
