import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../_services/album.service';
import { Album } from 'src/app/_shared/album';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  
  albums: Album;
  public album: any;
  uploadForm: FormGroup;  

  constructor(private albumService : AlbumService, private formBuilder: FormBuilder) {
    this.getalbums();
  }

  ngOnInit() {
    this.uploadForm = new FormGroup({
      title: new FormControl('')
    });

    this.albumService.refreshAlbum$.subscribe(() => {
      this.getalbums();
    })
  }

  onSubmit(){
    console.log(this.uploadForm.value);
    // formData.append('title', this.uploadForm.get('title').value);

    this.albumService.addAlbum(this.uploadForm.value).subscribe(
      (data) => {
        console.warn(data)
      }
    );
  }

  getalbums() {
    this.albumService.getAlbums()
    .subscribe(
      (data) => {
          this.albums = data.data;
      } 
      
    )
  }

}
