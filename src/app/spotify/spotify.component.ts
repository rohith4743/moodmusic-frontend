// spotify.component.ts
import { Component, OnInit } from '@angular/core';
import { Mood } from '../types/global.types';
import { MusicRecommendationService } from '../music-recommendation.service';
import { FormBuilder, Validators } from '@angular/forms';

declare var Spotify:any;

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  songs = [];
  currentSongIndex: number = 0;
  mood: Mood = "HAPPY"; 
  accessToken: string = '';
  player: any;

  loadAPI: any;
  device_id:string = '';
  player_state: boolean | null = null;

  currentPos = "";
  updateInterval: any;
  endPos: any;


  constructor(private musicService: MusicRecommendationService, private formBuilder: FormBuilder){}

  fetchSongs(): void {
    this.musicService.getSongsByMood(this.mood).subscribe(
      (data) => {
        this.songs = data['tracks'];
        this.accessToken = data['access_token'];
        this.connectPlayer()
        this.player_state = null;
      },
      error => {
        console.error('Error fetching songs:', error);
      }
    );
  }


  ngOnInit(): void {

    (<any>window).onSpotifyWebPlaybackSDKReady = this.connectPlayer.bind(this);

    this.loadAPI = new Promise((resolve) => {
      console.log('resolving promise...');
      this.loadScript();
      resolve("Complete")
    });

    this.loadAPI.then((arg:any)=>{
      console.log(arg);
      console.log("Script loaded");
    })

    this.updateInterval = setInterval(() => {
      this.updateCurrentTrack();
    }, 1000); 

  }

  ngOnDestroy(){
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  loadScript() {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = "https://sdk.scdn.co/spotify-player.js";
    node.type = 'text/javascript';
    node.async = true;
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  connectPlayer(){

    const token = this.accessToken;
    this.player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: (cb:any) => { cb(token); },
      volume: 0.5
    });

    console.log(this.player);
    console.log("onSpotifyWebPlaybackSDKReady");

    this.player.addListener('ready', this.ready.bind(this));

    this.player.addListener('not_ready', this.not_ready.bind(this));

    this.player.addListener('initialization_error', this.initialization_error.bind(this));

    this.player.addListener('authentication_error', this.authentication_error.bind(this));

    this.player.addListener('account_error', this.account_error.bind(this));

    this.player.addListener('playback_error', this.playback_error.bind(this));

    this.player.connect().then((success:any) => {
      console.log(success);
      console.log("Player connected!");
    });
  }

  ready(device_id:any){
    this.device_id = device_id['device_id'];
    console.log("ready Listener");
  }

  not_ready(device_id:string){
    this.device_id = device_id;
    console.log("not_ready Listener");
  }

  // error listeners
  initialization_error(message:any){
    console.log("initialization_error Listener")
    console.log(message);
  }

  authentication_error(message:any){
    console.log("authentication_error Listener")
    console.log(message);
  }

  account_error(message:any){
    console.log("account_error Listener")
    console.log(message);
  }

  playback_error(message:any){
    console.log("playback_error Listener")
    console.log(message);
  }


  togglePlay() {
    if (this.player_state != null && this.player_state) {
      this.player.pause().then(() => {
        this.player_state = false;
      });
    } else if (this.player_state != null && this.player_state == false) {
      this.player.resume().then(() => {
        this.player_state = true;
      });
    } else {
      const play = ( player:any, spotify_uri:string ) => {
        player['_options'].getOAuthToken((access_token: any) => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.device_id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
          });
        });
      };
  
      play( this.player, this.songs[this.currentSongIndex]['uri'] );
      this.player.resume()
      this.player_state = true;
    }
  }

  nextSong() {
    if (this.currentSongIndex < 9) {
      this.currentSongIndex += 1;
      this.player.pause();
      this.player_state = null;
      this.togglePlay()
    }
  }

  prevSong() {
    if (this.currentSongIndex > 0) {
      this.currentSongIndex -= 1;
      this.player.pause();
      this.player_state = null;
      this.togglePlay()
    }
  }

  formatTime(ms: number): string {
    const seconds = Math.floor(ms/1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  updateCurrentTrack(): void {
    this.player.getCurrentState().then((state:any) => {
      if (!state) {
        console.error('User is not playing music through the Web Playback SDK');
        return;
      }
      this.currentPos = this.formatTime(state.position)
      this.endPos = this.formatTime(this.songs[this.currentSongIndex]['duration'])
    });
  }


}
  

