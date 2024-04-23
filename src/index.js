import https from 'https';
import fs from 'fs';
import app from './app.js';

const hostname = '127.0.0.1';
const port = 3000;

// ************** sertifkaattien ja https serverin lisäys
if (process.env.NODE_ENV === 'production') {
  const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
  const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');


  const options = {
    key: sslkey,
    cert: sslcert,
  };
  const httpsPort = process.env.HTTPS_PORT || 8000;
  https.createServer(options, app).listen(httpsPort);
}

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
