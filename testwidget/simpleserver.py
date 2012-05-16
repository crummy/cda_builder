import string, cgi, time, json, pickle
from os import curdir, sep
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
#import pri

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
def uploadPKL( self ):
    length = int(self.headers['content-length'])
    content = self.rfile.read(length)
    print "post content: %s" % (content)
    try:
        pickledata = pickle.loads(content)
        jsondata = json.dump(pickledata)
        body = jsondata
    except ValueError:
        body = "Failure."
    self.send_response(200)
    self.send_header("Content-type", "text/html")
    self.send_header("Content-length", str(len(body)))
    self.end_headers()
    self.wfile.write(body)
    return
def saveJSON( self ):
    length = int(self.headers['content-length'])
    content = self.rfile.read(length)
    print "post content: %s" % (content)
    try:
        jsondata = json.loads(content)
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