( new Settings() )
	.load()
	.then(
		( settings ) =>
		{
			( new WatchPage( settings ) )
				.execute();
		}
	);
