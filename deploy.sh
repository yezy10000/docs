#!/bin/bash
# easywechat.org builder.
# @author overtrue <anzhengchao@gmail.com>
#
body='{
"request": {
    "message": "Update docs (triggered by easywechat/docs).",
    "branch":"master"
  }
}'

curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Travis-API-Version: 3" \
  -H "Authorization: token ${ACCESS_TOKEN}" \
  -d "$body" \
  https://api.travis-ci.org/repo/meolu/site/requests