import {FreeMobileSmsApi} from "../src";

/// Even if we send a batch a message in a certain order, the network can send them unordered
/// This is an example of multiple unordered sent messages without using the queue
const sms: FreeMobileSmsApi = new FreeMobileSmsApi()
for(let i = 0; i < 5; i++) {
  sms.send(`Hello World ${i}!`).then(console.log).catch(console.error)
}