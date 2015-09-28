export class Api {
  constructor () {
    this._socket = new window.WebSocket(`ws:${location.hostname}:4321`);

    this._socket.onmessage = message => this.onMessage(message);

    this._socket.onopen = () => this._socket.send('kikoo');
  }

  onMessage (message) {
    let data;
    try {
      data = JSON.parse(message.data);
    } catch (e) {
      data = {
        type: message.type,
        data: message.data
      };
    }

    console.log('received', data);
  }
}
