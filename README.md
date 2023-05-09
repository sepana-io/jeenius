# Jeenius

Jeenius is a browser extension that uses ChatGPT to help humanity have better discussions. Too often, conversations (especially on Twitter) get heated. Too often, we stop talking. Most of us don't have the time to delve deep enough into complex issue to have a full picture. Simply install Jeenius, click the lime green Jeenius button on any tweet and you'll be able to: see counterarguments, poll your friends or ask an expert. The counterarguments produced by ChatGPT are intended to provide you additional context -- a window into how others might see the same issue from a different perspective. Polling your friends and asking experts are additional layers of insight to give you the fullest possible understanding. Jeenius is for people with radically open minds who want to seek truth -- no matter where it leads them.

# Demo
https://youtu.be/odnOULoHrPo

# Installation
1. Video tutorial for running chrome extension https://youtu.be/mOA8yJFefXw
4. Back-end app can be run same way any next.js app is run by installing dependencies using `npm install` and starting the app using `npm start`. If you don't want to run the app yourself here is the jeenius back-end app up and running https://jeenius-backend.vercel.app

# Technical details
Jeenius environment consists of two connected applications. 

1. **Chrome extension**, serving as a client UI
2. A **next.js app** serving as a server for the extension

The extension offers three major features to its users:
1. Access Counterarguments:
Users can request counterarguments for any Twitter post. Upon clicking the button, a request is sent to the server, which then connects to the ChatGPT API and retrieves several popular counterarguments.

2. Consult Experts:
Users can request a list of experts. The server sends a list of 50 expert accounts across various fields to ChatGPT as input. Each expert's record includes their field of expertise and a brief description of their work. ChatGPT selects the top 3 most suitable experts to address the topic in the Twitter post, and the user can then visit the expert's Twitter profile to connect with them.

3. Create a Poll (In Development):
This feature aims to allow users to create a WhatsApp poll for discussions and invite participants. However, it is currently under development and only allows users to share the Twitter post on WhatsApp for now.
