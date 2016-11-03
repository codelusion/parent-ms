fakems
-------
A fake microservice that provides a json response `{ "queued": 10}`  to a `/health` health check. 

The service will increment the "queued" value by 10 each time the health check is performed until 50, then reduce by 10 until 0. This is to simulate a queue system where jobs are added, processed and removed from the queue. Based on the queued value, a lambda function will register or de-register each microservice instance from a load balancer in an auto scaling group...

To run:
`node server.js`