# DevTinder APIS

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRoouter

- GET /profile/view
- PATCH /profile/edit
- PATCh /profile/password

## connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you profile of other users on platform

Status - interested,ignored,accepted,rejected
