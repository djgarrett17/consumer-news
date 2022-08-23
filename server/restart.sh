
#!/bin/bash
echo "restart here2"
echo $HEROKU_API_KEY
curl -n -X DELETE https://api.heroku.com/apps/consumer-e-newsletter/dynos \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.heroku+json; version=3" \
  -H "Authorization: Bearer $HEROKU_API_KEY"