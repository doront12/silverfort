# silverfort
silverfort datastore manager

# install
run npm i
# run app server
edit configuration using .env file
available options:<br>
HITS_THRESHOLD<br>
STRATEGY<br>
WINDOW_MS<br>
npm start ( requires tsx installed)

# upsert data
POST 127.0.0.1:3000/upsert
 <br />
body example {"key":"test","value":300}

# get data
GET 127.0.0.1:3000/get
 <br />
body example {"key":"test"}

