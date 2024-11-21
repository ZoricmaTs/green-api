const APIurl = 'https://7103.api.greenapi.com';
const waInstance = '7103153069';
const apiTokenInstance = '0bfce88d6a3a4c7cb5caa6a60dbb833dbf5c2c847ebb4410b2';

export function SentMessage(chatId: string, message: string): Promise<any> {
  return fetch(`${APIurl}/waInstance${waInstance}/sendMessage/${apiTokenInstance}`, {
    method: 'POST',
    body: JSON.stringify({
      chatId,
      message,
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then((res) => { console.log(res) })
    .catch((res) => { console.log(res) })
}

export function getNotification(): Promise<Notification> {
  return fetch(`${APIurl}/waInstance${waInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=60000`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(async (response) => {
    const body: Notification = await response.json();
    if (body) {
      // await deleteNotification(body.receiptId);
    }

    return body;
  });
}

export function deleteNotification(receiptId: number): Promise<any> {
  return fetch(`${APIurl}/waInstance${waInstance}/deleteNotification/${apiTokenInstance}?${receiptId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
}

export type Notification = {
  receiptId: number,
  body: {
    typeWebhook: string,
    instanceData: {
      idInstance: number,
      wid: string,
      typeInstance: string,
    }
    timestamp: number,
    idMessage: string,
    senderData: {
      chatId: string,
      chatName: string,
      sender: string,
      senderName: string,
      senderContactName: string,
    }
  },
  messageData: {
    typeMessage: string,
    extendedTextMessageData: {
      text: string
      description: string
      title: string
      previewType: string
      jpegThumbnail: string
      forwardingScore: number
      isForwarded: boolean
    }
  }
}

//{
//   "receiptId": 1,
//   "body": {
//     "typeWebhook": "incomingMessageReceived",
//     "instanceData": {
//       "idInstance": 7103153069,
//       "wid": "996998098583@c.us",
//       "typeInstance": "whatsapp"
//     },
//     "timestamp": 1732207239,
//     "idMessage": "3FCAA3DA8CE934AA2CBA",
//     "senderData": {
//       "chatId": "79234036057@c.us",
//       "chatName": "Женя Миллер",
//       "sender": "79234036057@c.us",
//       "senderName": "Евгений",
//       "senderContactName": "Женя Миллер"
//     },
//     "messageData": {
//       "typeMessage": "extendedTextMessage",
//       "extendedTextMessageData": {
//         "text": "Пипец капец",
//         "description": "",
//         "title": "",
//         "previewType": "None",
//         "jpegThumbnail": "",
//         "forwardingScore": 0,
//         "isForwarded": false
//       }
//     }
//   }
// }