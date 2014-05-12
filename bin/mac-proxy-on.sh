echo "set wifi proxy to localhost:9001"
networksetup -setwebproxy wi-fi localhost 9001
echo "turning on proxy..."
networksetup -setwebproxystate wi-fi on
echo "done"