import {FreeMobileSmsApi} from "../src";

/// Send one sms at once without using the queue
const sms: FreeMobileSmsApi = new FreeMobileSmsApi()
sms.send(`Hello World!`).then(console.log).catch(console.error)

for(let i = 0; i < 5; i++) {
  sms.send(`Hello World ${i}!`).then(console.log).catch(console.error)
}