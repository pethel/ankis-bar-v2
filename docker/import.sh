#!/usr/bin/env bash
XPCONTAINER=xp-app
XP_SU_PWD=password
PATH_TO_EXPORT=/Users/phe/Downloads/ankisBarExport

docker exec $XPCONTAINER mkdir -p enonic-xp/home/data/export
docker cp $PATH_TO_EXPORT $XPCONTAINER:/enonic-xp/home/data/export/
docker exec $XPCONTAINER /enonic-xp/toolbox/toolbox.sh import -a su:password -t cms-repo:draft:/  -s ankisBarExport
