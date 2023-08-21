class PreferencesPage
{
	constructor( settings, preferencesForm )
	{
		this._preferencesFormEventHandlerPresets = {
			submit: this._saveSettings,
			reset:  this._loadSettings
		};

		this._settings        = settings;
		this._preferencesForm = preferencesForm;

		this._attachSettings();
		this._addEventHandlersToPreferencesForm();
	}

	_attachSettings()
	{
		this._appendLoopedVideos();
	}

	_addEventHandlersToPreferencesForm()
	{
		this._preferencesFormEventHandlerPresets.forEach(
			( eventName, eventHandler ) =>
			{
				this._preferencesForm.addEventListener(
					eventName,
					( event ) =>
					{
						event.preventDefault();
						eventHandler.bind( this )();
					}
				);
			}
		);
	}

	_loadSettings()
	{
		this
			._settings
			.load()
			.then(
				( settings ) =>
				{
					this._attachSettings();
				}
			);
	}

	_saveSettings()
	{
		document
			.querySelectorAll( 'form fieldset [id]' )
			.forEach(
				( settingElement ) =>
				{
					const settingName = settingElement.getAttribute( 'id' );
					if ( true === this._settings.has( settingName ) )
					{
						this._settings.set( settingName, settingElement.value );
					}
				}
			);
		this
			._settings
			.save();
	}

	_appendLoopedVideos()
	{
		const list = document.querySelector( '#loopedVideos' );

		this._settings
			.get( 'loopedVideos' )
			.forEach(
				( fetchedLoopedVideo ) =>
				{
					const listElement = DomHelper.createElementFromString( '<li><a href="' + fetchedLoopedVideo + '">' + fetchedLoopedVideo + '</a></li>' );
					list.append( listElement );

					window.fetch( fetchedLoopedVideo )
						.then(
							( response ) =>
							{
								return response.text()
							}
						)
						.then(
							( plainText ) =>
							{
								const domParser = new DOMParser();
								const document  = domParser.parseFromString( plainText, 'text/html' );

								const videoMetaData = document.querySelector( '#watch7-content' );
								const artist        = videoMetaData
									.querySelector( '[itemprop="author"] [itemprop="name"]' )
									.getAttribute( 'content' );
								const trackTitle    = videoMetaData
									.querySelector( '[itemprop="name"]' )
									.getAttribute( 'content' );

								listElement
									.querySelector( 'a' )
									.textContent = artist + ' - ' + trackTitle;
							}
						);
				}
			);
	}
}
