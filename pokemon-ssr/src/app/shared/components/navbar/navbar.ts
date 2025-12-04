import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar {}
