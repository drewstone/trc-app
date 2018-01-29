import Promise from 'bluebird';
import EthereumUtility from './ethereum';
import ipfsAPI from 'ipfs-api';
import hash from 'object-hash';
import fs from 'fs';
import readLastLines from 'read-last-lines';
var mkdirp = Promise.promisify(require("mkdirp"));
var writeFile = Promise.promisify(require("jsonfile").writeFile);
var readFile = Promise.promisify(require("jsonfile").readFile);

const allQuestionsDir = '../../data/all_questions/';
const registryPath = allQuestionsDir + 'registry.json';

export default function(ipfsOptions) {
  var ipfs = ipfsAPI(ipfsOptions);
  ipfs.id()
    .then((id) => {console.log('my id is: ', id)})
    .catch((err) => {console.log('Fail: ', err)})
  console.log(EthereumUtility);
  return Object.assign({}, EthereumUtility, {
      addPrediction: (data) => {
        return Promise.delay(100)
        .then(() => (data));
      },
      fetchPredictions: (data) => {
        return Promise.delay(100)
        .then(() => (data));
      },
      addQuestion: (question) => {
        return new Promise((resolve, reject) => {
          // question is a JSON object
          console.log(question);
          // First, we create a file from the question object
          const d = new Date();
          const timestampPath = d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate() + '/';
          const dir = allQuestionsDir + timestampPath;
          mkdirp(dir).then(() => {
            console.log("Mkdir succeeded!");
            var filepath = dir + hash(question);
            return writeFile(filepath, question);
          }).then(() => {
            console.log("Updating the registry");
            // TODO: Can make this more efficient
            // readFile(registryPath)
            // .then((registry) => {
            //   registry[hash(question)] = timestampPath;
            //   return writeFile(registryPath, registry);
            // })
            fs.appendFileSync(registryPath, hash(question) + ',' + timestampPath);
          }).then(() => {
            console.log("Writing the file succeeded!");
            console.log("Readding site/");
            var addFromFs = Promise.promisify(ipfs.util.addFromFs)
            return addFromFs('site/', {recursive: true});
          }).then((result) => {
            console.log("Adding site/ succeeded. Time to republish");
            console.log(result);
            // As an alternative to the promise below, could do:
            // const hash = result.slice(-1)[0].hash
            return new Promise((res, rej) => {
              result = result.filter((i, n) => { return i.path==='site'; });
              if (result.length !== 1) {
                rej();
              } else {
                res(result[0].hash);
              }
            })
          }).then((hash) => {
            console.log(hash);
            // var publish = Promise.promisify(ipfs.name.publish);
            console.log("about to publish");
            const publish = Promise.promisify(ipfs.name.publish)
            return publish(hash)
            .then(res => {
              console.log("OH MY GOD IT ALL WORKED?!?!");
              resolve(hash);
            })
          }).catch((err) => {
            console.error(err);
            reject(err);
          })
        })
      },
      fetchQuestions: (numQuestions) => {
        const getQuestion = function (hash, location) {
          return new Promise((resolve, reject) => {
            readFile(allQuestionsDir + location + hash)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            })
          });
        };
    
        return new Promise((resolve, reject) => {
          readLastLines.read(registryPath, numQuestions)
          .then((lines) => {
            var data = lines.map(function (line) {
              var tokens = line.split(',');
              return getQuestion(tokens[0], tokens[1]);
            });
            return data;
          })
          .catch((err) => {
            reject(err);
          })
        })
      },
      getProfile: (data) => {
        return Promise.delay(100)
        .then(() => (data));
      },
      editProfile: (data) => {
        return Promise.delay(100)
        .then(() => (data));
      },
    });
}
