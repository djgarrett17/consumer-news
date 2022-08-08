
#!/bin/bash
echo "Stay Home"
source ./server/test.txt
echo $test
number=2
animal=dog
sed -e "s/\${i}/$test/" -e "s/\${word}/$animal/" ./server/consumer.txt > ./server/consumer-1.txt
