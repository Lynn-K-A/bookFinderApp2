'use strict';


import { SHOW_MORE_BTN } from "../constants";

export function myFunction () {
    const redirect = result.volumeInfo.infoLink;
    window.open(redirect, '_blank');
}

  document.body.addEventListener( 'click', function ( event ) {
    if( event.target.id == 'SHOW_MORE_BTN' ) {
      myFunction();
    };
  } );