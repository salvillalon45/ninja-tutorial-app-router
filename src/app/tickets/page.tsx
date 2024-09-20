import TicketList from './TicketList';

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

			<TicketList />
		</main>
	);
}

export default Tickets;
