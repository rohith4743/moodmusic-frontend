import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MusicRecommendationService } from '../music-recommendation.service';
import { Mood } from '../types/global.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  songs: string[] = [];
  mood: Mood = '';
  @ViewChild('videoElement') videoElement: ElementRef | undefined;
  uploadedImageUrl: string | ArrayBuffer | null = null;


  constructor(private musicService: MusicRecommendationService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.startCamera();
  }

  startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (this.videoElement && this.videoElement.nativeElement) {
            this.videoElement.nativeElement.srcObject = stream;
            this.videoElement.nativeElement.play();
          }
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
        });
    }
  }
  

  captureImage() {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
  
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0);
        canvas.toBlob(blob => {
          if (blob) {
            const file = new File([blob], "captured-image", { type: "image/png" });
            this.processImage(file);
          } else {
            console.error('Unable to convert canvas to Blob');
          }
        }, "image/png");
      } else {
        console.error('Unable to get canvas context');
      }
    } else {
      console.error('Video element is not available');
    }
  }
  
  
  fileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.onImageSelected(input.files[0]);
    }
  }

  onImageSelected(file: File) {
    this.processImage(file);
  }

  sendImageToApi(file: File) {
    const formData = new FormData();
    formData.append('image', file);
  
    this.musicService.detectMood(formData).subscribe(
      response => {
        if (response && response.emotion) {
          const apiMood = response.emotion;
          if (this.isValidMood(apiMood)) {
            this.mood = apiMood as Mood; // Type assertion here
            this.cdRef.detectChanges(); // Update the view with the new mood
            this.fetchSongs(); // Fetch songs based on the detected mood
          } else {
            console.error('Invalid mood received from API:', apiMood);
          }
        }
      },
      error => {
        console.error('Error fetching mood from API:', error);
      }
    );
  }

  private isValidMood(mood: any): mood is Mood {
    return ['SAD', 'CONFUSED', 'DISGUSTED', 'ANGRY', 'SURPRISED', 'FEAR', 'CALM', 'HAPPY', ''].includes(mood);
  }
  

  processImage(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.uploadedImageUrl = reader.result;
      this.cdRef.detectChanges();
      
      // Send the image file to the API after it is fully loaded
      this.sendImageToApi(file);
    };
    reader.readAsDataURL(file);
  }
  

  selectChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    if (select) {
      this.onSelectMood(select.value as Mood);
    }
  }
  

  onSelectMood(mood: Mood) {
    this.mood = mood;
    this.fetchSongs();
  }

  fetchSongs() {
    this.musicService.getSongsByMood(this.mood).subscribe(songs => {
      this.songs = songs;
    });
  }

}
