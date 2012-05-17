import string, cgi, time, json, pickle
from os import curdir, sep
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer

class MyHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        try:
            if (self.path.endswith("favicon.ico")):
                return
            f = open(curdir + sep + self.path)
            body = f.read()
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.send_header("Content-length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            f.close()
            return
        except IOError:
            self.send_error(404, 'File Not Found: %s' %self.path)
            
    def do_POST(self):
        if self.path.endswith("upload"):
            uploadPKL(self)
        elif self.path.endswith("savepkl"):
            saveJSON(self)
        else:
            body = "Unrecognized POST request"
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.send_header("Content-length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
def uploadPKL( self ): # given a pickle file, return JSON data
    form = cgi.FieldStorage(fp=self.rfile, headers=self.headers, environ={'REQUEST_METHOD':'POST', 'CONTENT_TYPE':self.headers['Content-Type'], })
    content = form['pkl'].value
    try:
        pickledata = pickle.loads(content)
        jsondata = json.dumps(pickledata)
        body = jsondata
    except:
        body = "Failure."
    self.send_response(200)
    self.send_header("Content-type", "text/html")
    self.send_header("Content-length", str(len(body)))
    self.end_headers()
    self.wfile.write(body)
    return
def saveJSON( self ): # save JSON to PKL
    length = int(self.headers['content-length'])
    print "loading %sb of json data..." % (length)
    content = self.rfile.read(length)
    try:
        jsondata = json.loads(content)
        print "jsondata: %s" % (jsondata)
        picklefile = open('clinic.pkl', 'wb')
        response = pickle.dump(jsondata, picklefile)
        print "saved to clinic.pkl"
        body = "Success!"
        picklefile.close()
    except ValueError:
        print "unable to parse JSON"
        body = "Failure."
    self.send_response(200)
    self.send_header("Content-type", "text/html")
    self.send_header("Content-length", str(len(body)))
    self.end_headers()
    self.wfile.write(body)
    return

def main():
    try:
        server = HTTPServer(('', 8000), MyHandler)
        print 'started httpserver...'
        server.serve_forever()
    except KeyboardInterrupt:
        print '^C received, shutting down server'
        server.socket.close()
        
if __name__ == '__main__':
    main()