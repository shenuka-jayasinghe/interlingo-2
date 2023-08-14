import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from './environment.prod';

import { GenText } from '../shared/generate-text.model'

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class GenerateTextService {

  newText: any;
  selectedGenText: GenText;
  readonly baseURL = 'https://api.openai.com/v1/completions';
  
  postStory(gentext: GenText){
    const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', apiKey);
    
    return this.http.post(this.baseURL, gentext,  { 'headers': headers });
  }



  constructor(private http: HttpClient) {
    this.selectedGenText = new GenText("text-davinci-003", "", 1, 640);
   }
}
