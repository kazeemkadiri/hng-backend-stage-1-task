import { Request, Response } from "express";

const express = require('express');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.get('/', (req: Request, res: Response) => {
    
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

app.post('/', (req: Request, res: Response) => {
    
    const {operation_type, x, y} = req.body;

    // This object serves as the enum for 'operation_type'
    enum OperationEnum {
        Addition='addition',
        Subtraction='subtraction',
        Multiplication='multiplication'
    }

    // This function parses the operation_type string
    const parseOpType = (opType: string | OperationEnum) => {
        
        const possibleOpTypes = ['add', 'sum', 'subtract', 'difference', 'multiply', 'product'];
        
        let matchedType: OperationEnum = OperationEnum.Addition;

        if(typeof opType === 'string'){
            for(let possibleOpType of possibleOpTypes){
            
                if( opType.toLowerCase().indexOf(possibleOpType) > -1){

                    switch(possibleOpType){
                        case 'sum':
                        case 'add':
                            matchedType = OperationEnum.Addition;
                            break;
                        case 'difference':
                        case 'subtract':
                            matchedType = OperationEnum.Subtraction;
                            break;
                        case 'product':
                        case 'multiply':
                            matchedType = OperationEnum.Multiplication;
                        break;
                    }

                }  
                
            }
        }
        
        
        return matchedType;
    }

    const matchedOpType = parseOpType(operation_type);
    let result = 0;

    switch(matchedOpType){
        case OperationEnum.Addition:
            result = parseInt(x) + parseInt(y);
            break;
        case OperationEnum.Subtraction:
            result = parseInt(x) - parseInt(y);
            break;
        case OperationEnum.Multiplication:
            result = parseInt(x) * parseInt(y);
            break;
        default:
            break;
    }

    return res.status(200).json({ "slackUsername": "kazeemkadiri", "result": result, "operation_type": matchedOpType }).end();
    
});

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening on PORT ${PORT}.`);
})
