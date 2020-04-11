
const fs = require('fs');
const requestHandler = (req,res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader('content-type','text/html');
  if(url === '/'){
    res.write('<html>');
    res.write('<head><title>Enter message</title></head>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form</body>')
    res.write('</html>');
    return res.end();
  }else if(url === '/message' && method === 'POST'){
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end',() => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      // writeFileSync block the other statement to execute till writing is done
      // fs.writeFileSync('message.txt',message);
      fs.writeFile('message.txt',message,err => {
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
      });
    });
  }
  res.write('<html>');
  res.write('<head><title>My first page</title></head>')
  res.write('<body><h1>Hello from Node.js</h1></body>')
  res.write('</html>');
  res.end();
};

module.exports = requestHandler;