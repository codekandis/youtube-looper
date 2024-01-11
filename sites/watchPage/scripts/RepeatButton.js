'use strict';

class RepeatButton
{
	constructor( settings, videoRepeater )
	{
		this._checked       = -1 !== settings.get( 'loopedVideos' ).indexOf( window.location.href );
		this._settings      = settings;
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

	_updateSettings( isRunning )
	{
		const uri          = window.location.href;
		const loopedVideos = this._settings.get( 'loopedVideos' );
		const uriIndex     = loopedVideos.indexOf( uri );
		if ( true === isRunning && -1 === uriIndex )
		{
			loopedVideos.push( uri );
			this._settings.set( 'loopedVideos', loopedVideos );
		}
		if ( false === isRunning && -1 !== uriIndex )
		{
			loopedVideos.splice( uriIndex, 1 );
			this._settings.set( 'loopedVideos', loopedVideos );
		}
		this._settings.save();
	}

	_setButtonState( state )
	{
		const tooltip = false === state
			? 'Repeat is off'
			: 'Repeat is on';
		this._element.setAttribute( 'title', tooltip );
		this._element.setAttribute( 'aria-label', tooltip );
		this
			._element
			.querySelector( '.codekandis-repeatButton' )
			.setAttribute( 'aria-checked', state );
	}

	_createElement()
	{
		this._element = DomHelper.createElementFromString( '<button class="ytp-button codekandis-repeatButtonContainer" data-tooltip-target-id="codekandis-repeatButton"><div class="ytp-autonav-toggle-button-container"><div class="ytp-autonav-toggle-button codekandis-repeatButton"></div></div></button>' );
		this._setButtonState( this._checked );
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
							this._updateSettings( videoRepeater.isRunning );
							this._setButtonState( videoRepeater.isRunning );
						}
					);
			}
		);

		return this._element;
	}
}
