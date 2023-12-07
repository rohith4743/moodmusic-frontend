import { Component } from '@angular/core';
import { StoragesessionService } from '../storagesession.service';
import { MusicRecommendationService } from '../music-recommendation.service';

declare var Spotify:any;
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent {


  songs = []

      slider_present = 0;
      slider_max = 10;
      accessToken: any = "";
      player: any;
      loadAPI: any;
      device_id:string = '';
      updateInterval: any;
      nowPlaying:any;
      player_state: any;
      currentSongIndex: any;

      constructor(private storageService: StoragesessionService, private musicService : MusicRecommendationService) {}


      ngOnInit(): void {

        this.musicService.get_playlists().subscribe (
          response => {
            this.accessToken = response["access_token"]
            this.songs = response["songs"]
            console.log("fetched successfully")
            this.connectPlayer()
          }, error => {
            console.error("error fetching songs", error)
          }
        );

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

      updateCurrentTrack(): void {
        this.player.getCurrentState().then((state:any) => {
          if (!state) {
            console.error('User is not playing music through the Web Playback SDK');
            return;
          }
        });
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


      togglePlay(index:number) {

        if (index == this.nowPlaying) {
          if (this.player_state != null && this.player_state) {
            this.player.pause().then(() => {
              this.player_state = false;
            });
          } else if (this.player_state != null && this.player_state == false) {
            this.player.resume().then(() => {
              this.player_state = true;
            });
          } 
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
      
          play( this.player, this.songs[index]['uri'] );
          this.player.resume()
          this.player_state = true;
        }
        this.nowPlaying = index;
      }
}
