# -*- coding: utf-8 -*-
"""
Created on Sun Sep 13 13:06:08 2020

@author: kingslayer
"""

# Import the Gtts module for text  
# to speech conversion 
from gtts import gTTS 
  
# import Os module to start the audio file
import os 

def textFiletoSpeech(filename):

    fh = open(filename, "r")
    myText = fh.read().replace("\n", " ")
    
    # Language we want to use 
    language = 'en'
    
    output = gTTS(text=myText, lang=language, slow=False)
    
    output.save("output.mp3")
    fh.close()
    
    # Play the converted file 
    os.system("start output.mp3")

def texttoSpeech(text):
    mytext = text
  
    # Language we want to use 
    language = 'en'
      
    
    myobj = gTTS(text=mytext, lang=language, slow=False) 
      
    
    myobj.save("output.mp3") 
      
    # Play the converted file 
    os.system("start output.mp3") 
    
    
textFiletoSpeech('test_textToSpeech.txt')
texttoSpeech('I am Cristiano Ronaldo,Messi sucks')
