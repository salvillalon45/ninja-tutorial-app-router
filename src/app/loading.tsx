function Loading() {
	/*
        This only applies to the page components, not anything else
        If you want to be more specific and apply different levels we can use the suspense
    */
	return (
		<main className='text-center'>
			<h2 className='text-primary'>Loading...</h2>
			<p>Hopefully for not too long :0</p>
		</main>
	);
}

export default Loading;
