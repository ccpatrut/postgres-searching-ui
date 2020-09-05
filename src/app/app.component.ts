import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { EmailMessageService } from './service/email-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  messages: any[];
  displayedColumns: string[] = ['title', 'subtitle', 'content'];
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  constructor(private emailMessageService: EmailMessageService) { }
  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.messageSearch(this.searchInput.nativeElement.value);
        })
      ).subscribe();
  }

  ngOnInit(): void {
    this.messageSearch('cetero');
  }

  private messageSearch(searchText: string) {
    this.emailMessageService.searchEmails(searchText, 0, 100)
      .subscribe(messages => {
        this.messages = messages['content'];
      });
  }
}
