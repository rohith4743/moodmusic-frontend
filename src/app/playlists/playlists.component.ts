import { Component } from '@angular/core';

declare var Spotify:any;
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent {


  songs = [
        {
            "name": "Give It To Me - Best Of",
            "artists": "Reel Big Fish",
            "spotify_url": "https://open.spotify.com/track/5TjNVevwvs5Vzh6w3zgiEp",
            "album_art_url": "https://i.scdn.co/image/ab67616d0000b2736f1f8819dbf66c066a2106ac",
            "uri": "spotify:track:5TjNVevwvs5Vzh6w3zgiEp",
            "duration": 180977
        },
        {
            "name": "The Prince",
            "artists": "Madness",
            "spotify_url": "https://open.spotify.com/track/2wdiN6LKQLyeIwZzKERoQW",
            "album_art_url": "https://i.scdn.co/image/ab67616d0000b273217713ec5ac12b00f57fb978",
            "uri": "spotify:track:2wdiN6LKQLyeIwZzKERoQW",
            "duration": 149693
        },
        {
            "name": "The Science of Selling Yourself Short",
            "artists": "Less Than Jake",
            "spotify_url": "https://open.spotify.com/track/1iD0a0plhO55cWEJa5UGcZ",
            "album_art_url": "https://i.scdn.co/image/ab67616d0000b27346b71e44bcda9ea6eba4182e",
            "uri": "spotify:track:1iD0a0plhO55cWEJa5UGcZ",
            "duration": 186266
        },
        {
            "name": "Vitamin A",
            "artists": "The Skatalites",
            "spotify_url": "https://open.spotify.com/track/0vXl28LdKIizzMGo6Lcbrm",
            "album_art_url": "https://i.scdn.co/image/ab67616d0000b27330286ddc5bcafb2582e08064",
            "uri": "spotify:track:0vXl28LdKIizzMGo6Lcbrm",
            "duration": 169133
        },
        {
            "name": "Ghost Town",
            "artists": "The Specials",
            "spotify_url": "https://open.spotify.com/track/1RljBZBY72HYDW3NV5Srlq",
            "album_art_url": "https://i.scdn.co/image/ab67616d0000b2738a50277c683702263ee76a73",
            "uri": "spotify:track:1RljBZBY72HYDW3NV5Srlq",
            "duration": 219306
        },
        {
            "name": "Hands Off…she's Mine",
            "artists": "The Beat",
            "spotify_url": "https://open.spotify.com/track/4QXYpQKtWnBLeE4qQRZM4r",
            "album_art_url": "https://i.scdn.co/image/ab67616d0000b273139127d73a88a6b2902bd976",
            "uri": "spotify:track:4QXYpQKtWnBLeE4qQRZM4r",
            "duration": 179586
        },
        {
            "name": "You Don't Know (Skacoustic) - Best Of",
            "artists": "Reel Big Fish",
            "spotify_url": "https://open.spotify.com/track/0whLgme6MX9jre9I2aZYIJ",
            "album_art_url": "https://i.scdn.co/image/ab67616d0000b2736f1f8819dbf66c066a2106ac",
            "uri": "spotify:track:0whLgme6MX9jre9I2aZYIJ",
            "duration": 195498
        },
        {
            "name": "Skalari Rude Klub (S.R.K.) - original",
            "artists": "Skalariak",
            "spotify_url": "https://open.spotify.com/track/0Wvd2C97FHMYoP0FT0uTXG",
            "album_art_url": "https://i.scdn.co/image/ab67616d0000b27325b5713842b102daf82a3cf9",
            "uri": "spotify:track:0Wvd2C97FHMYoP0FT0uTXG",
            "duration": 217813
        },
        {
            "name": "Voodoo",
            "artists": "Mobster",
            "spotify_url": "https://open.spotify.com/track/1w13xmbVJPZPBK5fwM3aJk",
            "album_art_url": "https://i.scdn.co/image/ab67616d0000b2737488f0088f4a1ef5890e0f51",
            "uri": "spotify:track:1w13xmbVJPZPBK5fwM3aJk",
            "duration": 253386
        },
        {
            "name": "Lip Up Fatty",
            "artists": "Bad Manners",
            "spotify_url": "https://open.spotify.com/track/78Ovt1QkZbU1QBMKWpcXPy",
            "album_art_url": "https://i.scdn.co/image/ab67616d0000b273a367438fe4ab3cbacba3fb0e",
            "uri": "spotify:track:78Ovt1QkZbU1QBMKWpcXPy",
            "duration": 168112
        }
    ]

      slider_present = 0;
      slider_max = 10;
      accessToken: any = "BQC4R8ocuhCoXrFHvUHYBn0wZcwQzFMNuz4PNOMIttlx9yqGFgOSABAtG_Et6CiKNoGXz9k3F2pVbzG2JJUKEqF9edeZVgkmAG35OsJVmfW-mQVnNYI7EAVLC3Im8M2wPBaqnclamvUVcAdDLB67J2SvzWoKfROjmHyqZn7Cz2cEImOy4p8B97EYsr6vaQGf-mEeV_Se4DjiBBD8rfnxI6Qou8EDo-w8PSo";
      player: any;
      loadAPI: any;
      device_id:string = '';
      updateInterval: any;
      nowPlaying:any;


    nextSong() {
      throw new Error('Method not implemented.');
      }
      player_state: any;
      
      currentSongIndex: any;
      prevSong() {
      throw new Error('Method not implemented.');
      }
      seek($event: number) {
      throw new Error('Method not implemented.');
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
