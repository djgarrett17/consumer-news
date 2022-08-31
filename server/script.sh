
#!/bin/bash
echo "Stay Home"
. ./server/test.txt
echo ". ./server/test.txt"
echo $content
echo $contentTitle
echo $landingLink
echo $imageHeader
echo $image
echo $phone
echo $email
echo $website
echo $noContent
echo $singlestring
echo $semicolon
echo $forwardSlash


sed -e "s/\${content}/$content/" -e "s/\${contentTitle}/$contentTitle/" -e "s/\${landingLink}/$landingLink/" -e "s/\${imageHeader}/$imageHeader/" -e "s/\${image}/$image/" -e "s/\${phoneNumber}/$phone/" -e "s/\${emailAddress}/$email/g" -e "s/\${websiteUrl}/$website/g" -e "s/\${none}/$noContent/g" -e "s/\${semicolon}/$semicolon/g" -e "s/\${single}/$singlestring/g" -e "s%\${forwardSlash}%$forwardSlash%g" ./server/consumer-2.txt > ./server/consumer-1.txt
