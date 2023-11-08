import { Component, OnInit } from '@angular/core';
import { GetAudioService } from 'src/app/shared/get-audio.service';
import { AudioModel } from 'src/app/shared/get-audio.model';
import { GenerateTextComponent } from 'src/app/generate-text/generate-text.component';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  audioModel: AudioModel = new AudioModel('', ''); // Initialize with default values
  

  constructor(private getAudioService: GetAudioService) {}

  ngOnInit() {
    // The code here will run when the component is initialized.
    // You can perform any setup or initialization tasks here.
  }

  playAudio() {
    // Fetch and set the audioUrl when the audio is available
    // this.getAudio();
  }

}
