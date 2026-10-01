import math, itertools
# order, name, type(ad/org), rating, reviews, lat, lng, address, hours_close, domain
rows = [
 (1,"O'Keefe Built Inc","AD",5.0,33,39.507893,-104.759541,"11479 S Pine Dr (Parker)","5 PM","okeefebuilt.com"),
 (2,"Freedom Deck Builders (Castle Rock GBP)","AD",5.0,13,39.368966,-104.810543,"4966 E Barrington Ave (Castle Rock)","6 PM","freedomdeckbuilders.com"),
 (3,"Colorado Deck and Landscape","ORG",4.6,81,39.6546272,-104.8111055,"15200 E Girard Ave #4025 (Aurora)","4:30 PM","coloradodeck.com"),
 (4,"Top Rank Outdoor Living","ORG",5.0,20,39.6721905,-104.799499,"(hidden/SAB)","5 PM","toprankdeck.com"),
 (5,"Colorado Elite Outdoor Contractors","ORG",4.6,40,39.6648792,-104.789252,"2813 S Pagosa St (Aurora)","7 PM","coloradoeliteoutdoor.com"),
 (6,"Denver Deck Builders #1","ORG",5.0,82,39.5741995,-104.8787683,"9300 E Mineral Ave (Centennial)","24h","denverdeckbuilder.com"),
 (7,"Trusted Local Handyman Services","ORG",4.8,13,28.42365,-81.6999339,"(hidden) FLORIDA","8 PM","handyrex.com"),
 (8,"Denver Deck Builders #2","ORG",4.6,91,39.5355462,-104.7096656,"11915 Bell Cross Way (Parker)","24h","denverdeckbuilder.com"),
 (9,"5280 Outdoor Designs","ORG",4.8,34,39.6124673,-104.7259407,"22392 E Dorado Dr (Aurora)","5 PM","5280outdoordesigns.com"),
 (10,"Custom Decks","ORG",4.4,86,39.5890011,-104.8731,"7045 S Fulton St #240 (Centennial)","5 PM","newcustomdecks.com"),
 (11,"Mosaic Outdoor Living","ORG",4.9,91,39.5704112,-104.8610146,"14 Inverness Dr E B-112 (Englewood)","5 PM","coloradodecks.com"),
 (12,"Grand View Deck & Patio","ORG",5.0,8,39.5703186,-104.8809154,"8085 S Chester St 250 (Englewood)","7 PM","grandviewdecks.com"),
 (13,"Silver Rock Builders Ltd","ORG",3.6,5,39.6604918,-104.7467064,"20604 E Doane Pl (Aurora)","5 PM","silverrockbuilds.com"),
 (14,"Denver Deck Builders #3","ORG",5.0,43,39.5156522,-104.9084315,"1054 McArthur Dr (Highlands Ranch?)","24h","denverdeckbuilder.com"),
 (15,"Amazing Underdeck","ORG",5.0,30,39.5991452,-104.8614601,"10949 E Peakview Ave (Englewood)","7 PM","amazingunderdeck.com"),
 (16,"Parker Decks","ORG",5.0,2,39.5313813,-104.767608,"10233 S Parker Rd (Parker)","8 PM","parkerdecks.com"),
 (17,"Denver Decks","ORG",4.9,44,39.495022,-104.730082,"22324 E Hidden Trail Dr (Parker)","5 PM","denverdecks.com"),
 (18,"Global Cooperation LLC","ORG",5.0,61,39.5570859,-104.7217558,"8762 S Wenatchee Ct (Aurora)","5 PM","globalcooperation.us"),
 (19,"HAKA DECKS","ORG",5.0,90,39.5869015,-104.8767348,"9707 E Easter Ln (Centennial)","6 PM","hakadecks.com"),
 (20,"All Pro Thornton Deck Builders","ORG",4.8,16,38.946705,-113.327145,"(hidden) UTAH","7 PM","thorntoncodeckbuilders.com"),
 (21,"Decktopia","ORG",3.6,17,39.4050596,-104.9328559,"(hidden) Sedalia/Castle Rock","8 PM","decktopiallc.com"),
 (22,"Front Range Builders","ORG",4.0,17,39.5314585,-104.7700976,"10235 S Progress Way (Parker)","5 PM","frbpros.com"),
]
def hav(a,b,c,d):
    R=3958.8; p1,p2=math.radians(a),math.radians(c); dp=p2-p1; dl=math.radians(d-b)
    return 2*R*math.asin(math.sqrt(math.sin(dp/2)**2+math.cos(p1)*math.cos(p2)*math.sin(dl/2)**2))
HAKA=(39.5869015,-104.8767348)
local=[r for r in rows if r[2]=="ORG" and r[5]>39 and r[6]<-104]
# brute-force the map center that best explains organic order (min sum of rank-weighted distance)
best=None
for lat in [39.45+0.01*i for i in range(30)]:
  for lng in [-105.0+0.01*j for j in range(35)]:
    # Spearman between organic rank and distance
    ds=[(r[0],hav(lat,lng,r[5],r[6])) for r in local]
    ranks=sorted(ds,key=lambda x:x[1]); pos={o:i for i,(o,_) in enumerate(ranks)}
    n=len(ds); d2=sum((i-pos[o])**2 for i,(o,_) in enumerate(ds))
    rho=1-6*d2/(n*(n*n-1))
    if best is None or rho>best[0]: best=(rho,lat,lng)
print("best-fit center for organic order: rho=%.2f at %.2f,%.2f"%best)
print("\n%-3s %-40s %-4s %4s %4s %7s %7s  %-6s %s"%("#","name","type","★","revs","mi→Haka","mi→fit","close","address"))
for r in rows:
    dh=hav(HAKA[0],HAKA[1],r[5],r[6]); df=hav(best[1],best[2],r[5],r[6])
    print("%-3d %-40s %-4s %4.1f %4d %7.1f %7.1f  %-6s %s"%(r[0],r[1],r[2],r[3],r[4],dh,df,r[8],r[7]))
print("\nreview-count rank among organic local:", sorted([(r[4],r[3],r[1]) for r in local],reverse=True)[:8])
