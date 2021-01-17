class VideoRepeater
{
	constructor( isRunning, videoElement )
	{
		this._isRunning    = isRunning;
		this._videoEnded   = false;
		this._videoElement = videoElement;

		this._attachVideoEventHandlers();
	}

	get isRunning()
	{
		return this._isRunning;
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
		if ( true === this._videoEnded && true === this._isRunning )
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
				this._isRunning = !this._isRunning;
				this._playIfPossible();
				resolveHandler( this );
			}
		);
	}
}
