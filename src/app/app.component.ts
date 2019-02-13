import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ImageCapture';
  videoConstraints = {
    facingMode: 'environment'
  };

  // Image capture through mobile camera
  // selectedFile = null;
  // onFileSelected(event) {
  //   this.selectedFile = event.target.files[0];
  // }
  // onUpload() {
  //   console.log(this.selectedFile); // You can use FormData upload to backend server
  // }


  // Image capture through mobile camera/laptop webcam
  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  public captures: Array<any>;

  public constructor() {
      this.captures = [];
  }

  public ngOnInit() {

  }

  public ngAfterViewInit() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: this.videoConstraints }).then(stream => {
              this.video.nativeElement.srcObject = stream;
              this.video.nativeElement.play();
          });
      }
      // list of cameras
      // navigator.mediaDevices.enumerateDevices().then((devices) => {
      //   const cameras = devices;
      //   debugger
      // });
  }

  public capture() {
      const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
      this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
  }

}
