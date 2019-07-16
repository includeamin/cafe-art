FROM pypy:3.6

EXPOSE 3002

RUN apt-get update -y && \
    apt-get install -y python3 python3-dev python3-pip



# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt ./app/requirements.txt

COPY . ./app

RUN ls
RUN cd /app/Configures && ls

WORKDIR /app


RUN pip3  install -r requirements.txt
RUN pip3 install gunicorn
RUN pip3 install termcolor





#CMD ["python3","-u","app.py"]
#CMD ["/usr/local/bin/gunicorn", "--config", "gunicorn_config.py" , "app:app"]