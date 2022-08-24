
#!/bin/bash
echo "Stay Home"
. ./server/test.txt
echo ". ./server/test.txt"
echo $content
echo $contentTitle
echo $landingLink
echo $imageHeader
echo $image
echo $noContent
echo $singlestring
echo $semicolon
echo $backslash
echo $forwardSlash


sed -e "s/\${content}/$content/" -e "s/\${contentTitle}/$contentTitle/" -e "s/\${landingLink}/$landingLink/" -e "s/\${imageHeader}/$imageHeader/" -e "s/\${image}/$image/" -e "s/\${none}/$noContent/g" -e "s/\${semicolon}/$semicolon/g" -e "s/\${single}/$singlestring/g" -e "s/\${backslash}/$backslash/g" -e "s%\${forwardSlash}%$forwardSlash%g" ./server/consumer.txt > ./server/consumer-1.txt
