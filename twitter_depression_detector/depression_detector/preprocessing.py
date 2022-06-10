


#from textblob import TextBlob
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

def processing_tweets(cleaned):







    tokenizer = Tokenizer(num_words=25000)
    tokenizer.fit_on_texts(cleaned)





    #Applying the tokenizer to depressive tweets and random tweets data.
    sequences_n = tokenizer.texts_to_sequences(cleaned)




    #Number of unique words in tokenizer.
    word_index = tokenizer.word_index
    print('Found %s unique tokens' % len(word_index))




    #Pad sequences to the same length.
    data_n = pad_sequences(sequences_n, maxlen=280)
    print('Shape of data_n tensor:', data_n.shape)

    processed_arr=np.array(data_n)
    return processed_arr





