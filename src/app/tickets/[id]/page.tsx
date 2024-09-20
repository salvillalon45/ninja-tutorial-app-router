import { Ticket, Tickets } from '@/app/types/types';
import { notFound } from 'next/navigation';

/*
    Control what happens when a dynamic segment is
    visited that was not generated with generateStaticParams.
    Like if the user go to a page with an id that does not exist!

    - true (default): Dynamic segments not included in generateStaticParams are generated on demand.
        - For any request for new ticket page that don't already have a page generated for them, 
        then next.js will try and fetch the data for that ticket and create a new page for us
        in case the id exists
        - then after it has done that it can generate a static page for future requests to that page
    - false: Dynamic segments not included in generateStaticParams will return a 404.
*/
export const dynamicParams = true;

export async function generateStaticParams() {
	/*
        Statically generate routes at build time instead of on-demand at request time.
        
        This function will:
        - get a list of all the ids for all the tickets at build time
        - Now next.js can make a page and a corresponding route for each one of them

        This is similar to getStaticProps in pages router!

        we use this function when we know we are caching data, since below we revalidate every 60 seconds
    */
	const response = await fetch('http://localhost:4000/tickets');
	const tickets = (await response.json()) as Tickets;

	return tickets.map(({ id }) => {
		return {
			id
		};
	});
}

async function getTicket(id: string) {
	const response = await fetch('http://localhost:4000/tickets/' + id, {
		next: {
			revalidate: 60 // 60 seconds
		}
	});

	if (!response.ok) {
		// Returns a 404 page
		notFound();
	}

	const data = (await response.json()) as Ticket;

	return data;
}

async function TicketDetail({ params }: { params: { id: string } }) {
	const id = params.id;
	const ticket = await getTicket(id);

	return (
		<main>
			<nav>
				<h2>Ticket Detail</h2>
			</nav>

			<div className='card'>
				<h3>{ticket.title}</h3>
				<small>Created by {ticket.user_email}</small>
				<p>{ticket.body}</p>
				<div className={`pill ${ticket.priority}`}>
					{ticket.priority} priority
				</div>
			</div>
		</main>
	);
}

export default TicketDetail;
