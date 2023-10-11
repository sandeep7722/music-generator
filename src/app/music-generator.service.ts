import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicGeneratorService {
  // Update replicateApiUrl to use the /api path
  private replicateApiUrl = 'https://api.replicate.com/v1/predictions'; // Use /api here

  private replicateApiToken = 'r8_Vdzl2SE8fN2qJuOczQjXZZUq5jm4cMx4LM4lO';

  constructor(private http: HttpClient) { }

  generateMusic(modelVersion: string, prompt: string, inputAudio: File): Observable<any> {
    const formData = new FormData();
    formData.append('model_version', modelVersion);
    formData.append('prompt', prompt);
    formData.append('input_audio', inputAudio);

    const headers = new HttpHeaders({
      Authorization: `Token ${this.replicateApiToken}`
    });

    // Use this.replicateApiUrl instead of hardcoding the URL
    return this.http.post(this.replicateApiUrl, formData, { headers });
  }

  checkMusicStatus(predictionId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Token ${this.replicateApiToken}`
    });

    // Use this.replicateApiUrl instead of hardcoding the URL
    return this.http.get(`${this.replicateApiUrl}/${predictionId}`, { headers });
  }
}
