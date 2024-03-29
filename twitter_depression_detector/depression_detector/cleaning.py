from math import log, sqrt, exp
import pandas as pd
import numpy as np
from numpy import sign

import re
import warnings
warnings.filterwarnings("ignore")
import ftfy
#from bs4 import BeautifulSoup

from sklearn.metrics import  classification_report, confusion_matrix, accuracy_score

import nltk
nltk.download('punkt')
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import WordPunctTokenizer
tok = WordPunctTokenizer()

from keras import optimizers
from keras.models import Model, Sequential
from keras.callbacks import EarlyStopping, ModelCheckpoint
from keras.layers import Conv1D, Dense, Input, LSTM, Embedding, Dropout, Activation, MaxPooling1D
from keras.preprocessing.text import Tokenizer
from keras_preprocessing.sequence import pad_sequences

import gensim
#import word2vec
from gensim.test.utils import common_texts
from gensim.models import Word2Vec
from gensim.test.utils import get_tmpfile
from gensim.models import KeyedVectors
from gensim.test.utils import datapath



# Utility
import re
import numpy as np
import os
from collections import Counter
import logging
import time
import pickle
import itertools

def cleaning(df):

    emojies = [":‑)", ":)", ":D", ":o)", ":]", ":3", ":c)", ":>", "=]", "8)", "=)", ":}", ":^)", ":っ)", ":‑D", "8‑D", "8D", "x‑D", "xD", "X‑D", "XD", "=‑D", "=D", "=‑3", "=3", "B^D", ":-))", ">:[", ":‑(", ":(", ":‑c", ":c", ":‑<", ":っC", ":<", ":‑[", ":[", ":{", ";(", ":-||", ":@", ">:(", ":'‑(", ":'(", ":'‑)", ":')", "D:<", "D:", "D8", "D;", "D=", "DX", "v.v", "D‑':", ">:O", ":‑O", ":O", ":‑o", ":o", "8‑0", "O_O", "o‑o", "O_o", "o_O", "o_o", "O-O", ":*", ":-*", ":^*", "(", "}{'", ")", ";‑)", ";)", "*-)", "*)", ";‑]", ";]", ";D", ";^)", ":‑,", ">:P", ":‑P", ":P", "X‑P", "x‑p", "xp", "XP", ":‑p", ":p", "=p", ":‑Þ", ":Þ", ":þ", ":‑þ", ":‑b", ":b", "d:", ">:\\", ">:/", ":‑/", ":‑.", ":/", ":\\", "=/", "=\\", ":L", "=L", ":S", ">.<", ":|", ":‑|", ":$", ":‑X", ":X", ":‑#", ":#", "O:‑)", "0:‑3", "0:3", "0:‑)", "0:)", "0;^)", ">:)", ">;)", ">:‑)", "}:‑)", "}:)", "3:‑)", "3:)", "o/\o", "^5", ">_>^", "^<_<", "|;‑)", "|‑O", ":‑J", ":‑&", ":&", "#‑)", "%‑)", "%)", ":‑###..", ":###..", "<:‑|", "<*)))‑{", "><(((*>", "><>", "\o/", "*\0/*", "@}‑;‑'‑‑‑", "@>‑‑>‑‑", "~(_8^(I)", "5:‑)", "~:‑\\", "//0‑0\\\\", "*<|:‑)", "=:o]", "7:^]", ",:‑)", "</3", "<3"]




    # Expand Contraction
    cList = {
    "ain't": "am not",
    "aren't": "are not",
    "can't": "cannot",
    "can't've": "cannot have",
    "'cause": "because",
    "could've": "could have",
    "couldn't": "could not",
    "couldn't've": "could not have",
    "didn't": "did not",
    "doesn't": "does not",
    "don't": "do not",
    "hadn't": "had not",
    "hadn't've": "had not have",
    "hasn't": "has not",
    "haven't": "have not",
    "he'd": "he would",
    "he'd've": "he would have",
    "he'll": "he will",
    "he'll've": "he will have",
    "he's": "he is",
    "how'd": "how did",
    "how'd'y": "how do you",
    "how'll": "how will",
    "how's": "how is",
    "I'd": "I would",
    "I'd've": "I would have",
    "I'll": "I will",
    "I'll've": "I will have",
    "I'm": "I am",
    "I've": "I have",
    "isn't": "is not",
    "it'd": "it had",
    "it'd've": "it would have",
    "it'll": "it will",
    "it'll've": "it will have",
    "it's": "it is",
    "let's": "let us",
    "ma'am": "madam",
    "mayn't": "may not",
    "might've": "might have",
    "mightn't": "might not",
    "mightn't've": "might not have",
    "must've": "must have",
    "mustn't": "must not",
    "mustn't've": "must not have",
    "needn't": "need not",
    "needn't've": "need not have",
    "o'clock": "of the clock",
    "oughtn't": "ought not",
    "oughtn't've": "ought not have",
    "shan't": "shall not",
    "sha'n't": "shall not",
    "shan't've": "shall not have",
    "she'd": "she would",
    "she'd've": "she would have",
    "she'll": "she will",
    "she'll've": "she will have",
    "she's": "she is",
    "should've": "should have",
    "shouldn't": "should not",
    "shouldn't've": "should not have",
    "so've": "so have",
    "so's": "so is",
    "that'd": "that would",
    "that'd've": "that would have",
    "that's": "that is",
    "there'd": "there had",
    "there'd've": "there would have",
    "there's": "there is",
    "they'd": "they would",
    "they'd've": "they would have",
    "they'll": "they will",
    "they'll've": "they will have",
    "they're": "they are",
    "they've": "they have",
    "to've": "to have",
    "wasn't": "was not",
    "we'd": "we had",
    "we'd've": "we would have",
    "we'll": "we will",
    "we'll've": "we will have",
    "we're": "we are",
    "we've": "we have",
    "weren't": "were not",
    "what'll": "what will",
    "what'll've": "what will have",
    "what're": "what are",
    "what's": "what is",
    "what've": "what have",
    "when's": "when is",
    "when've": "when have",
    "where'd": "where did",
    "where's": "where is",
    "where've": "where have",
    "who'll": "who will",
    "who'll've": "who will have",
    "who's": "who is",
    "who've": "who have",
    "why's": "why is",
    "why've": "why have",
    "will've": "will have",
    "won't": "will not",
    "won't've": "will not have",
    "would've": "would have",
    "wouldn't": "would not",
    "wouldn't've": "would not have",
    "y'all": "you all",
    "y'alls": "you alls",
    "y'all'd": "you all would",
    "y'all'd've": "you all would have",
    "y'all're": "you all are",
    "y'all've": "you all have",
    "you'd": "you had",
    "you'd've": "you would have",
    "you'll": "you you will",
    "you'll've": "you you will have",
    "you're": "you are",
    "you've": "you have"
    }

    c_re = re.compile('(%s)' % '|'.join(cList.keys()))

    def expandContractions(text, c_re=c_re):
        def replace(match):
            return cList[match.group(0)]
        return c_re.sub(replace, text)




    pat1 = r'@[A-Za-z0-9_]+'
    pat2 = r'https?://[^ ]+'
    combined_pat = r'|'.join((pat1, pat2))
    www_pat = r'www.[^ ]+'
    negations_dic = {"isn't":"is not", "aren't":"are not", "wasn't":"was not", "weren't":"were not",
                    "haven't":"have not","hasn't":"has not","hadn't":"had not","won't":"will not",
                    "wouldn't":"would not", "don't":"do not", "doesn't":"does not","didn't":"did not",
                    "can't":"can not","couldn't":"could not","shouldn't":"should not","mightn't":"might not",
                    "mustn't":"must not"}
    neg_pattern = re.compile(r'\b(' + '|'.join(negations_dic.keys()) + r')\b')





    def clean_tweets(tweets):
        cleaned_tweets = []
        for tweet in tweets:
            tweet = str(tweet)
            # if url links, then don't append to avoid news articles, etc.
            # Check tweet length, save those > 6 (length of word "lonely")
            if re.match("(\w+:\/\/\S+)", tweet) == None and len(tweet) > 10:
                tweet = re.sub(r"http\S+", "", tweet)
                tweet = re.sub(r'www.+', "", tweet)
                #remove hashtags, @mention, emoji and image URLs
                tweet = ' '.join(re.sub("(@[A-Za-z0-9]+)|(\#[A-Za-z0-9]+)|(<Emoji:.*>)|(pic\.twitter\.com\/.*)", " ", tweet).split())
                # Remove HTML special entities (e.g. &amp;)
                tweet = re.sub(r'\&\w*;', '', tweet)
                #Convert @username to AT_USER
                tweet = re.sub('@[^\s]+','',tweet)
                # Remove tickers
                tweet = re.sub(r'\$\w*', '', tweet)
                # To lowercase
                tweet = tweet.lower()
                # Remove hyperlinks
                tweet = re.sub(r'https?:\/\/.*\/\w*', '', tweet)
                # Remove hashtags
                #tweet = re.sub(r'#\w*', '', tweet)
                # Remove Punctuation and split 's, 't, 've with a space for filter
                #tweet = re.sub(r'[' + punctuation.replace('@', '') + ']+', ' ', tweet)
                # Remove words with 2 or fewer letters
                tweet = re.sub(r'\b\w{1,2}\b', '', tweet)
                # Remove whitespace (including new line characters)
                tweet = re.sub(r'\s\s+', ' ', tweet)
                # Remove single space remaining at the front of the tweet.
                tweet = tweet.lstrip(' ') 
                # Remove characters beyond Basic Multilingual Plane (BMP) of Unicode:
                tweet = ''.join(c for c in tweet if c <= '\uFFFF')
                #fix weirdly encoded texts
                tweet = ftfy.fix_text(tweet)
                #expand contraction
                tweet = expandContractions(tweet)
                #remove punctuation
                tweet = ' '.join(re.sub("([^0-9A-Za-z \t])", " ", tweet).split())
                
                neg_handled = neg_pattern.sub(lambda x: negations_dic[x.group()], tweet)
                letters_only = re.sub("[^a-zA-Z]", " ", neg_handled)
                
                # Tokenize and join to remove unneccessary white spaces
                words = [x for x  in tok.tokenize(letters_only) if len(x) > 1]
                #return (" ".join(words)).strip()

                #stop words
                stop_words = set(stopwords.words('english'))
                stop_words.update(("mon","tue","wed","thu","fri","sat","sun","sunday","monday","tuesday","thursday","friday","saturday","sunday","thurs","thur","tues"))
                stop_words.update(("january","february","march","april","may","june","july","august",
                "september","october","november","december","jan","feb","mar","apr",
                "may","jun","jul","aug","sep","oct","nov","dec", "twitter", "thanking","thanks"))
        
                word_tokens = nltk.word_tokenize(tweet) 
                filtered_sentence = [w for w in word_tokens if not w in stop_words]
                tweet = ' '.join(filtered_sentence)

                #stemming words
                tweet = PorterStemmer().stem(tweet)
                
                cleaned_tweets.append(tweet)

        return cleaned_tweets




    #Applying the preprocessing clean_text function to every element in the depressive tweets and random tweets data.
    new_tweets_arr = [x for x in df['Tweets']]
    X_n = clean_tweets(new_tweets_arr)
    print(X_n)






    return X_n