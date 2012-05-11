# TASK: Given a JSON object, export to pickle file.

import pickle
import json

# http://www.saltycrane.com/blog/2008/01/saving-python-dict-to-file-using-pickle/
# given a json object
jsondata = open('file.json')
data = json.load(jsondata)
print data['glossary']['title']
picklefile = open('file.pkl', 'wb')
pickle.dump(data, picklefile)
jsondata.close()
picklefile.close()


#pickledict;
# build a python dictionary of each key+value pair
#picklefile = open('filename.pkl', 'wb') # how do we choose a filename?
#pickle.dump(pickledict, picklefile)
#picklefile.close()