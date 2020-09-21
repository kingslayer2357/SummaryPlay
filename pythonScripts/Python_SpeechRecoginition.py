import speech_recognition

sr=speech_recognition.Recognizer()
with  speech_recognition.Microphone() as source:
    print("Say Something")
    audio=sr.listen(source)

    try:
        text=sr.recognize_google(audio)
        print(f"You said:{text}")
    except:
        print("Sorry Couldn't get it.")
    