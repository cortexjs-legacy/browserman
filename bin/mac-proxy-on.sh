echo "set wifi proxy to browserman.dp:9001"
networksetup -setwebproxy wi-fi browserman.dp 9001
echo "turning on proxy..."
networksetup -setwebproxystate wi-fi on
echo "done"