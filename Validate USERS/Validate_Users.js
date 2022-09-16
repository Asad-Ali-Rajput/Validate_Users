import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { vu } from 'k6/execution';const csvData = new SharedArray('another data name', function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('./sample.csv'), { header: true }).data;
  });
  
  export const options = {
      scenarios: {
          'use-all-the-data': {
            executor: 'shared-iterations',
            vus: csvData.length,
            iterations: csvData.length,
            maxDuration: '1h',
          },
        },
  };
  export default function () {
  
      // var userName = csvData[Math.floor(Math.random() * csvData.length)]['userName'];
      // var passWord = csvData[Math.floor(Math.random() * csvData.length)]['passWord'];
  
      // var toBeEncoded = userName + ':' + passWord;
      // var encodedString = encoding.b64encode(toBeEncoded);
      
      // let params = {
      //     headers : {
      //         "Authorization" : "Basic" + encodedString,
      //         "X-Requested-With" : "XMLHttpRequest"
      //     }
      // };
  
      // let response = http.get("http://localhost/csvData",params);
      // Now you can use the CSV data in your test logic below.
      // Below are some examples of how you can access the CSV data.
          // if (vu.idInTest == csvData.userName) {
      
              const user_data = csvData[vu.idInTest];
              if (vu.idInTest == user_data.userName) {
                  console.log('VuID: ' + vu.idInTest +' '+ JSON.stringify(user_data) + "login Successful!");
              }
              else {
                  console.log("VuID " + vu.idInTest + ' userName is: ' + user_data.userName + " invalid User ");
              }
          // console.log(user_data);
          // }
          // else {
              // console.log("Invalid User");
          // }
      sleep(1);
  }