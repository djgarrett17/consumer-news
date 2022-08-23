
#!/usr/local/bin/heroku
echo "restart here2"
curl -n -X DELETE https://api.heroku.com/apps/consumer-e-newsletter/dynos \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.heroku+json; version=3"