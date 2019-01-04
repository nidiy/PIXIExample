import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Scene2D} from '../scene/Scene2D';
import {DesignScene} from './DesignScene';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'camera2d';
  @ViewChild('scene2D') scene2D: ElementRef;

  constructor() {

  }

  ngOnInit() {
    new DesignScene(this.scene2D.nativeElement);
  }
}
