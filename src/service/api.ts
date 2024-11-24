const APIurl = 'https://7103.api.greenapi.com';
const waInstance = '7103153069';
const apiTokenInstance = '0bfce88d6a3a4c7cb5caa6a60dbb833dbf5c2c847ebb4410b2';

export type InstanceType = {
  idInstance: string,
  apiToken: string,
  apiUrl: string,
};

export type Message = InstanceType & {
  chatId: string,
  message: string,
};

export type HistoryType = InstanceType & {
  chatId: string,
  count: number,
};

export function SendMessage({chatId, message, idInstance, apiToken, apiUrl}: Message): Promise<any> {
  return fetch(`${apiUrl}/waInstance${idInstance}/sendMessage/${apiToken}`, {
    method: 'POST',
    body: JSON.stringify({
      chatId,
      message,
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(response);
    }
  });
}

export function getNotification({idInstance, apiToken, apiUrl}: InstanceType): Promise<Notification | null> {
  return fetch(`${apiUrl}/waInstance${idInstance}/receiveNotification/${apiToken}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(async (response) => {
    if (!response.ok) {
      return Promise.reject(response);
    }

    const body: Notification = await response.json();

    if (body) {
      await deleteNotification({receiptId: body.receiptId, instance: {idInstance, apiToken, apiUrl}});
    }

    return body;
  });
}

export function deleteNotification({receiptId, instance}: { receiptId: number, instance: InstanceType }): Promise<any> {
  return fetch(`${instance.apiUrl}/waInstance${instance.idInstance}/deleteNotification/${instance.apiToken}/${receiptId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(response);
    }
  });
}

export function getMessages({chatId, count, idInstance, apiToken, apiUrl}: HistoryType): Promise<MessageDataType[]> {
  return fetch(`${apiUrl}/waInstance${idInstance}/getChatHistory/${apiToken}`, {
    method: 'POST',
    body: JSON.stringify({
      chatId,
      count,
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }

      const body: MessageDataType[] = await response.json();
      return body;
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
    },
    messageData: {
      typeMessage: string,
      textMessageData?: {
        textMessage: string,
      },
      extendedTextMessageData?: {
        text:	string;
      },
    }
  },
};

export enum MessageType {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
}

export type MessageDataType = {
  type: MessageType,
  idMessage?: string,
  timestamp: number,
  typeMessage?: string,
  chatId?: string,
  textMessage: string,
  extendedTextMessage?: {
    text: string,
    title: string,
    description: string
    previewType: string,
    jpegThumbnail: string,
    forwardingScore: number,
    isForwarded: boolean,
  }
  senderId?: string,
  senderName?: string,
  senderContactName?: string,
  statusMessage?: string,
  sendByApi?: boolean,
  isDeleted?: boolean
};
