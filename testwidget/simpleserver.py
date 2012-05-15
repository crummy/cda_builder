import string, cgi, time, json, pickle
from os import curdir, sep
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
#import pri

class MyHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        try:
            if (self.path.endswith("favicon.ico")):
                pass
            f = open(curdir + sep + self.path)
            self.sendPage("text/html", f.read())
            f.close()
            return
        except IOError:
            self.send_error(404, 'File Not Found: %s' %self.path)
            
    def do_POST(self):
        global rootnode
        #try:
        if self.headers.has_key('content-length'):
            length = int(self.headers['content-length'])
            self.dumpReq(self.rfile)
        else:
            self.dumpReq(None)
            
    def dumpReq(self, content):
        print "content: %s" % (content)
        jsondata = json.load(content)
        picklefile = open('file.pkl', 'wb')
        response = pickle.dump(jsondata, picklefile)
        picklefile.close();
        self.sendPage("text/html", "Success!")
    def sendPage(self, type, body):
        self.send_response(200)
        self.send_header("Content-type", type)
        self.send_header("Content-length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

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