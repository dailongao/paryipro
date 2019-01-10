import urllib, json
import apikey
paryipro = \
[ \
        "UCH0ObmokE-zUOeihkKwWySA", #Shiori
        "UCWCc8tO-uUl_7SJXIKJACMw", #Mea
        "UCn14Z641OthNps7vppBvZFA", #Hana
        "UChN7P9OhRltW3w9IesC92PA", #Miu
        "UCL9dLCVvHyMiqjp2RDgowqQ", #Ritsu
        "UCIaC5td9nGG6JeKllWLwFLA", #Mana
        "UCRXBTd80F5IIWWY4HatJ5Ug", #Serena
]

ret = []

for channel in paryipro:
    url = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + channel + "&eventType=live&type=video&key=" + apikey.getkey()
    print(url)
    response = urllib.urlopen(url)
    data = json.loads(response.read())
    if len(data["items"]) > 0:
        ret.append(data["items"][0]["id"]["videoId"])

f = open("paryi.pro", "w")
f.write(json.dumps(ret))
