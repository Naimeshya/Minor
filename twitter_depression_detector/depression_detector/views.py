from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser,FileUploadParser,FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .tweets import *
from .preprocessing import *
from .cleaning import *
from tensorflow.keras.models import load_model
from textblob import TextBlob

class Twitter(APIView):
    def post(self, request):
        username=request.POST['username']
        tweet_df=tweet_extractor(username)


        #es=processing_tweets(tweet_df)
        cleaned=cleaning(tweet_df)
        
        #print(cleaned)
        
        #new_model=load_model('/home/deepak/Desktop/Detecting-Depression-in-Social-Media-via-Twitter-Usage/twitter_depression_detector/depression_detector/twitter_model.h5')
        #labels_pred=new_model.predict(res)
        pos=[]
        neutal=[]
        neg=[]
        negative=[]
        final_res=[]
        for iterator ,tweet in enumerate(cleaned):
            score=TextBlob(tweet).sentiment.polarity
            if score==0:
                neutal.append(tweet_df.iloc[iterator])
            elif score > 0:
                 pos.append(tweet_df.iloc[iterator])
            else:
                neg.append(tweet_df.iloc[iterator])
                negative.append(tweet)  

        final_res.append(pos)
        final_res.append(neg)
        final_res.append(neutal)       
           
        depress=[]
        if(len(negative)>0) :
            res=processing_tweets(negative)
            new_model=load_model('/home/deepak/Desktop/Detecting-Depression-in-Social-Media-via-Twitter-Usage/twitter_depression_detector/depression_detector/twitter_model.h5')
            labels_pred=new_model.predict(res)
            pred_arr=np.round(labels_pred)
            
            print(pred_arr)
            for tweets,depr  in zip(neg,pred_arr):
                if depr ==1:
                    depress.append(tweets)  
        final_res.append(depress)



        
            

        #analysis = TextBlob(cleaned).sentiment
        

        #print(labels_pred)
        print(negative)
        


        return Response(final_res,status=status.HTTP_201_CREATED)
