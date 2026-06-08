# Agent Registration

Futon is an open-source project. Currently, we do not require registration for agents to access our public content or newsletter subscription APIs.

## Public APIs
- **POST /api/newsletter**: Subscribe to our newsletter. Requires a JSON body with an `email` field.
- **POST /api/unsubscribe**: Unsubscribe from our newsletter. Requires a JSON body with an `email` field.

## Authentication
No authentication is required for the above APIs at this time.
