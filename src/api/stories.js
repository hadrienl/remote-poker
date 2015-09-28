export class Story {
  constructor (data = {}) {
    this.id = data.id;
    this.title = data.title;
    this.estimation = data.estimation;
  }
}

const mocks = [{
  id: 1,
  title: 'As a TM, I want to vote a story',
  estimation: null
}, {
  id: 2,
  title: 'As a SM, I want to add new stories',
  estimation: null
}, {
  id: 3,
  title: 'As a PO, I want to get the final note',
  estimation: null
}, {
  id: 4,
  title: 'As a SM, I want to create a new room',
  estimation: 3
}, {
  id: 5,
  title: 'As a SM, I want to get a list of rooms',
  estimation: 5
}, {
  id: 6,
  title: 'As a TM, I want to join a room',
  estimation: 1
}];

export class Stories {
  getAll () {
    return new Promise ((resolve, reject) => {
      resolve (mocks.map(mock => new Story(mock)));
    });
  }

  getById (id) {
    return new Promise ((resolve, reject) => {
      let story = mocks.find(mock => mock.id === +id);
      if (story) {
        resolve(new Story(story));
      } else {
        reject(`Story#${id} not found`);
      }
    });
  }
}
