class VideoRepeater
{
	constructor( videoElement )
	{
		this._isRunning     = false;
		this._timerInterval = 500;
		this._videoEnded    = false;
		this._videoElement  = videoElement;

		this._attachVideoEventHandlers();
		this._startTimer();
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
			}
		);
	}

	_startTimer()
	{
		setInterval(
			() =>
			{
				if ( true === this._isRunning )
				{
					if ( true === this._videoEnded )
					{
						this._videoElement.play();
						this._videoEnded = false;
					}
				}
			},
			this._timerInterval
		);
	}

	async toggle( )
	{
		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				this._isRunning = !this._isRunning;
				resolveHandler( this );
			}
		);
	}
}
