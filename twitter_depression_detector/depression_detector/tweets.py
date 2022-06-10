import tweepy
from textblob import TextBlob
#from wordcloud import WordCloud
import pandas as pd
import numpy as np
import re


consumerKey = "H7hYjYUu0Us7WoQ3ny9VcckFY"
consumerSecret = "xEZkgfAM6wwD5AyJb0pi2RXbsJ2mxW9p4uRmHvqWocBwLWjU4h"
accessToken = "1386968214710587394-XsJhR3PdtSdmxhBkT6bRFjxTwXO0Z6"
accessTokenSecret = "PddXM0pUMHiSGAfE1QhWsFotWcKMwGcRm7iAe6lmjVy2W"

# Create the authentication object
def tweet_extractor(username):
    authenticate = tweepy.OAuthHandler(consumerKey, consumerSecret) 
        
    # Set the access token and access token secret
    authenticate.set_access_token(accessToken, accessTokenSecret) 
        
    # Creating the API object while passing in auth information
    api = tweepy.API(authenticate, wait_on_rate_limit = True)

    # Extract 100 tweets from the twitter user
    posts = api.user_timeline(screen_name=username, count = 100, lang ="en", tweet_mode="extended")


    print("Show the 100 rlatest tweets:\n")
    i=1
    for tweet in posts[:100]:
        print(str(i) +') '+ tweet.full_text + '\n')
        i= i+1

    df = pd.DataFrame([tweet.full_text for tweet in posts], columns=['Tweets'])
    df.head()




    # Clean the tweets
    

    # Show the cleaned tweets
    return df