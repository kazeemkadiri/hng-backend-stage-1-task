"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
        "slackUsername": 'kazeemkadiri',
        "backend": true,
        "age": 29,
        "bio": "Software Engineer (Backend)"
    }));
});
app.post('/', function (req, res) {
    console.log('Request body: ', req.body);
    var _a = req.body, operation_type = _a.operation_type, x = _a.x, y = _a.y;
    // This object serves as the enum for 'operation_type'
    var OperationEnum;
    (function (OperationEnum) {
        OperationEnum["Addition"] = "addition";
        OperationEnum["Subtraction"] = "subtraction";
        OperationEnum["Multiplication"] = "multiplication";
    })(OperationEnum || (OperationEnum = {}));
    // This function parses the operation_type string
    var parseOpType = function (opType) {
        var possibleOpTypes = ['add', 'sum', 'subtract', 'difference', 'multiply', 'product'];
        var matchedType = OperationEnum.Addition;
        if (typeof opType === 'string') {
            for (var _i = 0, possibleOpTypes_1 = possibleOpTypes; _i < possibleOpTypes_1.length; _i++) {
                var possibleOpType = possibleOpTypes_1[_i];
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
            }
        }
        return matchedType;
    };
    var matchedOpType = parseOpType(operation_type);
    console.log('mop', matchedOpType);
    var result = 0;
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
    return res.status(200).json({ "slackUsername": "kazeemkadiri", "result": result, "operation_type": matchedOpType }).end();
});
var PORT = process.env.PORT || 5000;
app.listen(process.env.PORT || 5000, function () {
    console.log("server is listening on PORT ".concat(PORT, "."));
});
