
Overview
--------

This project was started as an experiment in a few new technologies. These being:
  - node.js
  - Websockets
  - HTML5 Canvas

As users connect to the page, they can draw in the area given. When one user draws, their actions are broadcast to any other user viewing/drawing on that particular board.

Detail wise, each user gets a canvas DOM element assigned to them on each clients browser. This is done because a single HTML5 canvas element can only have a single context, and trying to simultaneously draw the actions of multiple users within a single context results in very poor results and also might just be kinda impossible to do well. As a result, it is currently implemented with a canvas per user.

Prepare
-------

1. install [node.js](https://nodejs.org/en/download/)
2. install dependencies

```
npm install
```

Run
----

1.
```
node app.js
```

2. open following url with web browser

```
http://<IPADDRESS_OR_HOSTNAME>:3000/
```

3. let's draw!


Future work
-----------

The drawing seems fairly smooth with a couple of users at once, but I have no idea what would happen with a lot of users yet. Moving forward, some ideas are:

  - add users as an actual model on the server.
  - allow users to create/join new rooms to start a new whiteboard session in.
  - allow board owners to clear the board for all users.
  - better/more drawing controls
  - allow users to view multiple boards being drawn at once.

References
----------

* [cyrusinnovation/whiteboard](https://github.com/cyrusinnovation/whiteboard)
  * original source

----
Takashi Masuyama < mamewotoko@gmail.com >  
http://mamewo.ddo.jp
