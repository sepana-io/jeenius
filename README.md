# Jeenius
Every day we discuss and debate. Climate change. War. Politics. Religion. 
Health. And everything else under the sun. 

Your uncle tells you Covid was a hoax. Your co-worker says socialism sucks. 
Your sister tells you capitalism sucks. Your best friend supports Ukraine. Your 
piano teacher supports Russia. Did the US respond correctly to the Chinese 
spy balloons? Does Israel’s Supreme Court have too much power? And a 
million more questions.

Whatsapps, Facebook, Twitter – and every other platform – are filled with 
humans’ favourite past-time. Discussion. 

Yet too often these conversations get heated. Too often we stop talking. One 
thing is certain: all of us wish we knew more. Wish we had a better command
of the facts. Wish we could put our finger on exactly what we think and why.

Jeenius is a superpower unlike anything you’ve ever experienced. What if 
with the push of a button you could:
- Think like Socrates
- Argue like Plato
- Cite like Wikipedia
- Empathize like Jesus
- And summarize like ChatGPT

Simply install Jeenius’ browser extension and 100X your ability to think and 
discuss. ChatGPT meets hive-mind. Expert network meet your friend network.
The power of the Internet at your fingertips. 

**Instant context.** 
**Supreme understanding.** 
**Brilliant discussions.** 

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