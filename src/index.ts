import {env} from "./env"
import {v4} from "uuid"
import axios, {AxiosResponse} from "axios"

export class FreeMobileSmsApi {
  #queue: Map<string, string> = new Map<string, string>()
  #user: string
  #password: string
  #stopExec: boolean = false
  #statusesText: {[key: number]: string} =  {
    200: 'OK'
    , 400: 'One of needed parameters is missed or incorrect'
    , 402: 'Too many requests sent, please wait few time'
    , 403: 'Access denied, check your credentials and message content'
    , 500: 'Free Mobile SMS API server encountered an internal error, try again later'
  }

  constructor() {
    this.#user = env.FREE_MOBILE_API_USER
    this.#password = env.FREE_MOBILE_API_PASSWORD
  }

  public queueMessage(message: string): string {
    const messageId: string = v4()
    this.#queue.set(messageId, message)
    return messageId
  }

  public queueMessages(messages: string[]): string[] {
    const ids: string[] = []
    for(let message of messages) {
      ids.push(this.queueMessage(message))
    }
    return ids
  }

  public queueSize(): number {
    return this.#queue.size
  }

  public get(messageId: string): string | undefined {
    return this.#queue.get(messageId)
  }

  public messagesIds(): string[] {
    return Array.from(this.#queue.keys())
  }

  public messagesValues(): string[] {
    return Array.from(this.#queue.values())
  }

  public entries(): [string, string][] {
    return Array.from(this.#queue.entries())
  }

  public remove(messageId: string): boolean {
    return this.#queue.delete(messageId)
  }

  public execute(): void {
    if (this.#stopExec) {
      return
    }

    const [id, message]: [string, string] = this.#queue.entries().next()?.value
    if (!id) {
      return
    }

    this.send(message).then(() => {
      this.#queue.delete(id)
      setTimeout(() => this.execute(), 250)
    }, (err) => {
      setTimeout(() => this.execute(), err.code === 402 ? 5000 : 250)
      throw err
    })
  }


  public async send(message: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      axios.post(`https://smsapi.free-mobile.fr/sendmsg`, {
        user: this.#user
        , pass: this.#password
        , msg: message
      }, {
        headers: {
          contentType: 'application/x-www-form-urlencoded'
        }
      }).then((res: AxiosResponse) => {
        if(res.status === 200) {
          resolve(this.#statusesText[res.status])
          return
        }

        reject({ code: res.status, message: this.#statusesText[res.status] || res.statusText })
      })
    })
  }
}