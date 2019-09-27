## API
This is the stacket.io API that serves content via GraphQL protocol. Its initial focus is to work as a monolith for collating services together, however this will move towards more of a gateway function for microservices over time as functionality is split up.

### Environmental variables
```
ENVIRONMENT:    {production|development|test}
MONGO_URL:      {uri, defaults to localhost:27017 with development environment}
CORS_DOMAIN:    {defaults to * in development}
```

### Connecting to the production database
```
Address:    api.stacket.io:20017
Database:   api_prod
Username:   api-prod
Password:   <fetch from connection uri>
```

