class Settings
{
	constructor()
	{
		this._settings = {
			loopedVideos: []
		};
	}

	has( name )
	{
		return undefined !== this._settings[ name ];
	}

	get( name )
	{
		return this._settings[ name ];
	}

	set( name, value )
	{
		this._settings[ name ] = value;
	}

	async load()
	{
		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				const loadHandler = ( resolvedHandler, storedSettings ) =>
				{
					storedSettings.forEach(
						( name, value ) =>
						{
							if ( undefined !== this._settings[ name ] )
							{
								this._settings[ name ] = value;
							}
						}
					);

					resolvedHandler( this );
				};

				browser
					.storage
					.local
					.get( 'settings' )
					.then(
						( storage ) =>
						{
							const storedSettings = storage.settings;
							if ( undefined === storedSettings )
							{
								this
									.save()
									.then(
										( settings ) =>
										{
											loadHandler( resolveHandler, this._settings );
										}
									);
							}
							else
							{
								loadHandler( resolveHandler, storedSettings );
							}
						}
					);
			}
		);
	}

	async save()
	{
		return await new Promise(
			( resolveHandler, rejectHandler ) =>
			{
				browser
					.storage
					.local
					.get( 'settings' )
					.then(
						( storage ) =>
						{
							const storedSettings = storage.settings ?? {};
							{
								this
									._settings
									.forEach(
										( name, value ) =>
										{
											storedSettings[ name ] = this._settings[ name ];
										}
									);
							}

							browser
								.storage
								.local
								.set(
									{ settings: storedSettings }
								)
								.then(
									( settings ) =>
									{
										resolveHandler( this );
									}
								)
						}
					);
			}
		);
	}
}
