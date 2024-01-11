'use strict';

class WatchPage
{
	constructor( settings )
	{
		this._videoElement  = null;
		this._videoRepeater = null;
		this._repeatButton  = null;
		this._settings      = settings;
	}

	_addRepeatButton()
	{
		const isLooped = -1 !== this
			._settings
			.get( 'loopedVideos' )
			.indexOf( window.location.href );

		this._videoRepeater = new VideoRepeater( isLooped, this._videoElement );
		this._repeatButton  = new RepeatButton( this._settings, isLooped, this._videoRepeater );

		const timeElement = document.querySelector( '#movie_player .ytp-time-display' );
		timeElement
			.parentNode
			.insertBefore( this._repeatButton.element, timeElement.nextSibling );
	}

	_removeRepeatButton()
	{
		if ( null !== this._repeatButton )
		{
			this._repeatButton.remove();
		}

		this._repeatButton = null;
	}

	_resetRepeatButton()
	{
		this._removeRepeatButton();
		this._addRepeatButton();
	}

	_setupVideoElement()
	{
		const mutationHandler = ( mutations, mutationObserver ) =>
		{
			mutations.forEach(
				( mutation ) =>
				{
					[ ...mutation.addedNodes ].forEach(
						( addedNode ) =>
						{
							if ( 'VIDEO' === addedNode.nodeName )
							{
								this._videoElement = addedNode;
								this._videoElement.addEventListener( 'loadstart', this._video_loadStart );
								this._addRepeatButton();
							}
						}
					);
				}
			);
		};

		const mutationObserver = new MutationObserver( mutationHandler );
		mutationObserver.observe(
			document,
			{
				subtree:   true,
				childList: true
			}
		);
	}

	execute()
	{
		this._setupVideoElement();
	}

	_video_loadStart = ( event ) =>
	{
		this._resetRepeatButton();
	};
}
