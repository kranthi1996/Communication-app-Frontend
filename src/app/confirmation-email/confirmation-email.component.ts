import { Component, OnInit } from '@angular/core';
import { CurdService } from '../services/curd.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-confiramtion-email',
  templateUrl: './confirmation-email.component.html',
  styleUrls: ['./confirmation-email.component.scss']
})
export class ConfiramtionEmailComponent implements OnInit {

  
  constructor(private curdService: CurdService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parameter => {
      console.log(parameter)
      const parameterValue = parameter['confirmation_code'];
      this.activateEmail(parameterValue);
    })
  }
  activateEmail(parameterValue:string) {
    this.curdService.activateEmail({confirmation_code:parameterValue}).subscribe(async (resp: any) => {
      console.log(resp)
      this.router.navigate(['/login']);
    }, (err: any) => {
      console.log(err);
      this.toastr.error(err.error.errObj.message);
    });
  }
}
