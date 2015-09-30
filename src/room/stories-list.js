import {inject} from 'aurelia-framework';
import {Stories} from '../api/stories';

@inject(Stories)
export class StoriesList {
  constructor (Stories) {
    this.Stories = Stories;
  }

  activate (params) {
    this.room = params.room;

    return this.Stories.getAll()
      .then(stories => {
        this.stories = stories;
        this._filterStories();
      });
  }

  _filterStories () {
    this.storiesToEstimate = this.stories.filter(story => story.estimation === null);
    this.storiesEstimated = this.stories.filter(story => story.estimation !== null);
  }
}
