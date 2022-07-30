# GenesisEmailSubscription

## Run
Just run `docker-compose up` in terminal.

## Notes
- subscriptionRepository.emailAlreadySubscribed - for performance it is better to read a few lines at a time, but not the whole file, as it may be too large.
- subscriptionService.subscribeEmail - function was written in synchronous way to prevent two simultaneous savings of one email address (check and save email transaction)

P.S. </br>
.env file was provided only for easier testing and shouldn't be provided in other cases
