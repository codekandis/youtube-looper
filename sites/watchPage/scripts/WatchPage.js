'use strict';

class WatchPage
{
	constructor( settings )
	{
		this._settings = settings;
	}

	_addRepeatButton()
	{
		const videoRepeater = new VideoRepeater(
			-1 !== this._settings.get( 'loopedVideos' ).indexOf( window.location.href ),
			document
				.querySelector( '#movie_player .html5-main-video' )
		);
		const timeElement   = document.querySelector( '#movie_player .ytp-time-display' );
		timeElement
			.parentNode
			.insertBefore(
				( new RepeatButton( this._settings, videoRepeater ) )
					.element,
				timeElement.nextSibling
			)
		;
	}

	execute()
	{
		this._addRepeatButton();
	}
}
