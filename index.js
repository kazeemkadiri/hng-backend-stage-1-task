const express = require('express');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    return res.end(
        JSON.stringify({ 
            "slackUsername": 'kazeemkadiri', 
            "backend": true, 
            "age": 29, 
            "bio": "Software Engineer (Backend)" 
        })
    );
        
});

app.post('/', (req, res) => {

    const {operation_type, x, y} = req.body;

    // This function parses the operation_type string
    const parseOpType = opType => {
        
        const possibleOpTypes = ['add', 'subtract', 'multiply'];
        
        let matchedType = '';

        for(let possibleOpType of possibleOpTypes){
        
          if(opType.toLowerCase().indexOf(possibleOpType) > -1){

            switch(possibleOpType){
                case 'add':
                    matchedType = 'addition';
                    break;
                case 'subtract':
                    matchedType = 'subtraction';
                    break;
                case 'multiply':
                    matchedType = 'multiplication';
                break;
            }

          }  
          
          if(matchedType !== ''){
            break;
          }
        }
        
        return matchedType;
    }

    const matchedOpType = parseOpType(operation_type);

    // This object serves as the enum for 'operation_type'
    const OperationType = {
        'Addition': 'addition',
        'Subtraction': 'subtraction',
        'Multiplication': 'multiplication'
    }

    let result = 0;

    switch(matchedOpType){

        case OperationType.Addition:
            result = parseInt(x) + parseInt(y);
            break;
        case OperationType.Subtraction:
            result = parseInt(x) - parseInt(y);
            break;
        case OperationType.Multiplication:
            result = parseInt(x) * parseInt(y);
            break;
        default:
            break;
    }

    return res.status(200).json({ "slackUsername": "kazeemkadiri", result, "operation_type": matchedOpType }).end();
    
});

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening on PORT ${PORT}.`);
})
