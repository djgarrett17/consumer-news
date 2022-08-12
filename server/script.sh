
#!/bin/bash
echo "Stay Home"
source ./server/test.txt
echo $content
echo $contentTitle
echo $singlestring
echo $landingLink
echo $forwardSlash

sed -e "s/\${content}/$content/" -e "s/\${contentTitle}/$contentTitle/" -e "s/\${landingLink}/$landingLink/" -e "s/\${image}/$animal/" -e "s/\${single}/$singlestring/g" -e "s%\${forwardSlash}%$forwardSlash%g" ./server/consumer.txt > ./server/consumer-1.txt
