import { Component } from '@angular/core';
import { MusicGeneratorService } from '../music-generator.service';

@Component({
  selector: 'app-music-generator',
  templateUrl: './music-generator.component.html',
  styleUrls: ['./music-generator.component.css']
})
export class MusicGeneratorComponent {
  modelVersion!: string;
  prompt!: string;
  inputAudio!: File;
  status!: string;
  output!: string;

  constructor(private musicGeneratorService: MusicGeneratorService) { }

  generateMusic() {
    this.musicGeneratorService
      .generateMusic(this.modelVersion, this.prompt, this.inputAudio)
      .subscribe((response) => {
        this.status = `Status: ${response.status}`;
        if (response.status === 'succeeded') {
          this.output = `Output: ${response.output}`;
        } else if (response.status === 'starting' || response.status === 'in_progress') {
          // Implement polling logic to check status
          this.pollStatus(response.id);
        } else {
          this.status = 'Status: Unknown (Polling or webhook can be implemented)';
        }
      });
  }

  pollStatus(predictionId: string) {
    setInterval(() => {
      this.musicGeneratorService.checkMusicStatus(predictionId).subscribe((response) => {
        this.status = `Status: ${response.status}`;
        if (response.status === 'succeeded') {
          this.output = `Output: ${response.output}`;
        } else if (response.status === 'failed') {
          this.status = 'Status: Prediction failed';
        }
      });
    }, 5000); // Poll every 5 seconds (adjust as needed)
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.inputAudio = inputElement.files[0];
    }
  }
}
