#!/usr/bin/env python
# -*- coding: UTF-8 -*-
import os

# 현재 디렉토리부터 모든 하위디렉토리의 디렉토리와 파일을 보여준다.
for dirname, dirnames, filenames in os.walk('../..'):
	# print dirname
	for subdirname in dirnames:
		name = os.path.join(dirname, subdirname)
		print name
	for filename in filenames:
		print os.path.join(dirname, filename)

print 'walk done.'
