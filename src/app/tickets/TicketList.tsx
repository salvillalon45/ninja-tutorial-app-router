import { Tickets } from '../../types/types';
import Link from 'next/link';

/*
    When it comes to fetching data in Next.js
    - First it dedupes any fetches we made to the same source. 
        - This means that if we fetch the ticket api somewhere else in the application as well as here
        Next will only fetch the data once, then it will reuse the data it gets back whereever else we call the fetch
    - Second, it caches the response of any fetches that we made
        - so if we navigate away from the page and come back later, it uses the cache version of the data it already fetch

    To NOTE when you dont want aggressivley cache data indefinitely
    -  Dynamic data that changes frequently, 
        - for example an app like Jira where users delete, create, and update tickets.It wont help if data is cached
        - A news articles site where many articles are added per day
    - In these cases, you can ask Next.js to revalidate the cache data for a certain amount of time!
        - Revalidate means refetch and rebuild the page that uses that data

    With dynamic data
    - if the content might change every few minutes, we can revalidate every 60 seconds or less

    With static data
    - if the content only changes every other day, we can revalidate every 24 hours
*/

// Uses dynamic rendering strategy
// Page needs to be rendered at time of request since data will always be changing
async function getTickets() {
	const response = await fetch('http://localhost:4000/tickets', {
		next: {
			revalidate: 0 // use 0 to opt out of using cache
			/*
                Refetching data every time, might be slower since serving data from 
                cache is faster

            */
			/*
			    revalidate: 30
                This will take a total of 40 seconds for revalidate to work
                
                Amount of time next should wait since the last page visit before revalidating the data again, 
                - if another request for that data comes in, it will show the revalidate data
                
                Demo: Manually removing an object from the db.json
                - refresh the page to start the 30 second timer
                - then delete the second object from db.json
                - refresh the page, but still see the same data. This is 
                because the 30 seconds have not passed, so next is serving the cache data
                - the 30 seconds passed, you refresh the page, you still see the cache data. Why?
                    - because now next will work on revalidating the data, so if you wait for 10 more seconds you will see the new data
            */
			/*
                Static Rendering
                - if you make revalidation 
            */
		}
	});
	const data = (await response.json()) as Tickets;

	return data;
}

/*
    This is a server compeonent
     All the fetch logic is running on the server since this is a server component by default
     By the time the page reaches the browser, the data has already been fetched and output 
     into the template
*/
async function TicketList() {
	const tickets = await getTickets();

	return (
		<>
			{tickets.map((ticket) => {
				return (
					<div key={ticket.id} className='card my-5'>
						<Link href={`tickets/${ticket.id}`}>
							<h3>{ticket.title}</h3>
							<p>{ticket.body.slice(0, 200)}...</p>
							<div className={`pill ${ticket.priority}`}>
								{ticket.priority} priority
							</div>
						</Link>
					</div>
				);
			})}
			{tickets.length === 0 && (
				<p className='text-center'>There are no open tickets!</p>
			)}
		</>
	);
}

export default TicketList;
