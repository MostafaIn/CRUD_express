const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('these are my skills!')
});

const skills = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'React' }
];

app.get('/api/skills', (req, res) => {
    res.send(skills);
});

// READ
app.get('/api/skills/:id', (req, res) => {
    const skill = skills.find(s => s.id === parseInt(req.params.id));
    if (!skill) return res.status(404).send("it's not exist");
    res.send(skill);
})

// CREATE
app.post('/api/skills', (req, res) => {
    // //validation
    // const schema = { name: Joi.string().min(3).required() };
    // const result = Joi.validate(req.body,schema);
    // if (result.error) {
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
    const{error}=validationSkill(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const skill = { id: skills.length + 1, name: req.body.name };
    skills.push(skill);
    res.send(skill);
})

// UPDATE
app.put('/api/skills/:id',(req,res)=>{
    const skill= skills.find(s => s.id === parseInt(req.params.id));
    if(!skill) return res.status(404).send('this is not found');
    // //validation
    // const schema= {name:Joi.string().min(3).required()};
    // const result= Joi.validate(req.body, schema);
    // if(result.error) {
    //     res.status(404).send(result.error.details[0].message);
    //     return;
    // }
    const { error } = validationSkill(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    skill.name= req.body.name;
    res.send(skill);
})

//validation function
function validationSkill(skill){
    const schema= {name:Joi.string().min(3).required()};
    return Joi.validate(skill,schema);
}

//DELETE
app.delete('/api/skills/:id',(req,res)=>{
    const skill= skills.find(s => s.id === parseInt(req.params.id));
    if(!skill) return res.status(404).send('this is not here');
    const index= skills.indexOf(skill);
    skills.splice(index,1);
    res.send(skill);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));