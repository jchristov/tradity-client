import { Component, OnInit } from '@angular/core';

import { GroupComponent } from './group.component';

@Component({
  moduleId: module.id,
  selector: 'tradity-group-favourites',
  templateUrl: 'group-favourites.component.html'
})
export class GroupFavouritesComponent {
  constructor(public parent: GroupComponent) { }
}