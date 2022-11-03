const http = require('http');

const server = http.createServer((req, res) => {
    
    if(req.method === 'GET' ){
        
        if(req.url === '/'){
            res.writeHead(200, {'Content-Type': 'application/json'});
            
            return res.end(
                JSON.stringify({ 
                    "slackUsername": 'kazeemkadiri', 
                    "backend": true, 
                    "age": 29, 
                    "bio": "Software Engineer (Backend)" 
                })
            );
        
        }

    }else if(req.method === 'POST' ){

        if(req.url === '/'){
            const chunks = [];

            req.on("data", (chunk) => {

                chunks.push(chunk);

            });

            req.on("end", () => {
                
                const data = Buffer.concat(chunks);
                
                const stringData = data.toString();

                const requestBody = JSON.parse(stringData);

                const {operation_type, x, y} = requestBody;

                // This object serves as the enum for 'operation_type'
                const OperationType = {
                    'Addition': 'addition',
                    'Subtraction': 'subtraction',
                    'Multiplication': 'multiplication'
                }
        
                let result = 0;

                switch(operation_type){
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

                res.writeHead(200, {'Content-Type': 'application/json'});
                
                return res.end(
                    JSON.stringify({ "slackUsername": "kazeemkadiri", result, "operation_type": operation_type })
                );
            });
    
        }

    }

});

const PORT = process.env.PORT || 5000;

server.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening on PORT ${PORT}.`);
})
