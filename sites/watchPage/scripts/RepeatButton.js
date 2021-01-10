class RepeatButton
{
	constructor( videoRepeater )
	{
		this._checked       = false;
		this._videoRepeater = videoRepeater;
		this._element       = this._createElement();
	}

	get checked()
	{
		return this._checked;
	}

	get element()
	{
		return this._element;
	}

	_createElement()
	{
		this._element = DomHelper.createElementFromString( '<button class="ytp-button codekandis-repeatButtonContainer" data-tooltip-target-id="codekandis-repeatButton" aria-label="Repeat is off" title="Repeat is off"><div class="ytp-autonav-toggle-button-container"><div class="ytp-autonav-toggle-button codekandis-repeatButton" aria-checked="false"></div></div></button>' );
		this._element.addEventListener(
			'click',
			( event ) =>
			{
				this
					._videoRepeater
					.toggle()
					.then(
						( videoRepeater ) =>
						{
							this
								._element
								.querySelector( '.codekandis-repeatButton' )
								.setAttribute( 'aria-checked', videoRepeater.isRunning );
						}
					);
			}
		);

		return this._element;
	}
}
