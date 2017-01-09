@echo off
    set "CATALINA_HOME=E:\skz\01-SKZ\server\uap"
    set "STOP=%CATALINA_HOME%\bin\shutdown.bat"
    set "START=%CATALINA_HOME%\bin\startup.bat"

:stop
    call %STOP%
    call :runstat
        echo Tomcat has stopped
        pause
    call %START%

:runstat
    tasklist /FI "SessionName eq services" | find /I "tomcat" | find /I ".exe"> NUL
    set err=%errorlevel%

    :: see if stopped condition is met and if yes exit
       if %err%==1 exit /b
    :: else wait 1 second and try again
       PING 127.0.0.1 -n 60 >NUL 2>&1 || PING ::1 -n 60 >NUL 2>&1
       goto runstat
