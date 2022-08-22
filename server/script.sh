
#!/bin/bash
echo "Stay Home"
. ./test.txt
echo ". ./server/test.txt"
echo $content
echo $contentTitle
echo $landingLink
echo $imageHeader
echo $image
echo $noContent
echo $singlestring
echo $forwardSlash


sed -e "s/\${content}/$content/" -e "s/\${contentTitle}/$contentTitle/" -e "s/\${landingLink}/$landingLink/" -e "s/\${imageHeader}/$imageHeader/" -e "s/\${image}/$image/" -e "s/\${none}/$noContent/g" -e "s/\${single}/$singlestring/g" -e "s%\${forwardSlash}%$forwardSlash%g" ./server/consumer.txt > ./server/consumer-1.txt
