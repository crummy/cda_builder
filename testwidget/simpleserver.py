import string, cgi, time
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
            self.dumpReq(self.rfile.read(length))
        else:
            self.dumpReq(None)
            
    def dumpReq(self, content):
        response=  "<html><body>"
        response+= "<h1>HTTP request</h1>"
        response+= "<p>self.command= <tt>%s</tt></p>" % (self.command)
        response+= "<p>self.path= <tt>%s</tt></p>" % (self.path)
        response+= "<p>self.rfile= <tt>%s</tt></p>" % (content)
        response+= "</body></html>"
        self.sendPage("text/html", response)
    def sendPage(self, type, body):
        self.send_response(200)
        self.send_header("Content-type", type)
        self.send_header("Content-length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
            
        #except:
        #    print "Failed to post: "
        #    pass

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