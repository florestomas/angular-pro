import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
})
export default class PricingPage implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi Contact Page' });
    this.meta.updateTag({ name: 'og:title', content: 'About Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola,Mundo,Fernando,Tomas,AKA,Mansi' });
  }
}
