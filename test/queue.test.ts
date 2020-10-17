import {FreeMobileSmsApi} from "../src"

let sms: FreeMobileSmsApi
let messagesIds: string[] = []
let messages: string[] = ['Test', 'Test 2', 'Test 3']

describe('It test', () => {

  beforeAll(() => {
    sms = new FreeMobileSmsApi()
  })

  it('Must queue "Test" message', () => {
    messagesIds.push(sms.queueMessage(messages[0]))
    expect(messagesIds.length === 1 && typeof messagesIds[0] === "string").toBe(true)
    expect(sms.get(messagesIds[0]) === messages[0])
  })

  it('Must queue ["Test 2", "Test 3] messages', () => {
    messagesIds.push(...sms.queueMessages([messages[1], messages[2]]))
    expect(messagesIds.length === 3 && typeof messagesIds[1] === "string" && typeof messagesIds[2] === "string").toBe(true)
    expect(sms.get(messagesIds[1]) === messages[1])
    expect(sms.get(messagesIds[2]) === messages[2])
  })

  it('Must have three queued message', () => {
    expect(sms.queueSize()).toBe(3)
  })
  
  it('Must return an array of message IDs', () => {
    expect(sms.messagesIds()).toEqual(messagesIds)
  })

  it('Must return an array of message values', () => {
    expect(sms.messagesValues()).toEqual(messages)
  })

  it('Must return an array of [id, message]', () => {
    expect(sms.entries()).toEqual([
      [messagesIds[0], messages[0]]
      , [messagesIds[1], messages[1]]
      , [messagesIds[2], messages[2]]
    ])
  })

  it('Must delete "Test 2" message by it\'s ID from queue', () => {
    sms.remove(messagesIds[1])
    expect(sms.entries()).toEqual([
      [messagesIds[0], messages[0]]
      , [messagesIds[2], messages[2]]
    ])
  })
})