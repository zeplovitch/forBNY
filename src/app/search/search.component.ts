import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import {
  EMPTY,
  forkJoin,
  BehaviorSubject,
} from 'rxjs';
import {
  mergeMap,
  catchError,
  map
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

role2: User[];
role3: User[];

// created this two in order to subscribe to the change event of the regions drop down
// a bit overkill for this small project but ...

 private regionySelectedSubject = new BehaviorSubject<string>('NY');
 regionSelectedAction$ = this.regionySelectedSubject.asObservable();

// this calls a mockup to load the data
    referenceData$ = this.dataService.getData$.pipe(
      map( data => new Map(data)),
      catchError(err => EMPTY)
    );
// since we use key map i used the below to grab the keys as a dataset for he region dropdown

    regions$ = this.referenceData$.pipe(
      map(data => Array.from(data.keys())),
      catchError(err => EMPTY));

// grabbing the list of bankers

    bankers$ = this.referenceData$.pipe(
    map(data => Array.from(data.values())),
    mergeMap(banker => banker),
    catchError(err => EMPTY)
  );

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.regionSelectedAction$.subscribe (
    data =>  this.fillApprovars(data)
    );
  }

// method that preapres the 2 role2,role3 drop downs
// was not able to resolve the highlighed error on rows 66,67,70,71
// seems like its a typescript typed error but the ocde is running could not
// find the reason or the way  to solve it.
// if ng serve give errors just try to re save.
// seems like something with rxjs and the Map object is not working as they should.

  fillApprovars(region: string) {
     forkJoin([
      this.referenceData$.pipe(
         map(data => Array.from(data.get(region).values())),
         map(data => data.filter(d => d.roles.find(role => role === 'L2APP'))),
      ),
      this.referenceData$.pipe(
        map(data => Array.from(data.get(region).values())),
        map(data => data.filter(d => d.roles.find(role => role === 'L3APP'))),
     ),
    ]
  ).subscribe(
         result => {
          this.role2 = result[0] as User[];
          this.role3 = result[1] as User[];
         }
    );
  }
  // called when the region dropdown is changed

  onSelectedRegion(region: string): void {
    this.regionySelectedSubject.next(region);
  }
}
