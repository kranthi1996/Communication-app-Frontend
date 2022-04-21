import { ToastrService } from 'ngx-toastr';
import { CurdService } from './../services/curd.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fileToUpload: any;
  profileInfoForm: FormGroup;
  profileData: any;
  profilePicSrc: string  = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";
  constructor(private toastr: ToastrService,private fb: FormBuilder, private curdService: CurdService) {
    this.getProfileInfo();
    this.profileInfoForm = this.fb.group({
      first_name: [""],
      last_name: [""],
      email: [""],
      mobile_number: [""],
      address: this.fb.group({
        add_line1: [""],
        add_line2: [""],
        post_code: [""],
        country: [""],
        state: [""],
      }),
      country_code: [""],
      time_zone: [""],
      facebook: [""],
      linkedin: [""],
      instagram: [""]
    });
  }

  ngOnInit(): void { }
  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePicSrc = reader.result as string;
    };
    reader.readAsDataURL(file);
    // this.fileToUpload = files.item(0);
  }
  getProfileInfo() {
   const imgData =  localStorage.getItem("imgData");
   if(imgData) {
     this.profilePicSrc = imgData;
   } 
    this.curdService.getProfileInfo().subscribe((resp: any) => {
      this.profileData = resp.data;
      this.profileInfoForm = this.fb.group({
        first_name: [this.profileData.first_name],
        last_name: [this.profileData.last_name],
        //email: [this.profileData.email],
        mobile_number: [this.profileData.mobile_number],
        address: this.fb.group({
          add_line1: [this.profileData.address?.add_line1],
          add_line2: [this.profileData.address?.add_line2],
          post_code: [this.profileData.address?.post_code],
          country: [this.profileData.address?.country],
          state: [this.profileData.address?.state],
        }),
        country_code: [this.profileData.country_code],
        time_zone: [Intl.DateTimeFormat().resolvedOptions().timeZone],
        facebook: [this.profileData.facebook],
        linkedin: [this.profileData.linkedin],
        instagram: [this.profileData.instagram]
      });
    }, (err: any) => {
      console.log(err);
      //this.toastr.error(err.error.errObj.message);
    });
  }
  updateProfileInfo() {
    console.log(this.profileInfoForm.value)
    this.curdService.updateProfileInfo(this.profileInfoForm.value).subscribe((resp: any) => {
      this.toastr.success(resp.message);
      localStorage.setItem("imgData", this.profilePicSrc);
    }, (err: any) => {
      this.toastr.error(err.errObj.message);
    })
  }
}
