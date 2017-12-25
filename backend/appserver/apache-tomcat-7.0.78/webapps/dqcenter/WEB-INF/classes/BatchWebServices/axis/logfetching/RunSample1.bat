@echo OFF
if "%1" == "-s" set JAVA_OPTS=-Djava.protocol.handler.pkgs=com.sun.net.ssl.internal.www.protocol -Djavax.net.ssl.trustStore=..\..\..\..\ssl\wsh.keystore 

java %JAVA_OPTS% -classpath "..\..\..\..\;..\..\..\;..\..\..\..\lib\activation.jar;..\..\..\..\lib\mail.jar;..\..\..\..\lib\axis-1.4\axis.jar;..\..\..\..\lib\axis-1.4\saaj.jar;..\..\..\..\lib\axis-1.4\jaxrpc.jar;..\..\..\..\lib\axis-1.4\xercesImpl.jar;..\..\..\..\lib\axis-1.4\xml-apis.jar;..\..\..\..\lib\axis-1.4\commons-discovery-0.2.jar;..\..\..\..\lib\axis-1.4\commons-logging-1.0.4.jar;..\..\..\..\lib\axis-1.4\wsdl4j-1.5.1.jar" BatchWebServices.axis.logfetching.Sample1 %*

