'use strict';

class VideoRepeater
{
	constructor( isLooped, videoElement )
	{
		this._isLooped     = isLooped;
		this._videoEnded   = false;
		this._videoElement = videoElement;

		this._attachVideoEventHandlers();
	}

	get isRunning()
	{
		return this._isLooped;
	}

	_attachVideoEventHandlers()
	{
		this._videoElement.addEventListener(
			'ended',
			( event ) =>
			{
				this._videoEnded = true;
				this._playIfPossible();
			}
		);
	}

	_playIfPossible()
	{
		if ( true === this._videoEnded && true === this._isLooped )
		{
			this._videoElement.play();
			this._videoEnded = false;
		}
	}

	async toggle()
	{
		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				this._isLooped = !this._isLooped;
				this._playIfPossible();
				resolveHandler( this );
			}
		);
	}
}
