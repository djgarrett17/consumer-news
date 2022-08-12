
#!/bin/bash
echo "Stay Home"
source ./server/test.txt
echo $content
echo $contentTitle
echo $singlestring
number=2
animal=dog
sed -e "s/\${content}/$content/" -e "s/\${contentTitle}/$contentTitle/" -e "s/\${landingLink}/$animal/" -e "s/\${image}/$animal/" -e "s/\${single}/$singlestring/g" ./server/consumer.txt > ./server/consumer-1.txt
