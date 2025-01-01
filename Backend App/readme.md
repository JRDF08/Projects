Project Name: SoundScape

Description: Overview: Soundscape is a music app that offers users a seamless login experience and access to a diverse songs. Users can explore, play, and manage their tracks with intuitive playback controls.

Usage: Register -> Login -> MusicPlayer -> Add Song -> Delete Song -> Edit Song -> Logout

Endpoints:

GET: /auth/list = list all users
POST: /auth/register = user registration
POST: /auth/login = user login
DELETE: /auth/logout = user logout

PATCH: /track/soft-delete/:title = song soft deletion
DELETE: /track/delete/:title = song deletion
PUT: /track/update/:title = song update
POST: /track/upload = song upload

GET: /musicplayer/list = list song excluding soft deleted
GET: /musicplayer/listAll = list all song

created and implemented by: John Rey Fernandez https://www.linkedin.com/in/jrdf/
