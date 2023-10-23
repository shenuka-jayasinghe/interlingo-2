import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { GenerateTextService } from '../shared/generate-text.service';
import { NgForm } from '@angular/forms';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
import { ToolbarService } from '../shared/toolbar.service';



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
    
  
  
    constructor(public generateTextService: GenerateTextService, public toolbarService: ToolbarService) { 
  
     }
  
  
    makeRequest( form : NgForm ) {
      // Construct the request body
      const body = {
        text: "Make a " + this.toolbarService.selectedLevel + " level " + this.genTextStyle + " about " + this.genTextTopic + ". This " + this.genTextStyle + " should be exactly " + this.genTextLength + " sentences long.",
        language: this.toolbarService.selectedLanguage
      };
  
      // Make the post request to the ChatGPT API
      
      this.generateButtonPressed = true;
      this.generateTextService.postgenText(body).subscribe((res) => {
        
        console.log(body);
        console.log(res);
        this.newText = res;
        console.log(this.generatedText);
        this.isTranslationReady = true;
        this.generateButtonPressed = false;
        // this.genText = this.generatedgenText;
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
        text: "Make a " + this.toolbarService.selectedLevel + " level " + this.genTextStyle + " about " + this.genTextTopic + "of only " + this.genTextLength + " sentences.",
        language: this.toolbarService.selectedLanguage
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
        text: "Make a " + this.toolbarService.selectedLevel + " level " + this.genTextStyle + " about " + this.genTextTopic + "of only " + this.genTextLength + " sentences.",
        language: this.toolbarService.selectedLanguage
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
        text: "Make a " + this.toolbarService.selectedLevel + " level " + this.genTextStyle + " about " + this.genTextTopic + "of only " + this.genTextLength + " sentences.",
        language: this.toolbarService.selectedLanguage
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
        text: "Make a " + this.toolbarService.selectedLevel + " level " + this.genTextStyle + " about " + this.genTextTopic + "of only " + this.genTextLength + " sentences.",
        language: this.toolbarService.selectedLanguage
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
  
