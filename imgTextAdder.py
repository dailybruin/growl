# from PIL import Image
# from PIL import ImageFont
# from PIL import ImageDraw 

# img = Image.open("sample_in.jpg")
# draw = ImageDraw.Draw(img)
# # font = ImageFont.truetype(<font-file>, <font-size>)
# font = ImageFont.truetype("sans-serif.ttf", 16)
# # draw.text((x, y),"Sample Text",(r,g,b))
# draw.text((0, 0),"Sample Text",(255,255,255),font=font)
# img.save('sample-out.jpg')

import webapp2


class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers["Content-Type"] = "text/html"
        self.response.write("""
          <html>
            <head><title>Enter your name...</title></head>
            <body>
              <form action="/welcome" method="post">
                <input type="text" name="my_name"><br>
                <input type="submit" value="Sign In">
              </form>
            </body>
            </html>""")

routes = [('/', MainPage)]

my_app = webapp2.WSGIApplication(routes, debug=True)