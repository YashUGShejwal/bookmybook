import re
from flask import Flask
from flask import request,jsonify
from scipy import spatial
import pandas as pd
import numpy as np
import os
from pathlib import Path
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

def cosinesimilarity(unread,mainkeywords):
  #flask api post handle
  for i in unread.index:
    l1=unread.loc[i,'keywords'].split(',')
    # print("l1: ",l1)
    allkeywords=set(l1)
    # print("all keys",allkeywords)
    allkeywords=allkeywords.union(set(mainkeywords))
    allkeywordsF=pd.DataFrame({
        "kw":list(allkeywords)
    })

    print("here",allkeywordsF)
    for m in allkeywordsF.index:
      if allkeywordsF.loc[m,'kw'] in mainkeywords:
        allkeywordsF.loc[m,'main']=1
      else:
        allkeywordsF.loc[m,'main']=0
      if allkeywordsF.loc[m,'kw'] in l1:
        allkeywordsF.loc[m,'bookkw']=1
      else:
        allkeywordsF.loc[m,'bookkw']=0
    # print(allkeywordsF)
    #a b c
    #x y
    #a b c x y
    #1 1 1 0 0 
    #0 0 0 1 1
    unread.loc[i,'similarity']=spatial.distance.cosine(allkeywordsF['main'],allkeywordsF['bookkw'])
  print(unread)
  final=unread.sort_values(by=['similarity'])
  print(final)
  return list(final['ISBN'])

def vector_space(history,unread):
  #api for getting average rating for unrated books in history
  keywordset=set()
  for i in pd.concat([history['keywords'],unread['keywords']]):
    l=i.split(',')
    keywordset=keywordset.union(set(l))
  print(keywordset)
  token=pd.DataFrame({
      "ISBN":[i for i in history['ISBN']],
      "rating":[i for i in history['ratings']]
  })

  for rowid in token.index:
    k=history.loc[rowid,'keywords'].split(',')
    for keywrd in keywordset:
      if keywrd in k:
        token.loc[rowid,keywrd]=1
      else:
        token.loc[rowid,keywrd]=0
  print(token)

  for i in token.index:
    rate=token.loc[i,'rating']
    for j in range(2,token.shape[1]):
      token.iloc[i,j]=rate*token.iloc[i,j]
    # print(token.iloc[i,j])
  userinterest=token.sum(axis=0)
  userinterest=userinterest.drop(labels=['rating'])

  print(userinterest)
  map=pd.DataFrame({
    "ISBN":[i for i in unread['ISBN']]
  })
  for rowid in map.index:
    k=unread.loc[rowid,'keywords'].split(',')
    for keywrd in keywordset:
      if keywrd in k:
        map.loc[rowid,keywrd]=1
      else:
        map.loc[rowid,keywrd]=0
  
  # map1=pd.concat([map,userinterest.to_frame().T],axis=0)
  map1=map
  # print("final map\n",map1)

  userinterest1=userinterest.to_frame().T
  print("userinterest1\n",userinterest1)
  for s in map1.index:
    for col in map1:
      # print("now see ",map1.loc[s,col])
      if(col!="ISBN"):
        map1.loc[s,col]=(map1.loc[s,col])*((userinterest1.loc[0,col]))
  # print("map is here \n",map1)
  for g in map1.index:
    map1.loc[g,'cummulative']=map1.iloc[g,1:].sum()
  # print("map is here \n",map1)
  mapfin=map1.sort_values(by=['cummulative'],ascending=False)
  print("map is here \n",mapfin)
  return list(mapfin['ISBN'])

def knnalgo(history,unread):
  keywordset=set()
  for i in pd.concat([history['keywords'],unread['keywords']]):
    l=i.split(',')
    keywordset=keywordset.union(set(l))
    # print(keywordset)
  token=pd.DataFrame({
    "ISBN":[i for i in history['ISBN']],
    "rating":[i for i in history['ratings']]
  })
  
  for rowid in token.index:
    k=history.loc[rowid,'keywords'].split(',')
    for keywrd in keywordset:
      if keywrd in k:
        token.loc[rowid,keywrd]=1
      else:
        token.loc[rowid,keywrd]=0
  print(token)
  books2rec=pd.DataFrame({
    "ISBN":[i for i in unread['ISBN']],
  })
  for rowid in books2rec.index:
    k=unread.loc[rowid,'keywords'].split(',')
    for keywrd in keywordset:
      if keywrd in k:
        books2rec.loc[rowid,keywrd]=1
      else:
        books2rec.loc[rowid,keywrd]=0
  token2=token
  #a b c d
  #1 0 1 1
  #0 1 0 0
  #1 0 1 0
  #1 0 1 0
  xtrain,xtest,ytrain,ytest=train_test_split(token.iloc[:,2:],token.iloc[:,1])
  knninit=KNeighborsClassifier(n_neighbors=int(xtrain.shape[0]**0.5))
  # print("ytrain",list(ytrain))
  # labelencoder=LabelEncoder()
  featuredict={0:'A',0.5:'B',1:'C',1.5:'D',2:'E',2.5:'F',3:'E',3.5:'G',4:'H',4.5:'I',5:'J'}
  for m in xtrain:
    xtrain[m]=pd.Categorical(xtrain[m])
  ytrain=ytrain.fillna(0)
  print(ytrain)
  for m in ytrain.index:
    ytrain.loc[m]=featuredict[ytrain.loc[m]]
    # print(ytrain.loc[m])
    # ytrain[m]=pd.Categorical(ytrain[m])
  print(xtrain.dtypes)
  print(ytrain.dtypes)
  knninit.fit(xtrain,ytrain)
  # print("books2rec ",books2rec)
  for m in books2rec:
    books2rec[m]=pd.Categorical(books2rec[m])
  predictions=knninit.predict(books2rec.iloc[:,1:])
  print("predictions ",predictions)
  actualpredictions=[]
  for o in predictions:
    z={s for s in featuredict if featuredict[s]==o}
    # print("z here ",z.pop())
    actualpredictions.append(z.pop())
  print("actualpredictions ",actualpredictions)
  pred=pd.DataFrame({
      'predictions':actualpredictions
  })
  final=pd.concat([books2rec,pred],axis=1)
  print(final)
  final=final.sort_values(by=['predictions'],ascending=[False])
  print(final)
  return list(final['ISBN'])

@app.route("/initrecommend/",methods=['POST'])
def home():
  if(request.method=='POST'):
    userid=str(request.json['userid'])
    keywords=request.json['keywords']
    pathstr1="unreaduploads/unread-"+userid+".csv"
    pathstr2="historyuploads/history-"+userid+".csv"
    # path = Path(__file__).parent / pathstr
    # with path.open() as unread:
    if(os.path.exists(os.path.join(os.path.dirname(__file__),pathstr2))):
        unread=pd.read_csv(os.path.join(os.path.dirname(__file__),pathstr1))
        history=pd.read_csv(os.path.join(os.path.dirname(__file__),pathstr2))
        if history.shape[0]<20:
            print("vector space method")
            recisbns=vector_space(history,unread)
        else:
            print("knn method")
            recisbns=knnalgo(history,unread)
    else:
        print("cosine method")
        unread=pd.read_csv(os.path.join(os.path.dirname(__file__),pathstr1))
        recisbns=cosinesimilarity(unread,keywords)
    # print("here ",os.path.dirname(__file__))       
   
    
    print(recisbns)
    return jsonify({"recommendedisbns":recisbns})

# @app.route("/recommendlessthreadshodl/",methods=['POST'])
# def home():
#   if(request.method=='POST'):
#     userid=request.json['userid']
#     # with
#     return "hi"

app.run()