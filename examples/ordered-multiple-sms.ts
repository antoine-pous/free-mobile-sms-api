import {FreeMobileSmsApi} from "../src";

/// To send ordered message we use the queue system which will wait between each sms to ensure that the network will receive them in the right order
/// It's important to note that the network can flush them after receiving your sms :3
const sms: FreeMobileSmsApi = new FreeMobileSmsApi()
sms.queueMessages([
  'Hello world 1/5'
  , 'Hello world 2/5'
  , 'Hello world 3/5'
  , 'Hello world 4/5'
  , 'Hello world 5/5'
])

sms.queueMessages([
  'Hello world 1/3'
  , 'Hello world 2/3'
  , 'Hello world 3/3'
])

sms.execute()