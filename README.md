# sms-integration

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.7.6.
## Purpose
This project sends a randomly generated OTP to a client for verfication purposes.
The messaging server used is twilio and the project itself is built using MEAN stack.
There is alist of 8 users in a temprory JSON and messages stored are maintained inside them, so the sms list resets when refreshing the page.
There are 3 pages currently:
	1.Landing Page:	-shows list of all users
					-on clicking any user details are shown
	2.Send SMS Page	-Sends message with a randomly generated 6 digit OTP
					-Shows list of sms sent by that user in descending order of time (newest first)
	3.View All Page	-Shows all sms sent to all the users
	
## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

