import { Suspense } from 'react';
import TicketList from './TicketList';
import Loading from '../loading';

// These are server components by default
function Tickets() {
	console.log('in Tickets');
	return (
		<main>
			<nav>
				<div>
					<h2>Tickets</h2>
					<p>
						<small>Currently open tickets</small>
					</p>
				</div>
			</nav>
			{/* 
				When one of your components in your page, has a fetch and it will
				take time to get data then the loading.tsx will trigger! This will
				make the content in your entire page disappear and be replaced by
				the loading.tsx

				To not do that we need to use Suspense!
			*/}
			<Suspense fallback={<Loading />}>
				<TicketList />
			</Suspense>
		</main>
	);
}

export default Tickets;
