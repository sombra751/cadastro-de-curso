import { Component, ContentChild, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card1',
  templateUrl: './card1.component.html',
  styleUrls: ['./card1.component.scss']
})
export class Card1Component implements OnInit  {
  @ContentChild('cardFooter', { static: false }) cardFooter: any;
  cardFooterContent: boolean = false;


  @Input() cardModifier: any
  @Input() cardIconModifier: any
  @Input() cardIconClass: any
  @Input() cardTitle: any
  @Input() cardSvgPath: any
  @Input() cardFooterModifier: any

  constructor() { }
 
  ngOnInit(): void {
  }
  
}
