
#!/bin/bash
. ./server/index.js
echo "restart here2"
echo $api
curl -n -X DELETE https://api.heroku.com/apps/consumer-e-newsletter/dynos \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.heroku+json; version=3"
  -H "Authorization: Bearer ${api}"