import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from './environment.prod';
import { TranslateText } from './deepl.model';


const deeplKey = environment.deeplKey;


@Injectable({
  providedIn: 'root'
})
export class DeeplService {  
  
  newTranslation: any;
  private apiUrl = 'https://api-free.deepl.com/v2/translate';
  private authKey = deeplKey;
  selectedTranslation: TranslateText;
  translatedText: any;



    postDeepL(translateText: TranslateText){
      const headers= new HttpHeaders()
    .set('Authorization', `DeepL-Auth-Key ${this.authKey}`)
    // .set('User-Agent', 'YourApp/1.2.3')
    .set('Content-Type', 'application/json');
      

    return this.http.post(this.apiUrl, translateText, { headers: headers });
    }

    constructor(private http: HttpClient) {
      this.selectedTranslation = new TranslateText("","");
     }
}

