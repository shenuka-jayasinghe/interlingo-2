import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AudioModel } from './get-audio.model';


@Injectable({
  providedIn: 'root'
})
export class GetAudioService {
  constructor(private http: HttpClient) {
  audioModel: AudioModel 
  }


  fetchAudioFile(audioModel: AudioModel): Observable<Blob> {
    const { text, languageCode } = audioModel;
    // const request = {
    //   input: { text },
    //   voice: { languageCode, ssmlGender: 'NEUTRAL' },
    //   audioConfig: { audioEncoding: 'LINEAR16' },
    // };

    return this.http.post('http://localhost:3000/text-to-speech', audioModel, { responseType: 'blob' });
  }
  
}
