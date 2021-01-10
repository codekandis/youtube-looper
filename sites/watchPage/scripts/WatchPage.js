class WatchPage
{
	constructor( settings )
	{
		this._settings = settings;
	}

	_addRepeatButton()
	{
		document
			.querySelector( '#movie_player .ytp-left-controls' )
			.appendChild(
				( new RepeatButton(
					new VideoRepeater(
						document
							.querySelector( '#movie_player .html5-main-video' )
					)
				) ).element
			)
		;
	}

	execute()
	{
		this._addRepeatButton();
	}
}
