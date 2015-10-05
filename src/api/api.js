export class Api {
  _listeners = [];

  constructor () {
    this._connect();
  }

  _connect () {
    this._socket = new window.WebSocket(`ws:${location.hostname}:4321`);

    this._socket.onopen = () => {
      this._socket.onmessage = message => this.onMessage(message);
    };

    this._socket.onclose = () => {
      setTimeout(() => this._connect(), 2000);
    };
  }

  onMessage (message) {
    let data, error;
    try {
      message = JSON.parse(message.data);
      data = message.data;
      error = message.error;
    } catch (e) {
      data = {
        type: message.type,
        data: message.data
      };
    }

    this._listeners.forEach(listener => {
      if (listener.message === message.type) {
        listener.callback(error, data);
      }
    });
  }

  on (message, callback) {
    let listener = {
      message: message,
      callback: callback
    };
    this._listeners.push(listener);

    return () => {
      let pos = this._listeners.indexOf(listener);
      if (pos > -1) {
        this._listeners.splice(pos, 1);
      }
    };
  }

  request (resource, method, params) {
    return new Promise ((resolve, reject) => {
      if (this._socket.readyState === window.WebSocket.CLOSED) {
        return reject('Connection is closed');
      }

      if (this._socket.readyState === window.WebSocket.CONNECTING) {
        return setTimeout(() => {
          this.request(resource, method, params)
            .then(data => resolve(data))
            .catch(err => reject(err));
        });
      }

      let message = `${resource}.${method}`;
      this._socket.send(JSON.stringify({
        message: message,
        data: params
      }));
      let answer = this.on(message, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
        answer();
      });
    });
  }
}
