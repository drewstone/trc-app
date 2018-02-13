#!/bin/bash
#
#	This command will zip up the contents of this project, and place the zip file on the Desktop
#
LOCATION=.
PROJECT=truecoin

# Find the next version number
cnt=1
while true ; do
	filename=${LOCATION}/${PROJECT}-${cnt}.zip
	[ ! -r ${filename} ] && break;
	cnt=`expr $cnt + 1`
done
echo Creating file ${filename}

# Now zip up the file
zip -r -X ${filename} \
	.ebextensions/ \
	.elasticbeanstalk/ \
	_certs \
	package.json \
  config/ \
	public/ \
	scripts/ \
	src/
status=$?

# Exit with the same status as the zip command
exit $status
