@echo off
echo Starting the bot...
:main
node bot.js
echo Restarting the bot because something went wrong
goto main