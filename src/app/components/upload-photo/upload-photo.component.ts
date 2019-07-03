import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit {

  fileData: File = null;

  constructor(private http:HttpClient) { }

  ngOnInit() {
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.http.post('http:', formData).subscribe(res => {
      console.log(res);
      alert('success');
    })
  }

}
