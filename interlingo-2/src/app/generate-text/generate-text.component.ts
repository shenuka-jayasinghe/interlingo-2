import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { GenerateTextService } from '../shared/generate-text.service';
import { NgForm } from '@angular/forms';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
import { ToolbarService } from '../shared/toolbar.service';
import { GetAudioService } from '../shared/get-audio.service';
import { AudioPlayerComponent } from '../main-page/audio-player/audio-player.component';



@Component({
  selector: 'app-generate-text',
  templateUrl: './generate-text.component.html',
  styleUrls: ['./generate-text.component.scss'],
  providers: [GenerateTextService, GetAudioService]
})
export class GenerateTextComponent {


    
    genTextLevel: string = "";
    genTextStyle: string = "";
    genTextTopic: string = "";
    genTextLanguage: string = "";
    translationLanguage: string = "";
    apiResponse: any;
    generatedText: any;
    translatedgenText: any;
    genTextLength: number = 0;
    newConversation: string = "";
    translatedConversation: any;
    isConversationReady =  false;
    languageCode: any;
    isTranslationReady = false;
    generateButtonPressed = false;
    audioURL = ""
  
  
  
  
    constructor(public generateTextService: GenerateTextService, public toolbarService: ToolbarService, public getAudioService: GetAudioService) { 
  
     }
  
  
    makeRequest( form : NgForm ) {
      // Construct the request body
      const body = {
        text: "Make a " + this.toolbarService.selectedLevel + " level " + this.genTextStyle + " about " + this.genTextTopic + "of only " + this.genTextLength + " sentences.",
        language: this.toolbarService.selectedLanguage
      };
      
  
      // Make the post request to the ChatGPT API
      
      this.generateButtonPressed = true;
      this.generateTextService.postgenText(body).subscribe((res) => {
        
        console.log(body);
        console.log(res);
        this.apiResponse = res;
        console.log(this.generatedText);
        this.isTranslationReady = true;
        this.generateButtonPressed = false;
        this.getAudio()
        // this.audioModel.text = 
      }, error => {
        this.isTranslationReady = false;
        this.generateButtonPressed = false;
      });

      // get Audio from Google API
            

    }


    genTextAgain(){
      this.apiResponse = false;
      this.isTranslationReady = false;
    }

    getAudio() {
      const audioReq = {
        text: this.apiResponse.translatedText,
        languageCode: this.apiResponse.languageCode
      };
    
        this.getAudioService.fetchAudioFile(audioReq).subscribe(audioBlob => {
        // Create an Object URL from the audioBlob
        this.audioURL = URL.createObjectURL(audioBlob);
        // Now you have an Object URL that can be used to play the audio
      });
    }

    playAudio() {
      // Fetch and set the audioUrl when the audio is available
      this.getAudio();
    }
  
  
    makeTranslation() {
      // Construct the request body
      const body = {
        text: "Make a " + this.toolbarService.selectedLevel + " level " + this.genTextStyle + " about " + this.genTextTopic + "of only " + this.genTextLength + " sentences.",
        language: this.toolbarService.selectedLanguage
      };
  
      // Make the post request to the ChatGPT API
      this.generateTextService.postgenText(body).subscribe((res) => {
        console.log(body);
        console.log(res);
        this.translatedgenText = res;
      });

      // Make audio request to google TTS API
    }
  

      
 
    
  
    ngOnInit() {
      // Assume that the JSON object is stored in a variable called "jsonResponse"
      this.genTextLevel = "";
      this.genTextStyle = "";
      this.genTextTopic = "";
      this.genTextLanguage = "";
      this.genTextLength = 0;
      this.translationLanguage = "English";
      
    }
  
    
  
  
  }
  
