https://cors-anywhere.herokuapp.com/corsdemo

tldr; Click the link above and click Request temporary access to demo server.

Inorder for the next and previous buttons to work, you must first
get access to the heroku proxy server to get around the CORs policy.

The api we are using is poorly designed since the returned URI
for the next and previous lists has the Referrer Policy set to
strict-origin-when-cross-origin
Meaning we'd have to be on that site. Cross Origin Resources are not allowed.

Therefore we need to use the a proxy server to access the resources
and get those resources from the proxy server. In this case, we will
be using the free and easy heroku cors anywhere server.
