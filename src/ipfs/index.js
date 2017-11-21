import Promise from 'bluebird';
var ipfsFns = require('../decentral/index.js')

export default function() {
    // Checks on ipfsOptions and connects to network
   const ipfsOptions = window.IpfsApi('localhost', '5001', { protocol: 'http' });
   return ipfsFns(ipfsOptions);
}

   // // connect to ipfs daemon API server
   // var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'}) 

   //  var fileReader = new FileReader()
   //  fileReader.readAsArrayBuffer(file)

   //  fileReader.onload = function(){
   //    var data = fileReader.result
   //    var buffer = Buffer.from(data)
   //    var content = []
   //    content.push({
   //      path: filepath,
   //      content: buffer
   //    })

   //    ipfs.files.add(content, (err, res) => {
   //        console.log(err, res)
   //    })