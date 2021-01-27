import os
import configparser

class PioWrapper:
    def __init__(self,iniPath):
        self.iniConfig = configparser.ConfigParser()
        self.iniConfig.read(iniPath)

    def run(self,args:str = ""):
        os.system("pio run " + args)

class PioMenu:
    def __init__(self,Wrapper:PioWrapper):
        self.Wrapper = Wrapper

    def MainMenu(self):
        print("Your options :")
        print("")
        print("")

wrap = PioWrapper("platformio.ini")
menu = PioMenu(wrap)

menu.MainMenu()
