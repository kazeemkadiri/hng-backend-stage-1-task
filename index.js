"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
        "slackUsername": 'kazeemkadiri',
        "backend": true,
        "age": 29,
        "bio": "Software Engineer (Backend)"
    }));
});
app.post('/', (req, res) => {
    console.log('Request body: ', req.body);
    const { operation_type, x, y } = req.body;
    // This object serves as the enum for 'operation_type'
    let OperationEnum;
    (function (OperationEnum) {
        OperationEnum["Addition"] = "addition";
        OperationEnum["Subtraction"] = "subtraction";
        OperationEnum["Multiplication"] = "multiplication";
    })(OperationEnum || (OperationEnum = {}));
    // This function parses the operation_type string
    const parseOpType = (opType) => {
        const possibleOpTypes = ['add', 'sum', 'subtract', 'difference', 'multiply', 'product'];
        let matchedType = OperationEnum.Addition;
        if (typeof opType === 'string') {
            for (let possibleOpType of possibleOpTypes) {
                if (opType.toLowerCase().indexOf(possibleOpType) > -1) {
                    switch (possibleOpType) {
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
                if (matchedType) {
                    break;
                }
            }
        }
        // Get the matching opType from OperationEnum
        console.log('check vall', opType, OperationEnum.Addition);
        switch (opType) {
            case OperationEnum.Addition:
                matchedType = OperationEnum.Addition;
                break;
            case OperationEnum.Subtraction:
                matchedType = OperationEnum.Subtraction;
                break;
            case OperationEnum.Multiplication:
                matchedType = OperationEnum.Multiplication;
                break;
            default:
                break;
        }
        return matchedType;
    };
    const matchedOpType = parseOpType(operation_type);
    console.log('mop', matchedOpType);
    let result = 0;
    switch (matchedOpType) {
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
    console.log('Check variables:', result, matchedOpType, x, y);
    return res.status(200).json({ "slackUsername": "kazeemkadiri", "result": result, "operation_type": matchedOpType }).end();
});
const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening on PORT ${PORT}.`);
});
