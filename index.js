const http = require('http');
const server = http.createServer((req, res, next) => {
    
    if(req.method === 'GET' ){
        
        if(req.url === '/'){
            res.writeHead(200, {'Content-Type': 'application/json'});
            
            return res.end(
                JSON.stringify({ 
                    "slackUsername": 'Kezzy', 
                    "backend": true, 
                    "age": 29, 
                    "bio": "Software Engineer (Backend)" 
                })
            );
        
        }

    }

});

const PORT = process.env.PORT || 5000;

server.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening on PORT ${PORT}.`);
})
