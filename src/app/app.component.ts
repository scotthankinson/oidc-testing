import { Component } from '@angular/core';
import { UserManager, User, CordovaPopupNavigator, CordovaIFrameNavigator } from 'oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oidc-client demo with Authorization Header';
  mgr;
  currentUser;

  constructor() {
    let loginSettings: any = {
        authority: "https://idp-d.gsu.edu/",
        client_id: "",
        redirect_uri: "http://localhost:8100/#/login/",
        post_logout_redirect_uri: "http://localhost:8100/#/login/",
        response_type: 'id_token token',
        scope: 'openid gsupersonpantherid',
        automaticSilentRenew: true,
        filterProtocolClaims: true,
        loadUserInfo: true
    };

    this.mgr = new UserManager(loginSettings);
    if (window.location.href.indexOf('gsupersonpantherid') > -1){
      this.loginRedirect();
    }
  }

  login() {
    this.mgr.signinRedirect().then(() => {
        console.log("signinRedirect done");
    }).catch((err) => {
        console.log('Sigin Redirect failed: ' + err);
    });
  }

  logout() {
    this.mgr.signoutRedirect({REDIRECT:"LOGOUT"}).then( (user:any) => {
      if( user ) { console.warn("received user from signout = ", user ); }
    } ).catch((err) => {
      console.log( "Signout Redirect failed = ", err );
    } );
  }

  loginRedirect(){
    this.mgr.signinRedirectCallback().then((user) => {
      console.log("Successfully signed in!", user);
      this.currentUser = user;
    }).catch((err) => {
      console.log('Signin Redirect callback failed: ' + err);
    });
  }


  userinfo(){
    this.mgr.getUser().then((user) => {
      console.log("getting user");
      console.log(user);

      this.currentUser = user;
    }).catch((err) => {
        console.log("Error loading User from UserManager: " + err);
    });
  }
}
