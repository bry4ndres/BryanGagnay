import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  isLoading: boolean=false;
  constructor(private loadService: LoadingService) { }

  ngOnInit(): void {
    this.loadService.isLoading.subscribe((value) => {
      this.isLoading = value;
    });
  }

}
