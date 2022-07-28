
class SubscriptionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SubscriptionError';
    }
}

class EmailAlreadySubscribedError extends SubscriptionError {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadySubscribedError';
    }
}

class ValidationError extends SubscriptionError {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

module.exports = {
    SubscriptionError,
    EmailAlreadySubscribedError,
    ValidationError,
}
