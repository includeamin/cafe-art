FROM ubuntu:18.04

EXPOSE 4002

RUN apt-get update -y && \
    apt-get install -y python3 python3-dev python3-pip



# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt ./app/requirements.txt

COPY . ./app

RUN ls
# RUN cd /app/Configures && ls

WORKDIR /app

#RUN pip3 uninstall bson
#RUN pip3 uninstall pymongo
#RUN pip3 install pymongo



RUN pip3  install -r requirements.txt
RUN pip3 install gunicorn
RUN pip3 install termcolor

RUN apt-get install -y sudo curl wget locales
RUN locale-gen en_CA.UTF-8
ENV LC_ALL=en_CA.UTF-8
ENV LANG=en_CA.UTF-8
ENV LANGUAGE=en_CA.UTF-8




#CMD ["python3","-u","app.py"]
CMD ["/usr/local/bin/gunicorn", "--config", "gunicorn_config.py" , "app:app"]
