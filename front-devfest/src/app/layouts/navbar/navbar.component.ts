import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit {
  opened = false;
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  ngOnInit() {
    this.sidenav.fixedTopGap = 55;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.opened = false;
    } else {
      if (true === this.opened) {
        this.opened = true;
      }
    }
  }
}
