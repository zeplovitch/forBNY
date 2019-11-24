import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import {
  Observable,
  from,
  forkJoin,
  EMPTY
} from 'rxjs';
import {
  distinct,
  mergeMap,
  filter,
  toArray,
  catchError,
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  referenceData: Map<string, User[]>;
  data: Region[];
  regions$;
  bankers$;
  role2: User[];
  role3: User[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.load();
  }
  load(): void {
    this.dataService.getData().subscribe(result => {
      this.referenceData = new Map(result);
      this.regions$ = this.getRegions();
      this.fillApprovars(this.referenceData.keys().next().value);
      this.bankers$ = this.showBankers();
    });
  }

  getRegions(): Observable<string[]> {
    return from(this.referenceData.keys()).pipe(
      toArray(),
      catchError(err => EMPTY));
  }

  showBankers(): Observable<User[]> {
   return  from(this.referenceData.values())
      .pipe(
        mergeMap(banker => banker),
        distinct((b: User) => b.name),
        toArray(),
        catchError(err => EMPTY)
      );
  }

  showApproversForRegion(
    region: string,
    approveRank: string
  ): Observable<User[]> {
    return from(this.referenceData.get(region)).pipe(
      filter(banker => banker.roles.indexOf(approveRank) > -1),
      toArray()
    );
  }

  fillApprovars(region: string) {
    this.role3 = [];
    this.role2 = [];
    forkJoin([
      this.showApproversForRegion(region, 'L2APP'),
      this.showApproversForRegion(region, 'L3APP')
    ]).subscribe(
         result => {
          this.role2 = result[0];
          this.role3 = result[1];
         }
    );
  }
  onSelected(region: string): void {
    this.fillApprovars(region);
  }
}
