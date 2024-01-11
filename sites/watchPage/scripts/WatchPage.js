'use strict';

class WatchPage
{
	constructor( settings )
	{
		this._settings = settings;
	}

	_addRepeatButton( videoElement )
	{
		const isRunning     = -1 !== this
			._settings
			.get( 'loopedVideos' )
			.indexOf( window.location.href )
		const videoRepeater = new VideoRepeater( isRunning, videoElement );
		const timeElement   = document.querySelector( '#movie_player .ytp-time-display' );
		timeElement
			.parentNode
			.insertBefore(
				( new RepeatButton( this._settings, videoRepeater ) )
					.element,
				timeElement.nextSibling
			);
	}

	_waitForAddedVideoElement()
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
								this._addRepeatButton( addedNode );
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
		this._waitForAddedVideoElement();
	}
}
