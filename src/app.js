export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([{
      route: ['demo/welcome'],
      name: 'welcome',
      moduleId: 'welcome',
      nav: true,
      title:'Welcome'
    }, {
      route: 'demo/users',
      name: 'users',
      moduleId: 'users',
      nav: true,
      title:'Github Users'
    }, {
      route: 'demo/child-router',
      name: 'child-router',
      moduleId: 'child-router',
      nav: true,
      title:'Child Router'
    },

    {
      route: '',
      name: 'home',
      moduleId: 'home/home'
    }, {
      route: '/:room',
      name: 'room',
      moduleId: 'room/room'
    }]);

    this.router = router;
  }
}
