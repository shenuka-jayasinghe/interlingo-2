import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { GenerateTextService } from '../shared/generate-text.service';
import { NgForm } from '@angular/forms';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
import { ToolbarService } from '../shared/toolbar.service';
import { DeeplService } from '../shared/deepl.service';
import { TranslateText } from '../shared/deepl.model';



@Component({
  selector: 'app-generate-text',
  templateUrl: './generate-text.component.html',
  styleUrls: ['./generate-text.component.scss'],
  providers: [GenerateTextService]
})
export class GenerateTextComponent {



    genTextLevel: string = "";
    genTextStyle: string = "";
    genTextTopic: string = "";
    genTextLanguage: string = "";
    translationLanguage: string = "";
    newText: any;
    newTranslation: any;
    translatedText: any;
    generatedText: any;
    translatedgenText: any;
    genTextLength: number = 0;
    newConversation: string = "";
    translatedConversation: any;
    isConversationReady =  false;
  
    isTranslationReady = false;
    generateButtonPressed = false;
  
    // Add an event handler for the "Generate" button
    // onStartGenerating() {
    //   this.generateButtonPressed = true;
    // }
    
  
  
    constructor(public generateTextService: GenerateTextService, public toolbarService: ToolbarService, public deepLService: DeeplService) { 
  
     }
  
  
    makeRequest( form : NgForm ) {
      // Construct the request body
      const body = {
        model: "text-davinci-003",
        prompt: "Make a " + this.toolbarService.selectedLevel + " level " + this.genTextStyle + " about " + this.genTextTopic + " in " + this.toolbarService.selectedLanguage + " language, and only of " + this.genTextLength + " sentences.",
        temperature: 1,
        max_tokens: 150
      };

      
  
      // Make the post request to the ChatGPT API
      
      this.generateButtonPressed = true;
      this.generateTextService.postgenText(body).subscribe((res) => {
        
        console.log(body);
        console.log(res);
        this.newText = res;
        this.generatedText = this.newText.choices[0].text;
        console.log(this.generatedText);
        this.isTranslationReady = true;
        this.generateButtonPressed = false;

        // Prepare ChatGPT's new text to send to DeepL

        const deeplbody = {
          // text: this.newText.choice[0].text,
          // target_lang: this.toolbarService.selectedLanguage
          text: 'text',
          target_lang: 'DE'
        }

        this.deepLService.postDeepL(deeplbody).subscribe((res) => {
          console.log(deeplbody);
          console.log(res);
          this.newTranslation = res;
          this.translatedText = this.newTranslation.text;
          console.log(this.translatedText);
        },
         error => {
        this.isTranslationReady = false;
        this.generateButtonPressed = false;
      });

        


      }, error => {
        this.isTranslationReady = false;
        this.generateButtonPressed = false;
      });
    }

    genTextAgain(){
      this.newText = false;
      this.isTranslationReady = false;
    }
  
    makeTranslation() {
      // Construct the request body
      const body = {
        model: "text-davinci-003",
        prompt: "Translate " + this.generatedText + " in to " + this.translationLanguage,
        temperature: 1,
        max_tokens: 500
      };
  
      // Make the post request to the ChatGPT API
      this.generateTextService.postgenText(body).subscribe((res) => {
        console.log(body);
        console.log(res);
        this.translatedgenText = res;
      });
    }
  
    makeConversation() {
      // Construct the request body
      const body = {
        model: "text-davinci-003",
        prompt: "Make a " + this.genTextLevel + " conversation about the following: " + this.generatedText + ": in " + this.genTextLanguage,
        temperature: 1,
        max_tokens: 500
      };
  
      // Make the post request to the ChatGPT API
      this.generateTextService.postgenText(body).subscribe((res) => {
        console.log(body);
        console.log(res);
        this.newText = res;
        this.isConversationReady = true;
        // this.newConversation = this.newText.choice[0].text;
        // this.genText = this.generatedgenText;
      }, error => {
        this.isConversationReady = false;
      });
    }
  
    translateNewText() {
      // Construct the request body
      const body = {
        model: "text-curie-001",
        prompt: "Translate " + this.newText.choices[0].text + " in to " + this.translationLanguage,
        temperature: 1,
        max_tokens: 500
      };
  
      // Make the post request to the ChatGPT API
      this.generateTextService.postgenText(body).subscribe((res) => {
        console.log(body);
        console.log(res);      
        this.translatedConversation = res;
      });
    }
  
    practiceVocab() {
      const body = {
        model: "text-davinci-003",
        prompt: "Make another " + this.genTextLevel + " " + this.genTextStyle + "in only " + this.genTextLength + " sentences, with only the following vocabulary: " + this.generatedText + ": in " + this.genTextLanguage,
        temperature: 1,
        max_tokens: 500
      };
  
      // Make the post request to the ChatGPT API
      this.generateTextService.postgenText(body).subscribe((res) => {
        console.log(body);
        console.log(res);
        this.newText = res;
        this.isConversationReady = true;
        // this.newConversation = this.newText.choice[0].text;
        // this.genText = this.generatedgenText;
      }, error => {
        this.isConversationReady = false;
      });  
      
      
      
  
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
  
