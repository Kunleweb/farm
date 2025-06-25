const http = require('http');
const fs = require('fs');
const url = require('url');

const overview = fs.readFileSync(
  './frontend/template-overview.html',
  'utf-8'
);
const card = fs.readFileSync('frontend/template-card.html', 'utf-8');
const producttemp = fs.readFileSync(
  './frontend/template-product.html',
  'utf-8'
);
const data = fs.readFileSync('./frontend/data.json', 'utf-8');
const dataobj = JSON.parse(data);

const replacetemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  return output;
};

const server = http.createServer((req, res) =>{
const {query, pathname } = url.parse(req.url, true);
  // OVERVIEW PAGE 
//   const pathName = url.parse(req.url)
  if (pathname == '/' || pathname == '/overview'){
    res.writeHead(200, { 'Content-type': 'text/html' });
    const htmlcard = dataobj.map((el) => replacetemplate(card, el)).join('');
    const output = overview.replace('{%PRODUCT_CARDS%}', htmlcard);
    res.end(output);
  }
//   PRODUCT PAGE
  else if (pathname == '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataobj[query.id];
    const output = replacetemplate(producttemp, product);
    res.end(output);
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening to requests on ports 3000');
});
